"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decagon_1 = __importDefault(require("../models/decagon"));
async function getAllUsers() {
    try {
        const users = await decagon_1.default.find().sort('firstName');
        return { error: false, users };
    }
    catch (error) {
        return { error: true, msg: 'Internal server error' };
    }
}
exports.getAllUsers = getAllUsers;
async function getOneUser(data) {
    try {
        const user = await decagon_1.default.findOne({ userId: data });
        if (!user) {
            return {
                error: true,
                msg: 'User not found',
            };
        }
        return { error: false, user };
    }
    catch (error) {
        return {
            error: true,
            msg: 'User not found',
        };
    }
}
exports.getOneUser = getOneUser;
async function updateUser(data, payload) {
    try {
        const updatedUser = await decagon_1.default.findOne({ userId: data });
        if (!updatedUser) {
            return { error: true, msg: 'User not found' };
        }
        const user = await decagon_1.default.updateOne({ userId: data }, {
            firstName: payload.firstName,
            lastName: payload.lastName,
            designation: payload.designation,
            phoneNumber: payload.phoneNumber,
            title: payload.title,
        });
        return { error: false, user };
    }
    catch (error) {
        return { error: true, msg: 'Internal Server error' };
    }
}
exports.updateUser = updateUser;
async function getUserByDesignation(data) {
    try {
        const users = await decagon_1.default.find({ designation: data });
        if (!users) {
            return { error: true, msg: 'User not found' };
        }
        return {
            error: false,
            users,
        };
    }
    catch (error) {
        return { error: true, msg: 'Internal Server error' };
    }
}
exports.getUserByDesignation = getUserByDesignation;
//# sourceMappingURL=getUsers.js.map