"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeFromOne = exports.exclude = void 0;
const exclude = (users, keys) => {
    users.forEach(user => {
        keys.forEach(key => {
            delete user[key];
        });
    });
    return users;
};
exports.exclude = exclude;
const excludeFromOne = (user, keys) => {
    keys.forEach(key => {
        delete user[key];
    });
    return user;
};
exports.excludeFromOne = excludeFromOne;
