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
exports.orderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const paylaod = req.body;
    const data = yield order_service_1.orderService.createOrder(userId, paylaod);
    (0, sendResponse_1.default)(res, http_status_1.default.OK, true, 'Order created Successfully', data);
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    if (((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.role) === 'admin') {
        const data = yield order_service_1.orderService.getAllOrders();
        (0, sendResponse_1.default)(res, http_status_1.default.OK, true, 'Orders retrieved Successfully', data);
    }
    if (((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.role) === 'customer') {
        const data = yield order_service_1.orderService.getAllOrdersOfCustomer((_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.userId);
        (0, sendResponse_1.default)(res, http_status_1.default.OK, true, 'Orders retrieved Successfully', data);
    }
}));
const getOrderById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const data = yield order_service_1.orderService.getOrderById(req.params.id, req === null || req === void 0 ? void 0 : req.user);
        (0, sendResponse_1.default)(res, http_status_1.default.OK, true, 'order retrieved successfully', data);
    }
    else {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You are not authorized');
    }
}));
exports.orderController = {
    createOrder,
    getAllOrders,
    getOrderById,
};
