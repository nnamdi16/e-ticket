"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendMail_1 = __importDefault(require("../controllers/sendMail"));
const express_1 = require("express");
const getUsers_1 = require("../controllers/getUsers");
const router = express_1.Router();
router.get('/v1/notification/:id', async function (req, res) {
    try {
        const data = await getUsers_1.getUserByDesignation(req.params.id);
        res.status(200).json('Success');
        const result = await sendMail_1.default(data.users, 'Hello Dekla', 'Welcome to a new world');
        return res.status(200).json(result);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.default = router;
//# sourceMappingURL=notification.js.map