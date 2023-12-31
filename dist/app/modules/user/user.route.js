"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)('admin'), user_controller_1.userController.getAllUsers);
router.get('/:id', (0, auth_1.default)('admin'), user_controller_1.userController.getUserById);
router.patch('/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(user_validation_1.userValidation.update), user_controller_1.userController.updateUserById);
router.delete('/:id', (0, auth_1.default)('admin'), user_controller_1.userController.deleteUserById);
exports.userRoutes = router;
