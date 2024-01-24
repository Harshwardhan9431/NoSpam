const db = require("./../models/index");
const { Op } = require("sequelize");
const sequelize = db.sequelize;
const Sequelize = require("sequelize");
const AppError = require("./../utils/appError");
const catchAsync = require('./../utils/catchAsync');
const Directory = require("../models/directoryModel")(
  sequelize,
  Sequelize.DataTypes,
);
const Users = require("../models/userModel")(sequelize, Sequelize.DataTypes);

// Mark a Phone no SPAM TODO --updates user's(spam_phone_nos)
exports.spamPhoneNo = catchAsync(async (req, res, next) => {
  try {
    const spamData = {
      name: req.body.name,
      phone: req.body.phone,
      likely_spam: true,
    };

    // Step 1: Create entry in the directory table
    const spamDetails = await Directory.create(spamData);

    // Step 2: Update the user's spammed_phone_nos array
    const user = await Users.findByPk(req.user.id);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Update the spammed_phone_nos array
    let updatedSpammedPhoneNos = user.spammed_phone_nos || [];
    updatedSpammedPhoneNos.push(spamDetails.id);

    // Save the updated spammed_phone_nos array to the user
    await Users.update(
      { spammed_phone_nos: updatedSpammedPhoneNos },
      { where: { id: req.user.id } }
    );

    return res.status(201).json({
      message: 'Spam registered successfully',
      data: spamDetails,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
});

// Derive Globally Marked spams
exports.getAllSpamPhoneNos = catchAsync(async (req, res, next) => {
  Directory.findAll({
    where: {
      likely_spam: true,
    },
  })
    .then((phoneDetails) => {
      return res.status(200).json({
        results: phoneDetails.length,
        data: {
          phoneDetails,
        },
      });
    })
    .catch((err) => {
      return next(new AppError(err.message, 500));
    });
});

// User specific spams
exports.getMarkedSpamPhoneNos = catchAsync(async (req, res, next) => {
  try {
    const spammedPhoneIds = req.user.spammed_phone_nos;

    if (!spammedPhoneIds || !spammedPhoneIds.length) {
      return res.status(200).json({
        results: 0,
        data: {
          phoneDetails: [],
        },
      });
    }

    const phoneDetails = await Directory.findAll({
      where: {
        id: spammedPhoneIds,
      },
    });

    return res.status(200).json({
      results: phoneDetails.length,
      data: {
        phoneDetails,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
});

// Find spam list by name(globally in ascending order prority to exact matches)
// and by phone(registered users, if not present all the global exact nos)
exports.findSpamList = catchAsync(async (req, res, next) => {
  const { name, phone } = req.query;
  if (name) {
    Directory.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, // Case-insensitive search for names starting with the query
        },
      },
      attributes: ["name", "phone", "likely_spam"],
      order: [
        [
          sequelize.literal(
            `CASE WHEN name ILIKE '${name}%' THEN 1 ELSE 2 END`,
          ),
        ], // Order by names that start with the query first
        ["name", "ASC"],
      ],
    })
      .then((phoneDetails) => {
        return res.status(200).json({
          results: phoneDetails.length,
          data: {
            phoneDetails,
          },
        });
      })
      .catch((err) => {
        return next(new AppError(err.message, 500));
      });
  } else if (phone) {
    // Check if there is a registered user with the provided phone number
    Users.findOne({
      where: {
        phone,
      },
    })
      .then((userDetails) => {
        if (userDetails) {
          // If it is in contacts showing the email as well
          if (req.user.contact_nos.includes(userDetails.phone)) {
            return res.status(200).json({
              results: 1,
              data: {
                Name: userDetails.username,
                Email: userDetails.email,
                Phone: userDetails.phone,
              },
            });
              // Only phone no and name if not in contacts
          } else {
            return res.status(200).json({
              results: 1,
              data: {
                Name: userDetails.username,
                Phone: userDetails.phone,
              },
            });
          }
        } else {
          // If no registered user found, retrieve all matching phone numbers
          Directory.findAll({
            where: {
              phone,
            },
            attributes: ["name", "phone"],
          })
            .then((phoneDetails) => {
              return res.status(200).json({
                results: phoneDetails.length,
                data: {
                  phoneDetails,
                },
              });
            })
            .catch((err) => {
              return next(new AppError(err.message, 500));
            });
        }
      })
      .catch((err) => {
        return next(new AppError(err.message, 500));
      });
  } else {
    return next(new AppError("Should have atleast name or email as query param", 500));
  }
});
