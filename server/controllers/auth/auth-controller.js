import jwt from "jsonwebtoken";
import { User } from "../../models/User.models.js";
import bcrypt from "bcryptjs";
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // const totalUser = await User.findOne({});
    // console.log(totalUser);

    const checkUser = await User.findOne({ email: email });
    if (!checkUser)
      return res
        .status(400)
        .json({ success: false, message: "Provided EmailId doesn't exist." });
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    // console.log("email", checkPassword);
    if (!checkPassword)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password!" });
    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser.email,
        role: checkUser.role,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );
    return res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const user1 = await User.findOne({
      $or: [{ email: email }, { userName: userName }],
    });
    if (user1)
      return res.status(400).json({
        success: false,
        message:
          "User already exist with same email.Please try with another email",
      });
    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({
      userName,
      email,
      password: hashPassword,
    });
    await user.save();
    res.status(200).json({
      sucess: true,
      message: "Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });
  return res.json({ success: true, message: "Logged Out Successfully!" });
};
const authMiddleware = async (req, res, next) => {
  const token = req?.cookies?.token;
  // console.log(token);

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized request1!" });
  try {
    const decodeduser = jwt.verify(token, "CLIENT_SECRET_KEY");
    console.log(decodeduser);

    res.user = decodeduser;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized user!" });
  }
};
export { registerUser, loginUser, logoutUser, authMiddleware };
