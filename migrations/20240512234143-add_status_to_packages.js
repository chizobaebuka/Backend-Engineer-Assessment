'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update the "status" column to ENUM with possible values
    await queryInterface.changeColumn('Packages', 'status', {
      type: Sequelize.ENUM('Delayed', 'SentOut', 'InTransit', 'Pending', 'PendingDelivery', 'OutForDelivery', 'Delivered', 'AvailableForPickup', 'Closed'),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the "status" column back to STRING
    await queryInterface.changeColumn('Packages', 'status', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
  },
};
