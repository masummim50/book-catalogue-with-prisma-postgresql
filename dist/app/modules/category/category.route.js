"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.post('/create-category', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(category_validation_1.categoryValidation.create), category_controller_1.categoryController.createCategory);
router.get('/', category_controller_1.categoryController.getCategories);
router.get('/:id', category_controller_1.categoryController.getCategoryById);
router.patch('/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(category_validation_1.categoryValidation.update), category_controller_1.categoryController.updateCategoryById);
router.delete('/:id', (0, auth_1.default)('admin'), category_controller_1.categoryController.deleteCategoryById);
exports.categoryRoutes = router;
