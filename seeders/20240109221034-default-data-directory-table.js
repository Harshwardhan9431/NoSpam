'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Directory', [
      {
        name: "user1",
        phone: 1234567890,
        likely_spam: false
      },
      {
        name: "user2",
        phone: 9876543210,
        likely_spam: true
      },
      {
        name: "user3",
        phone: 1234567890,
        likely_spam: false
      },
      {
        name: "user4",
        phone: 2345678901,
        likely_spam: true
      },
      {
        name: "user5",
        phone: 3456789012,
        likely_spam: false
      },
      {
        name: "user6",
        phone: 4567890123,
        likely_spam: true
      },
      {
        name: "user7",
        phone: 5678901234,
        likely_spam: false
      },
      {
        name: "user8",
        phone: 6789012345,
        likely_spam: true
      },
      {
        name: "user9",
        phone: 7890123456,
        likely_spam: false
      },
      {
        name: "user10",
        phone: 8901234567,
        likely_spam: true
      },
      {
        name: "user11",
        phone: 9012345678,
        likely_spam: false
      },
      {
        name: "user12",
        phone: 1234567890,
        likely_spam: false
      },
      {
        name: "user13",
        phone: 2345678901,
        likely_spam: false
      },
      {
        name: "user14",
        phone: 3456789012,
        likely_spam: false
      },
      {
        name: "user15",
        phone: 4567890123,
        likely_spam: false
      },
      {
        name: "user16",
        phone: 5678901234,
        likely_spam: false
      },
      {
        name: "user17",
        phone: 6789012345,
        likely_spam: false
      },
      {
        name: "user18",
        phone: 7890123456,
        likely_spam: false
      },
      {
        name: "user19",
        phone: 8901234567,
        likely_spam: false
      },
      {
        name: "user20",
        phone: 9012345678,
        likely_spam: false
      }
      // Add more test data as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Directory', null, {});
  },
};

