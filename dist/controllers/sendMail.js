"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypt_1 = require("../helpers/crypt");
require('dotenv').config();
const encryptPass = crypt_1.encrypt(process.env.cryptokey);
const pass = crypt_1.decrypt(encryptPass);
const transport = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'info.sanconference2018@gmail.com',
        pass,
    },
});
async function sendEmail(data, subject, message) {
    const result = data.map(element => element.email);
    result.forEach((to, _i, _array) => {
        const mailOptions = {
            from: 'info.sanconference2018@gmail.com',
            to,
            subject,
            html: message,
        };
        mailOptions.to = to;
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            console.log(`Message sent : ${info.response}`);
        });
    });
}
exports.default = sendEmail;
//# sourceMappingURL=sendMail.js.map