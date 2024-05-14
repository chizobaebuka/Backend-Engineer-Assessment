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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_INVALID_STATUS_CODE = exports.JWT_EXPIRATION_STATUS_CODE = exports.JWT_REFRESH_TOKEN_EXPIRATION_TIME = exports.JWT_ACCESS_TOKEN_EXPIRATION_TIME = exports.REFRESH_TOKEN = void 0;
__exportStar(require("./httpStatusCodes"), exports);
exports.REFRESH_TOKEN = 'sessions.martins';
exports.JWT_ACCESS_TOKEN_EXPIRATION_TIME = '5m';
exports.JWT_REFRESH_TOKEN_EXPIRATION_TIME = '30m';
exports.JWT_EXPIRATION_STATUS_CODE = 'JWT: Expired';
exports.JWT_INVALID_STATUS_CODE = 'JWT: Invalid';
//# sourceMappingURL=index.js.map