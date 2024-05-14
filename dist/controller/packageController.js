"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const package_1 = require("../models/package");
const packageSchema_1 = require("../schema/packageSchema");
const constants_1 = require("../constants");
const uuid_1 = require("uuid");
const package_interface_1 = require("../interface/package.interface");
const packageRepo_1 = require("../repository/packageRepo");
const node_cron_1 = __importDefault(require("node-cron"));
dotenv.config();
class PackageController {
    submitPackage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = req.body, { _user: user, _userId: userId } = _a, rest = __rest(_a, ["_user", "_userId"]);
            const requestData = packageSchema_1.createPackageSchema.strict().safeParse(rest);
            if (!requestData.success) {
                return res.status(constants_1.HTTP_STATUS_CODE.BAD_REQUEST).json({
                    message: requestData.error.issues
                });
            }
            const _data = requestData.data;
            const packageId = (0, uuid_1.v4)();
            try {
                const statusValue = _data.status;
                if (!(statusValue in package_interface_1.PackageStatus)) {
                    return res.status(constants_1.HTTP_STATUS_CODE.BAD_REQUEST).json({
                        message: 'Invalid status value. Status should be one of: SentOut, InTransit, Pending, Received'
                    });
                }
                const newPackage = {
                    id: packageId,
                    name: _data.name,
                    status: statusValue,
                    pickupDate: _data.pickupDate,
                    userId: userId,
                };
                const createdPackage = yield package_1.Package.create(newPackage);
                return res.status(constants_1.HTTP_STATUS_CODE.CREATED).json({
                    message: 'Package submitted successfully',
                    data: createdPackage,
                    status: constants_1.HTTP_STATUS_CODE.CREATED,
                });
            }
            catch (error) {
                console.error('Error submitting package:', error);
                yield package_1.Package.destroy({ where: { id: packageId } });
                res.status(constants_1.HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: 'Internal server error' });
            }
        });
    }
    getPackageById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const packageId = req.params.id;
                if (!packageId) {
                    return res.status(400).json({ message: 'Package ID is missing in request' });
                }
                const _package = yield new packageRepo_1.NewPackageRepo().findById(packageId);
                if (!_package) {
                    return res.status(404).json({ message: 'Package not found' });
                }
                return res.status(200).json({
                    message: 'Package retrieved successfully',
                    data: _package,
                    status: 200,
                });
            }
            catch (error) {
                console.error('Error retrieving package:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    getAllPackages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _packages = yield new packageRepo_1.NewPackageRepo().findAll();
                if (!_packages) {
                    return res.status(constants_1.HTTP_STATUS_CODE.NOT_FOUND).json({ message: 'Packages not found' });
                }
                return res.status(constants_1.HTTP_STATUS_CODE.SUCCESS).json({
                    message: 'Packages retrieved successfully',
                    data: _packages,
                    status: constants_1.HTTP_STATUS_CODE.SUCCESS,
                });
            }
            catch (error) {
                console.error('Error getting all package:', error);
                res.status(constants_1.HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: 'Internal server error' });
            }
        });
    }
    ;
    getAllPackagesByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                if (!userId) {
                    return res.status(constants_1.HTTP_STATUS_CODE.BAD_REQUEST).json({ message: 'User ID is missing in request' });
                }
                const packages = yield new packageRepo_1.NewPackageRepo().getPackagesByUserId(userId);
                if (!packages || packages.length === 0) {
                    return res.status(constants_1.HTTP_STATUS_CODE.NOT_FOUND).json({ message: 'No packages found for the user' });
                }
                return res.status(constants_1.HTTP_STATUS_CODE.SUCCESS).json({
                    message: 'Packages retrieved successfully',
                    data: packages,
                    status: constants_1.HTTP_STATUS_CODE.SUCCESS,
                });
            }
            catch (error) {
                console.error('Error retrieving packages:', error);
                return res.status(constants_1.HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: 'Internal server error' });
            }
        });
    }
    getPackageToUpdateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const packageId = req.params.id;
                if (!packageId) {
                    return res.status(constants_1.HTTP_STATUS_CODE.NOT_FOUND).json({ message: 'Package ID is missing in request' });
                }
                const _package = yield new packageRepo_1.NewPackageRepo().findById(packageId);
                if (!_package) {
                    return res.status(constants_1.HTTP_STATUS_CODE.NOT_FOUND).json({ message: 'Package not found' });
                }
                node_cron_1.default.schedule('*/2 * * * *', () => __awaiter(this, void 0, void 0, function* () {
                    yield new packageRepo_1.NewPackageRepo().updatePackageStatus(packageId);
                }));
                return res.status(constants_1.HTTP_STATUS_CODE.SUCCESS).json({
                    message: 'Package to update retrieved successfully and initiated the automated status update job',
                    data: _package,
                    status: constants_1.HTTP_STATUS_CODE.SUCCESS,
                });
            }
            catch (error) {
                console.error('Error retrieving package:', error);
                return res.status(constants_1.HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.default = new PackageController;
//# sourceMappingURL=packageController.js.map