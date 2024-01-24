const db = require("./../models/index");
const sequelize = db.sequelize;
const Sequelize = require("sequelize");
const AppError = require("./../utils/appError");
const catchAsync = require('./../utils/catchAsync');

const User = require("../models/userModel")(sequelize, Sequelize.DataTypes);

exports.getAllUsers = catchAsync(async (req, res, next) => {
  User.findAll()
    .then((users) => {
      return res.status(200).json({
        results: users.length,
        data: {
          users,
        },
      });
    })
    .catch((err) => {
      return next(new AppError(err.message, 500));
    });
});

exports.addContacts = catchAsync(async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Update the spammed_phone_nos array
    let updatedContact = user.contact_nos || [];
    updatedContact.push(req.body.phone);

    // Save the updated spammed_phone_nos array to the user
    await User.update(
      { contact_nos: updatedContact },
      { where: { id: req.user.id } }
    );

    return res.status(201).json({
      message: 'Contact registered successfully',
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
});

exports.createUser = (_, __, next) => {
  return next(
    new AppError("This route isn't defined, 'login' can be used", 500),
  );
};

