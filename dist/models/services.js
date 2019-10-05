"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const v4_1 = __importDefault(require("uuid/v4"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Service = new mongoose_1.default.Schema({
    serviceId: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
    },
    token: {
        type: String,
    },
    password: {
        type: String,
    },
    salt: {
        type: String,
    },
}, {
    id: false,
    timestamps: true,
});
Service.methods.setPassword = function (password) {
    this.salt = crypto_1.default.randomBytes(16).toString('hex');
    return (this.password = crypto_1.default
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex'));
};
Service.methods.comparePassword = function (password, salt, hashedPassword) {
    const hash = crypto_1.default
        .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
        .toString('hex');
    return hashedPassword === hash;
};
Service.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    return (this.token = jsonwebtoken_1.default.sign({
        email: this.email,
        id: this._id,
        exp: parseInt((expirationDate.getTime() / 1000).toString(), 10),
    }, 'secret'));
};
Service.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        salt: this.salt,
        token: this.generateJWT(),
        password: this.setPassword(this.password),
    };
};
Service.pre('save', function () {
    if (this.isNew) {
        this.serviceId = v4_1.default();
    }
});
Service.methods.gravatar = function (size = 200) {
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto_1.default
        .createHash('md5')
        .update(this.email)
        .digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};
exports.default = mongoose_1.default.model('Service', Service);
//# sourceMappingURL=services.js.map