import { Order } from "../../models/Orders.models.js";

const getAllOrderOfAllUser = async (req, res) => {
  try {
    const orders = await Order.find({});
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
const getOrderDetailsForAdmin = async (req, res) => {
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
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const order = await Order.findById(id);
    if (!order)
      return res
        .status(400)
        .json({ success: false, message: "Didn't get order" });
    await Order.findByIdAndUpdate(id, { orderStatus });
    res
      .status(200)
      .json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured while updating order status",
    });
  }
};
export { getAllOrderOfAllUser, getOrderDetailsForAdmin, updateOrderStatus };
