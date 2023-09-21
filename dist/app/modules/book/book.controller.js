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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const book_service_1 = require("./book.service");
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield book_service_1.bookService.createBook(req.body);
    (0, sendResponse_1.default)(res, http_status_1.default.OK, true, 'Book created Successfully', data);
}));
const getBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const filters = (0, pick_1.default)(req.query, [
        'minPrice',
        'maxPrice',
        'category',
        'search',
    ]);
    const { meta, data } = yield book_service_1.bookService.getBooks(options, filters);
    (0, sendResponse_1.default)(res, http_status_1.default.OK, true, 'Book retrieved Successfully', data, meta);
}));
const getBooksByCategoryId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(req.query, ['page', 'limit']);
    const { meta, data } = yield book_service_1.bookService.getBooksByCategoryId(options, req.params.id);
    (0, sendResponse_1.default)(res, http_status_1.default.OK, true, 'Book retrieved Successfully', data, meta);
}));
const getBookById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield book_service_1.bookService.getBookById(req.params.id);
    (0, sendResponse_1.default)(res, http_status_1.default.OK, true, 'Book retrieved Successfully', data);
}));
const updateBookById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield book_service_1.bookService.updateBookById(req.params.id, req.body);
    (0, sendResponse_1.default)(res, http_status_1.default.OK, true, 'Book updated Successfully', data);
}));
const deleteBookById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield book_service_1.bookService.deleteBookById(req.params.id);
    (0, sendResponse_1.default)(res, http_status_1.default.OK, true, 'Book deleted Successfully', data);
}));
exports.bookController = {
    createBook,
    getBooks,
    getBooksByCategoryId,
    getBookById,
    updateBookById,
    deleteBookById,
};
