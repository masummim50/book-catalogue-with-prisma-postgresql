"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name is required' }),
        email: zod_1.z.string({ required_error: 'email is required' }),
        password: zod_1.z.string({ required_error: 'password is required' }),
        role: zod_1.z.enum(['customer', 'admin'], { required_error: 'role is required' }),
        contactNo: zod_1.z.string({ required_error: 'contact information is required' }),
        address: zod_1.z.string({ required_error: 'address is required' }),
        profileImg: zod_1.z.string({ required_error: 'profileImg url is required' }),
    }),
});
const login = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'email is required' }),
        password: zod_1.z.string({ required_error: 'password is required' }),
    }),
});
exports.authValidation = {
    create,
    login,
};
