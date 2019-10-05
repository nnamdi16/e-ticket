"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const uploadfile_1 = __importDefault(require("../controllers/uploadfile"));
const getUsers_1 = require("../controllers/getUsers");
const upload = multer_1.default({ dest: 'tmp/csv/' });
const router = express_1.default.Router();
router.get('/', getUsers_1.getAllUsers);
router.get('/', getUsers_1.getOneUser);
router.post('/', upload.single('file'), uploadfile_1.default);
router.put('/', getUsers_1.updateUser);
exports.default = router;
//# sourceMappingURL=decagon.js.map