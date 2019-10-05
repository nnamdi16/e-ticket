"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const v4_1 = __importDefault(require("uuid/v4"));
const Decagon = new mongoose_1.default.Schema({
    userId: {
        type: String,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    imageUrl: {
        type: String,
    },
    designation: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    title: {
        type: String,
    },
}, { id: false, timestamps: true });
Decagon.pre('save', function () {
    if (this.isNew) {
        this.imageUrl = 'https://image.flaticon.com/icons/svg/149/149071.svg';
        this.userId = v4_1.default();
    }
});
exports.default = mongoose_1.default.model('Decagon', Decagon);
//# sourceMappingURL=decagon.js.map