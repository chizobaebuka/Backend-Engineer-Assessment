"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPackageRepo = void 0;
const package_1 = require("../models/package");
// import * as bcrypt from "bcrypt";
// import * as jwt from "jsonwebtoken";
// import * as db from '../config'
const package_interface_1 = require("../interface/package.interface");
const sequelize_1 = require("sequelize");
class NewPackageRepo {
    findById(package_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _package = yield package_1.Package.findOne({ where: { id: package_id } });
                if (!_package) {
                    throw new Error("Package not found");
                }
                return _package;
            }
            catch (error) {
                console.error("Error retrieving package:", error);
                throw new Error("Failed to retrieve package by id:");
            }
        });
    }
    ;
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield package_1.Package.findAll();
            }
            catch (error) {
                console.error("Error retrieving packages:", error);
                throw new Error("Failed to retrieve packages");
            }
        });
    }
    ;
    getPackagesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield package_1.Package.findAll({ where: { userId: userId } });
            }
            catch (error) {
                console.error("Error retrieving packages:", error);
                throw new Error("Failed to retrieve packages");
            }
        });
    }
    ;
    getPackageToUpdateById(packageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _package = yield package_1.Package.findOne({
                    where: {
                        id: packageId,
                        status: {
                            [sequelize_1.Op.notIn]: [package_interface_1.PackageStatus.Delivered, package_interface_1.PackageStatus.AvailableForPickup]
                        }
                    }
                });
                if (!_package) {
                    throw new Error("Package not found");
                }
                return _package;
            }
            catch (error) {
                console.error("Error retrieving package:", error);
                throw new Error("Failed to retrieve package by id:");
            }
        });
    }
    updatePackageStatuss(packageId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _package = yield package_1.Package.findOne({ where: { id: packageId } });
                if (!_package) {
                    throw new Error("Package not found");
                }
                if (!(status in package_interface_1.PackageStatus)) {
                    throw new Error("Invalid package status");
                }
                switch (_package.status) {
                    case package_interface_1.PackageStatus.Delayed:
                        _package.status = package_interface_1.PackageStatus.Delayed;
                    case package_interface_1.PackageStatus.SentOut:
                        _package.status = package_interface_1.PackageStatus.InTransit;
                        break;
                    case package_interface_1.PackageStatus.InTransit:
                        _package.status = package_interface_1.PackageStatus.PendingDelivery;
                        break;
                    case package_interface_1.PackageStatus.PendingDelivery:
                        _package.status = package_interface_1.PackageStatus.OutForDelivery;
                        break;
                    case package_interface_1.PackageStatus.OutForDelivery:
                        _package.status = package_interface_1.PackageStatus.Delivered;
                        break;
                    case package_interface_1.PackageStatus.Delivered:
                        _package.status = package_interface_1.PackageStatus.Closed;
                        break;
                    case package_interface_1.PackageStatus.AvailableForPickup:
                        _package.status = package_interface_1.PackageStatus.Closed;
                        break;
                    default:
                        break;
                }
                yield _package.save();
                return _package;
            }
            catch (error) {
                console.error("Error updating package status:", error);
                throw new Error("Failed to update package status");
            }
        });
    }
    updatePackageStatus(packageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const packageToUpdate = yield this.getPackageToUpdateById(packageId);
                if (!packageToUpdate) {
                    throw new Error(`Package ${packageId} not found`);
                }
                let oldStatus = packageToUpdate.status;
                switch (packageToUpdate.status) {
                    case package_interface_1.PackageStatus.Delayed:
                        packageToUpdate.status = package_interface_1.PackageStatus.Delayed;
                        break;
                    case package_interface_1.PackageStatus.SentOut:
                        packageToUpdate.status = package_interface_1.PackageStatus.InTransit;
                        break;
                    case package_interface_1.PackageStatus.InTransit:
                        packageToUpdate.status = package_interface_1.PackageStatus.PendingDelivery;
                        break;
                    case package_interface_1.PackageStatus.PendingDelivery:
                        packageToUpdate.status = package_interface_1.PackageStatus.OutForDelivery;
                        break;
                    case package_interface_1.PackageStatus.OutForDelivery:
                        packageToUpdate.status = package_interface_1.PackageStatus.Delivered;
                        break;
                    case package_interface_1.PackageStatus.Delivered:
                        packageToUpdate.status = package_interface_1.PackageStatus.Closed;
                        break;
                    case package_interface_1.PackageStatus.AvailableForPickup:
                        packageToUpdate.status = package_interface_1.PackageStatus.Closed;
                        break;
                    default:
                        break;
                }
                yield packageToUpdate.save();
                console.log(`Package status updated successfully! Old status: ${oldStatus}, New status: ${packageToUpdate.status}`);
            }
            catch (error) {
                console.error('Error updating package status:', error);
            }
        });
    }
    getPackagesToUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield package_1.Package.findAll({
                    where: {
                        status: {
                            [sequelize_1.Op.notIn]: [package_interface_1.PackageStatus.Delivered, package_interface_1.PackageStatus.AvailableForPickup]
                        }
                    }
                });
            }
            catch (error) {
                console.error("Error retrieving packages to update:", error);
                throw new Error("Failed to retrieve packages to update");
            }
        });
    }
}
exports.NewPackageRepo = NewPackageRepo;
//# sourceMappingURL=packageRepo.js.map