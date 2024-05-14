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
exports.authorizationMiddleware = void 0;
const constants_1 = require("../constants");
const user_1 = require("../models/user");
const helpers_1 = require("../helpers/helpers");
const authorizationMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authorization = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (!authorization) {
        return res.status(constants_1.HTTP_STATUS_CODE.UNAUTHORIZED).json({
            message: ["Unauthorized access:", "Token is missing"],
            code: constants_1.JWT_INVALID_STATUS_CODE,
        });
    }
    const token = authorization.split(" ")[1];
    const { data, expired, valid } = yield helpers_1.Jwt.isTokenExpired(token);
    if (!expired && valid) {
        req.body["_userId"] = data.id;
        req.body["_user"] = yield user_1.User.findOne({
            where: { id: data.id },
        });
        return next();
    }
    return res.status(constants_1.HTTP_STATUS_CODE.UNAUTHORIZED).json({
        message: "Unauthorized access",
        code: valid ? constants_1.JWT_EXPIRATION_STATUS_CODE : constants_1.JWT_INVALID_STATUS_CODE,
    });
});
exports.authorizationMiddleware = authorizationMiddleware;
//# sourceMappingURL=authenticateUser.js.map