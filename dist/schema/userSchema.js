"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.loginUserSchema = exports.createUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({
            required_error: 'Name is required'
        }).min(3, 'Name must be at least 3 characters long'),
        email: zod_1.default.string({
            required_error: 'Email is required'
        }).email('Invalid email format'),
        password: zod_1.default.string({
            required_error: 'Password is required'
        }).min(6, 'Password must be at least 6 characters long')
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
        dateOfBirth: zod_1.default.string({
            required_error: 'Birthdate is required'
        }),
        country: zod_1.default.string({
            required_error: 'Country is required'
        })
    })
});
exports.loginUserSchema = zod_1.default.object({
    email: zod_1.default.string({
        required_error: 'Email is required'
    }).email('Invalid email format'),
    password: zod_1.default.string({
        required_error: 'Password is required'
    }).min(6, 'Password must be at least 6 characters long')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
});
exports.updateUserSchema = zod_1.default.object({
    params: zod_1.default.object({
        id: zod_1.default.string({
            required_error: 'Id is required'
        })
    }),
    body: zod_1.default.object({
        email: zod_1.default.string({
            required_error: 'Email is required'
        }).email('Invalid email format'),
        password: zod_1.default.string({
            required_error: 'Password is required'
        }).min(6, 'Password must be at least 6 characters long')
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
        birthdate: zod_1.default.string({
            required_error: 'Birthdate is required'
        }),
        country: zod_1.default.string({
            required_error: 'Country is required'
        })
    }).partial()
});
//# sourceMappingURL=userSchema.js.map