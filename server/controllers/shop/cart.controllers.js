import { Cart } from "../../models/Cart.models.js";
import { Products } from "../../models/Products.models.js";

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Product Details" });
    const product = await Products.findById(productId);
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Product Details" });
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const findproductindex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (findproductindex == -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findproductindex].quantity += quantity;
    }
    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured while adding to card",
    });
  }
};
const fetchCartItems = async (req, res) => {
  const { userId } = req.params;
  console.log("userId", userId);

  if (!userId)
    return res
      .status(400)
      .json({ success: false, message: "UserId is required" });

  const cartItems = await Cart.findOne({ userId }).populate({
    path: "items.productId",
    select: "image title price salesPrice",
  });
  if (!cartItems)
    return res.status(404).json({ success: false, message: "Cart not Found!" });
  const validItems = cartItems.items.filter(
    (productItems) => productItems?.productId
  );
  if (validItems.length < cartItems.items.length) {
    cartItems.items = validItems;
    await cartItems.save();
  }
  const populatecartItems = validItems.map((item) => ({
    productId: item.productId?._id,
    image: item.productId?.image,
    title: item.productId?.title,
    price: item.productId?.price,
    salesPrice: item.productId?.salesPrice,
    quantity: item.quantity,
  }));
  res.status(200).json({
    success: true,
    data: {
      ...cartItems._doc,
      items: populatecartItems,
    },
  });
};
const updatecartItemQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0)
      return res
        .status(400)
        .json({ success: false, message: "Invalid data provided!" });
    const cartItems = await Cart.findOne({ userId });
    if (!cartItems)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found!" });
    const cartitemindex = cartItems.items.findIndex(
      (productitem) => productitem.productId.toString() === productId
    );
    if (cartitemindex == -1)
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    cartItems.items[cartitemindex].quantity = quantity;
    await cartItems.save();
    await cartItems.populate({
      path: "items.productId",
      select: "image title price salesPrice",
    });
    const populatecartItems = cartItems.items.map((items) => ({
      productId: items.productId ? items.productId?._id : null,
      image: items.productId ? items.productId?.image : null,
      title: items.productId ? items.productId?.title : "Product not found",
      price: items.productId ? items.productId.price : null,
      salesPrice: items.productId ? items.productId.salesPrice : null,
      quantity: items.quantity,
    }));
    res.status(200).json({
      success: true,
      data: { ...cartItems._doc, items: populatecartItems },
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: true, message: "Error while updating cart" });
  }
};
const deleteCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "Invalid UserId" });

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salesPrice",
    });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found!" });

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salesPrice",
    });

    const populatecartItems = cart.items.map((items) => ({
      productId: items.productId ? items.productId?._id : null,
      image: items.productId ? items.productId?.image : null,
      title: items.productId ? items.productId?.title : "Product not found",
      price: items.productId ? items.productId.price : null,
      salesPrice: items.productId ? items.productId.salesPrice : null,
      quantity: items.quantity,
    }));

    res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populatecartItems },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error occurred while deleting cart items",
    });
  }
};
export { addToCart, fetchCartItems, updatecartItemQuantity, deleteCartItems };
