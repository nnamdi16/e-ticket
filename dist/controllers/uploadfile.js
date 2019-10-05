"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const csv = __importStar(require("fast-csv"));
const decagon_1 = __importDefault(require("../models/decagon"));
const decagon_2 = require("../validation/decagon");
async function uploadFile(req, res) {
    try {
        const fileRows = [];
        //open uploaded file
        await csv
            .parseFile(req.file.path, {
            headers: [
                'firstName',
                'lastName',
                'email',
                'imageUrl',
                'designation',
                'phoneNumber',
                'title',
            ],
            renameHeaders: true,
            trim: true,
        })
            .on('data', function (data) {
            const { error, value } = decagon_2.validateDecagon(data);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            const validUser = decagon_1.default.findOne({ email: value.email });
            if (!validUser) {
                return;
            }
            return fileRows.push(value); //push each rows
        })
            .on('end', function () {
            fs_1.default.unlinkSync(req.file.path);
            decagon_1.default.create(fileRows, function (err) {
                if (err) {
                    throw err;
                }
            });
            //process fileRows and output response
            return res.json({ message: 'valid csv' });
        });
    }
    catch (error) {
        return res.status(500).send({ message: 'Internal Server error' });
    }
    return;
}
exports.default = uploadFile;
//# sourceMappingURL=uploadfile.js.map