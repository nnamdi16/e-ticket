"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __importDefault(require("../models/services"));
// POST Sign up a service
async function signUp(data) {
    const newService = new services_1.default({
        email: data.email,
        password: data.password,
    });
    try {
        const validService = await services_1.default.exists({ email: data.email });
        if (validService) {
            return {
                error: true,
                msg: 'Service mail already exist',
            };
        }
        newService.setPassword(data.password);
        newService.generateJWT();
        const service = await newService.save();
        return {
            error: false,
            service,
        };
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.signUp = signUp;
async function login(data) {
    const newService = new services_1.default();
    const service = await services_1.default.findOne({ email: data.email });
    if (!service) {
        return {
            error: true,
            msg: 'Invalid credentials. Please check you email and password',
        };
    }
    const { password, salt } = service;
    const correctPassword = await newService.comparePassword(data.password, salt, password);
    if (!correctPassword) {
        return {
            error: true,
            msg: 'Invalid credentials. Please check you email and password',
        };
    }
    return {
        error: false,
        service,
    };
}
exports.login = login;
//# sourceMappingURL=services.js.map