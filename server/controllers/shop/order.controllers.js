import paypal from "../../helper/paypal.js";
import { Cart } from "../../models/Cart.models.js";
import { Order } from "../../models/Orders.models.js";
import { Products } from "../../models/Products.models.js";

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-return`,
        cancel_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-cancel`,
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: parseInt(item.salePrice).toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: parseInt(totalAmount).toFixed(2),
          },
          description: "description",
        },
      ],
    };
    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Error while creating paypal payment",
        });
      } else {
        const newlycreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });
        await newlycreatedOrder.save();
        const approval_url = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;
        res.status(201).json({
          success: true,
          approval_url,
          orderId: newlycreatedOrder._id,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured while creating order",
    });
  }
};
const capturePayment = async (req, res) => {
  try {
    const { paymentId, orderId, payerId } = req.body;
    const order = await Order.findById(orderId);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Didn't get order" });
    order.payerId = payerId;
    order.paymentId = paymentId;
    order.paymentStatus = "paid";
    order.orderStatus = "Confirmed";
    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);
    await order.save();
    for (let item of order.cartItems) {
      const product = await Products.findById(item.productId);
      if (!product)
        return res
          .status(404)
          .json({ success: false, message: "Product is not found!" });
      product.totalstock -= item.quantity;
      await product.save();
    }
    return res
      .status(200)
      .json({ success: true, message: "Order Confirmed", data: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured while capturing payment",
    });
  }
};
const getAllOrderByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "Please Provide UserId" });
    const orders = await Order.find({ userId });
    if (!orders || !orders.length)
      return res
        .status(404)
        .json({ success: false, message: "No orders found!" });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured while fetching all order",
    });
  }
};
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(404)
        .json({ success: false, message: "Please provide UserId" });
    const order = await Order.findById(id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order details not found" });
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured while fetching order Details",
    });
  }
};
export { createOrder, capturePayment, getAllOrderByUser, getOrderDetails };
