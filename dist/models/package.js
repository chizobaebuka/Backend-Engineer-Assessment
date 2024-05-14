"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user");
let Package = class Package extends sequelize_typescript_1.Model {
};
exports.Package = Package;
Package.PACKAGE_ID = "id";
Package.PACKAGE_NAME = "package_name";
Package.PACKAGE_STATUS = "status";
Package.PACKAGE_PICKUP_DATE = "pickupDate";
Package.PACKAGE_USER_ID = "userId";
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        field: Package.PACKAGE_ID,
    })
], Package.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
        field: Package.PACKAGE_USER_ID,
    })
], Package.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_1.User)
], Package.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
        field: Package.PACKAGE_NAME,
    })
], Package.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
        field: Package.PACKAGE_STATUS,
    })
], Package.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        field: Package.PACKAGE_PICKUP_DATE,
    })
], Package.prototype, "pickupDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    })
], Package.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    })
], Package.prototype, "updatedAt", void 0);
exports.Package = Package = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "Packages",
        timestamps: true,
    })
], Package);
//# sourceMappingURL=package.js.map