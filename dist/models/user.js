"use strict";
// import { Model, DataTypes, Sequelize } from "sequelize";
// import * as dotenv from 'dotenv';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// dotenv.config();
// const TABLE_NAME = "Users";
// class User extends Model {
//   static USER_MODEL_NAME = "Users";
//   static USER_TABLE_NAME = "Users";
//   id!: number;
//   name!: string;
//   email!: string;
//   password!: string;
//   dateOfBirth!: Date;
//   country!: string;
//   static initialize(sequelize: Sequelize) {
//     this.init(
//       {
//         id: {
//           type: DataTypes.INTEGER,
//           autoIncrement: true,
//           primaryKey: true,
//           allowNull: false,
//         },
//         name: {
//           type: DataTypes.STRING(255),
//           allowNull: false,
//         },
//         email: {
//           type: DataTypes.STRING(255),
//           allowNull: false,
//         },
//         password: {
//           type: DataTypes.STRING(255),
//           allowNull: false,
//         },
//         dateOfBirth: {
//           type: DataTypes.DATE,
//           allowNull: false,
//         },
//         country: {
//           type: DataTypes.STRING(255),
//           allowNull: false,
//         },
//       },
//       {
//         sequelize,
//         tableName: TABLE_NAME,
//         modelName: this.USER_MODEL_NAME,
//         timestamps: false,
//       }
//     );
//   }
// }
// export default User;
const sequelize_typescript_1 = require("sequelize-typescript");
const uuid_1 = require("uuid");
const package_1 = require("./package");
let User = class User extends sequelize_typescript_1.Model {
};
exports.User = User;
User.USER_TABLE_NAME = "Users";
User.USER_ID = "id";
User.USER_NAME = "name";
User.USER_EMAIL = "email";
User.USER_PASSWORD = "password";
User.USER_DOB = "dateOfBirth";
User.USER_COUNTRY = "country";
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: () => (0, uuid_1.v4)(),
        field: User.USER_ID,
    })
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        field: User.USER_NAME,
    })
], User.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        field: User.USER_EMAIL,
    })
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        field: User.USER_PASSWORD,
    })
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: User.USER_DOB,
    })
], User.prototype, "dateOfBirth", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        field: User.USER_COUNTRY,
    })
], User.prototype, "country", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => package_1.Package)
], User.prototype, "packages", void 0);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: User.USER_TABLE_NAME,
        timestamps: false,
    })
], User);
//# sourceMappingURL=user.js.map