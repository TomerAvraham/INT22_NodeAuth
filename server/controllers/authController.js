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

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      next(new AppError("Please provide username and password", 400));

    const user = await User.findOne({ username });

    if (!user) return next(new AppError("User does't exist", 404));

    if (!(await user.passwordCorrect(password)))
      return next(new AppError("Password doesn't match", 403));

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    next(new AppError("Something want wrong"));
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) return next(new AppError("Provide a token", 400));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    user.password = undefined;
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    next(new AppError("Something want wrong"));
  }
};

exports.protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(403);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};
