"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
function validateServices(profile) {
    const schema = joi_1.default.object().keys({
        email: joi_1.default.string()
            .email({ minDomainSegments: 2 })
            .lowercase()
            .required(),
        // serviceId: Joi.string()
        //   .min(2)
        //   .max(23),
        password: joi_1.default.string()
            .min(5)
            .max(255)
            .required(),
    });
    return joi_1.default.validate(profile, schema, {
        abortEarly: false,
        skipFunctions: false,
        stripUnknown: true,
    });
}
exports.validateServices = validateServices;
//# sourceMappingURL=service.js.map