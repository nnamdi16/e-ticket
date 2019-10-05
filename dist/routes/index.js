"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sample_1 = __importDefault(require("../controllers/sample"));
const getUsers_1 = require("../controllers/getUsers");
const uploadfile_1 = __importDefault(require("../controllers/uploadfile"));
// import auth from '../routes/auth';
const multer_1 = __importDefault(require("multer"));
const decagon_1 = require("../validation/decagon");
// import * as passportConfig from '../config/passport';
const router = express_1.Router();
const upload = multer_1.default({ dest: 'tmp/csv/' });
router.get('/', function (_req, res, _next) {
    const message = sample_1.default();
    res.status(200).json({ message });
});
router.post('/v1/upload', upload.single('file'), uploadfile_1.default);
//Get all users
router.get('/decagon', async function (_req, res) {
    try {
        const data = await getUsers_1.getAllUsers();
        if (data.error) {
            res.status(500).json({ message: data.msg });
        }
        return res.status(200).json(data);
    }
    catch (error) {
        throw new Error(error);
    }
});
//Get one user
router.get('/decagon/:id', async function (req, res) {
    try {
        const data = await getUsers_1.getOneUser(req.params.id);
        if (data.error) {
            return res.status(404).json({ message: data.msg });
        }
        return res.status(200).json(data);
    }
    catch (error) {
        throw new Error(error);
    }
});
//Update user
router.put('/decagon/:id', async function (req, res) {
    const { error } = decagon_1.validateDecagon(req.body);
    if (error)
        return res.status(400).json(error.details[0].message);
    try {
        const payload = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            designation: req.body.designation,
            phoneNumber: req.body.phoneNumber,
            title: req.body.title,
        };
        const data = await getUsers_1.updateUser(req.params.id, payload);
        if (data.error) {
            return res.status(404).json({ message: data.msg });
        }
        return res.status(200).json(data);
    }
    catch (error) {
        throw new Error(error);
    }
});
//GET USER BY DESIGNATION
router.get('/v1/designation/:id', async function (req, res) {
    try {
        const data = await getUsers_1.getUserByDesignation(req.params.id);
        if (data.error) {
            res.status(404).json({ message: data.msg });
        }
        return res.status(200).json(data);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.default = router;
//# sourceMappingURL=index.js.map