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
exports.Jwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Jwt {
    static sign(payload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = options !== null && options !== void 0 ? options : {}, { _secret } = _a, restOptions = __rest(_a, ["_secret"]);
            return jsonwebtoken_1.default.sign(payload, _secret !== null && _secret !== void 0 ? _secret : process.env.JWT_SECRET, restOptions);
        });
    }
    static verify(token, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = options !== null && options !== void 0 ? options : {}, { _secret } = _a, restOptions = __rest(_a, ["_secret"]);
            return jsonwebtoken_1.default.verify(token, _secret !== null && _secret !== void 0 ? _secret : process.env.JWT_SECRET, restOptions);
        });
    }
    static isTokenExpired(token, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = yield this.verify(token, {
                    _secret: secret || process.env.JWT_SECRET,
                });
                return { data: payload, expired: false, valid: true };
            }
            catch (e) {
                if (e instanceof jsonwebtoken_1.default.TokenExpiredError) {
                    return {
                        data: (yield jsonwebtoken_1.default.decode(token)),
                        expired: true,
                        valid: true,
                    };
                }
                else {
                    const decoded = (yield jsonwebtoken_1.default.decode(token));
                    return {
                        data: (decoded || {}),
                        expired: ((decoded === null || decoded === void 0 ? void 0 : decoded.exp) && (decoded === null || decoded === void 0 ? void 0 : decoded.exp) < Math.floor(Date.now() / 1000)) ||
                            true,
                        valid: false,
                        error: e,
                    };
                }
            }
        });
    }
}
exports.Jwt = Jwt;
//# sourceMappingURL=helpers.js.map