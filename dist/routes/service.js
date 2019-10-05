"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../controllers/services");
const service_1 = require("../validation/service");
const router = express_1.Router();
router.post('/signUp', async function (req, res) {
    try {
        const { error, value } = service_1.validateServices(req.body);
        console.log(error, value);
        if (error) {
            return res.status(400).json({
                message: error.message,
            });
        }
        const data = await services_1.signUp(value);
        if (data.error) {
            res.status(401).json({ message: data.msg });
            return;
        }
        const { _id, email } = data.service;
        res.status(200).json({ id: _id, email });
        return res.json;
    }
    catch (error) {
        throw new Error(error);
    }
});
router.post('/login', async function (req, res) {
    try {
        const { error, value } = service_1.validateServices(req.body);
        if (error) {
            res.status(400).json({
                message: error.message,
            });
            return;
        }
        const data = await services_1.login(value);
        //Invalid login
        if (data.error) {
            res.status(401).json({ message: data.msg });
            return;
        }
        //Valid login
        const { _id, email } = data.service;
        req.session.service = { id: _id, email };
        res.status(200).json({
            id: _id,
            email,
            sessionID: req.sessionID,
        });
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.default = router;
//# sourceMappingURL=service.js.map