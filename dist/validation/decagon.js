"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
function validateDecagon(profile) {
    const schema = joi_1.default.object().keys({
        firstName: joi_1.default.string()
            .min(2)
            .max(50)
            .required(),
        lastName: joi_1.default.string()
            .min(2)
            .max(50)
            .required(),
        email: joi_1.default.string()
            .email({ minDomainSegments: 2 })
            .lowercase()
            .required(),
        // imageUrl: Joi.string()
        //   .uri({ scheme: 'https' })
        //   .trim()
        //   .allow(null, ''),
        designation: joi_1.default.string()
            .min(2)
            .max(255),
        phoneNumber: joi_1.default.string()
            .regex(/^[0]\d{10}$/)
            .allow(null, ''),
        title: joi_1.default.string()
            .min(2)
            .max(50)
            .allow(null, ''),
        userId: joi_1.default.string()
            .min(2)
            .max(23),
    });
    return joi_1.default.validate(profile, schema, {
        abortEarly: false,
        skipFunctions: false,
        stripUnknown: true,
    });
}
exports.validateDecagon = validateDecagon;
//# sourceMappingURL=decagon.js.map