'use strict';
const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the existing id column
    await queryInterface.removeColumn('Users', 'id');

    // Add a new id column with UUID data type and default value
    await queryInterface.addColumn('Users', 'id', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      allowNull: false,
      primaryKey: true,
    });

    // Add created_at and updated_at columns
    await queryInterface.addColumn('Users', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    await queryInterface.addColumn('Users', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },
  down: async (queryInterface, Sequelize) => {
    // Drop the created_at and updated_at columns
    await queryInterface.removeColumn('Users', 'created_at');
    await queryInterface.removeColumn('Users', 'updated_at');

    // Drop the new id column
    await queryInterface.removeColumn('Users', 'id');

    // Add back the old id column with integer data type
    await queryInterface.addColumn('Users', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    });
  },
};
