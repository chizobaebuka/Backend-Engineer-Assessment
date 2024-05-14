"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageMap = void 0;
const sequelize_1 = require("sequelize");
class Package extends sequelize_1.Model {
}
exports.default = Package;
const PackageMap = (sequelize) => {
    Package.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        packageName: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        status: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false
        },
        pickupDate: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false
        },
        timestamp: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        sequelize,
        modelName: 'package',
        tableName: 'packages',
        timestamps: false
    });
    Package.sync();
};
exports.PackageMap = PackageMap;
//# sourceMappingURL=package.js.map