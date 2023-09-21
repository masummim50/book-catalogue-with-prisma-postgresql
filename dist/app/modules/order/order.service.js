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
exports.orderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const bookIds = [];
    data.orderedBooks.forEach(order => {
        bookIds.push(order.bookId);
    });
    const booksExist = yield prisma_1.default.book.findMany({
        where: {
            id: {
                in: bookIds,
            },
        },
    });
    const allBooksExist = booksExist.length === bookIds.length;
    if (!allBooksExist) {
        throw new ApiError_1.default(http_status_1.default.OK, 'One or more book with provided id does not exist');
    }
    const result = yield prisma_1.default.order.create({
        data: {
            userId,
            orderedBooks: data.orderedBooks,
        },
    });
    return result;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield prisma_1.default.order.findMany();
    return orders;
});
const getAllOrdersOfCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield prisma_1.default.order.findMany({
        where: {
            userId: id,
        },
    });
    return orders;
});
const getOrderById = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prisma_1.default.order.findUnique({
        where: {
            id,
        },
    });
    if (!order) {
        throw new ApiError_1.default(http_status_1.default.OK, 'Order not found');
    }
    if (user.role === 'customer') {
        if (order.userId != user.userId) {
            throw new ApiError_1.default(http_status_1.default.OK, 'you are not authorized to view this order');
        }
    }
    return order;
});
exports.orderService = {
    createOrder,
    getAllOrders,
    getAllOrdersOfCustomer,
    getOrderById,
};
