"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
const router = express_1.default.Router();
router.post('/create-book', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(book_validation_1.bookValidation.create), book_controller_1.bookController.createBook);
router.get('/', book_controller_1.bookController.getBooks);
router.get('/:id', book_controller_1.bookController.getBookById);
router.get('/:id/categoryId', book_controller_1.bookController.getBooksByCategoryId);
router.patch('/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(book_validation_1.bookValidation.update), book_controller_1.bookController.updateBookById);
router.delete('/:id', (0, auth_1.default)('admin'), book_controller_1.bookController.deleteBookById);
exports.bookRoutes = router;
