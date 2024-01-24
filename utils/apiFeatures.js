const AppError = require('./appError');
const jwt = require('jsonwebtoken');
const catchAsync = require('./catchAsync');
const { promisify } = require('util');
const db = require("./../models/index");
const sequelize = db.sequelize;
const Sequelize = require("sequelize");
const Users = require("../models/userModel")(sequelize, Sequelize.DataTypes);

exports.protect = catchAsync(async (req, res, next) => {
  // Get token and check if it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('No token found', 401));
  }

  if (!token) return next(new AppError('No Token found', 401));
  //TODO validate the token
  let decodedPayload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //TODO check if user still exists
  Users.findOne({
   where: {
      id: decodedPayload.id,
    },
  })
  .then((user) => {
      if (user) {
        //TODO Grant access to the protected routes
        //Adding in req for further usages
        req.user = user.dataValues;
        return next();
      } else {
        return next(new AppError("The user belonging to this token doesn't exists", 401));
      }
    });
});

