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
exports.bookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const getBooks = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { minprice, maxprice, category, search } = filters;
    const where = {};
    if (search) {
        where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { genre: { contains: search, mode: 'insensitive' } },
            { author: { contains: search, mode: 'insensitive' } },
        ];
    }
    if (category) {
        where.categoryId = category;
    }
    if (minprice !== undefined && maxprice !== undefined) {
        where.price = {
            gte: parseFloat(minprice),
            lte: parseFloat(maxprice),
        };
    }
    else if (minprice !== undefined) {
        where.price = {
            gte: parseFloat(minprice),
        };
    }
    else if (maxprice !== undefined) {
        where.price = {
            lte: parseFloat(maxprice),
        };
    }
    const result = yield prisma_1.default.book.findMany({
        where,
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: limit,
    });
    const count = yield prisma_1.default.book.count({ where });
    const totalPage = Math.ceil(count / limit);
    return {
        meta: {
            page,
            size: limit,
            total: count,
            totalPage,
        },
        data: result,
    };
});
const getBooksByCategoryId = (options, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId,
        },
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.book.count({
        where: {
            categoryId,
        },
    });
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            page,
            size: limit,
            total,
            totalPage,
        },
        data: result,
    };
});
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'book not found');
    }
    return result;
});
const updateBookById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: { id },
        data,
    });
    return result;
});
const deleteBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return book;
});
exports.bookService = {
    createBook,
    getBooks,
    getBooksByCategoryId,
    getBookById,
    updateBookById,
    deleteBookById,
};
