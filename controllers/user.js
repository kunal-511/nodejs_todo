import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res) => {};

// new user register controller
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Doesn't  exists.", 400));

    const hashedPassword = await bcrypt.hash(password, 12);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "User Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

//login controller
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("User Doesn't  exists.", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `${user.name} Logged in Successfully`, 200);
  } catch (error) {
    next(error);
  }
};

// Logout controller
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE === "Development" ? "lax" : "none",
      secure: process.env.NODE === "Development" ? false : true,
    })
    .json({
      sucess: true,
    });
};

// empty route
// export const getUserDetails = async (req, res, next) => {};

// to get details about the user logged in
export const getMyProfile = (req, res) => {
  // //const id = req.body.id;
  // //const id = req.query.id;
  // const { id } = req.params;
  // const user = await User.findById(id);

  // console.log(req.params);

  // res.json({
  //   success: true,
  //   user,
  // });

  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// export const special = (req, res) => {
//   res.json({
//     success: true,
//     message: "Special Route",
//   });
// };
