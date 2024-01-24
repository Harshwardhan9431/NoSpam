const db = require("./../models/index");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sequelize = db.sequelize;
const Sequelize = require("sequelize");
const AppError = require("./../utils/appError");
const catchAsync = require('./../utils/catchAsync');

const User = require("../models/userModel")(sequelize, Sequelize.DataTypes);

const TokenSigner = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

const CreateAndSendToken = (user, statusCode, res) => {
  const token = TokenSigner(user.id);
  res.status(statusCode).json({
    token,
    user: {
      username: user.username,
      email: user.email,
      phone: user.phone,
    },
  });
};

exports.register =  catchAsync(async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword, phone } = req.body;
    const checkEmail = await User.findOne({
      where: {
        email: email,
      },
    });
    if (checkEmail) {
      return next(new AppError("This Email has been used", 409));
    }
    if (password !== confirmPassword) {
      return next(
        new AppError("Password and Confirm Password should be same.", 408)
      );
    }
    const checkPhone = await User.findOne({
      where: {
        phone: phone,
      },
    });
    if (checkPhone) {
      return next(new AppError("Phone number already exists.", 403));
    }
    const userData = {
      username,
      email,
      phone,
      password
    }

    User.create(userData)
    .then((userdata) => {
      return CreateAndSendToken(userdata, 201, res);
    })
      .catch((err) => {
      return next(new AppError(err.message, 500));
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
});

exports.login = catchAsync(async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const checkUser = await User.findOne({
      where: {
        phone: phone,
      },
    });
    let correctCredentials = await checkUser.loginPasswordChecker(password, checkUser.password);
    if (!checkUser || !correctCredentials) {
      return next(new AppError("Invalid Credentials", 401));
    }
    return CreateAndSendToken(checkUser, 200, res);
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
});
