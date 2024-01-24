"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("User", [
      {
        username: "user21",
        email: "user21@example.com",
        password: "password21",
        phone: 1234567890,
        spammed_phone_nos:[2]
      },
      {
        username: "user22",
        email: "user22@example.com",
        password: "password22",
        phone: 2345678901,
        contact_nos: [8901234567, 5678901234],
      },
      {
        username: "user23",
        email: "user23@example.com",
        password: "password23",
        phone: 3456789012,
        contact_nos: [6789012345],
        spammed_phone_nos: [6,8]
      },
      {
        username: "user24",
        email: "user24@example.com",
        password: "password24",
        phone: 4567890123,
        contact_nos: [7890123456, 9012345678],
      },
      {
        username: "user25",
        email: "user25@example.com",
        password: "password25",
        phone: 5678901234,
      },
      {
        username: "user26",
        email: "user26@example.com",
        password: "password26",
        phone: 6789012345,
        contact_nos: [1234567890, 2345678901],
        spammed_phone_nos: [4]
      },
      {
        username: "user27",
        email: "user27@example.com",
        password: "password27",
        phone: 7890123456,
        contact_nos: [3456789012, 4567890123, 5678901234],
      },
      {
        username: "user28",
        email: "user28@example.com",
        password: "password28",
        phone: 8901234567,
        contact_nos: [6789012345, 7890123456],
      },
      {
        username: "user29",
        email: "user29@example.com",
        password: "password29",
        phone: 9012345678,
        contact_nos: [2345678901, 3456789012],
      },
      {
        username: "user30",
        email: "user30@example.com",
        password: "password30",
        phone: 2109876543,
        contact_nos: [5432109876],
        spammed_phone_nos: [10]
      },
      {
        username: "user31",
        email: "user31@example.com",
        password: "password31",
        phone: 3210987654,
      },
      {
        username: "user32",
        email: "user32@example.com",
        password: "password32",
        phone: 4321098765,
        contact_nos: [7654321098, 8765432109],
      },
      {
        username: "user33",
        email: "user33@example.com",
        password: "password33",
        phone: 5432109876,
        contact_nos: [9876543210, 1098765432],
      },
      {
        username: "user34",
        email: "user34@example.com",
        password: "password34",
        phone: 6543210987,
        contact_nos: [2109876543, 3210987654],
      },
      {
        username: "user35",
        email: "user35@example.com",
        password: "password35",
        phone: 7654321098,
        contact_nos: [4321098765, 5432109876],
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("User", null, {});
  },
};
