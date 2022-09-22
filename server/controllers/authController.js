const User = require("../models/User");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

function generateToken({ _id }) {
  return jwt.sign({ id: _id }, process.env.JWT_SECRET);
}

exports.register = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    newUser.password = undefined;
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(new AppError("Register failed", 400));
  }
};

// 1. validate user
// 2. create and send token.
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body
//     const userByEmail = await User
//     userByEmail.correctPassword()

//   } catch (error) {

//   }

// }
