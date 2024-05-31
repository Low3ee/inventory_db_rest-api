"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addressModel = __importStar(require("../model/address"));
const router = (0, express_1.Router)();
router.get("/addresses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addresses = yield addressModel.getAll();
        return res.status(200).json({
            status: 200,
            message: "Ok",
            data: addresses,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
}));
router.post("/address", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newAddressId = yield addressModel.insert(body);
        return res.status(201).json({
            status: 201,
            message: "Created successfully",
            data: {
                address_id: newAddressId,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
}));
router.get("/address/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addressId = parseInt(req.params.id);
        const address = yield addressModel.getById(addressId);
        if (address) {
            return res.status(200).json({
                status: 200,
                message: "Ok",
                data: address,
            });
        }
        else {
            return res.status(404).json({
                status: 404,
                message: "Address not found",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
}));
router.put("/address/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addressId = parseInt(req.params.id);
        const body = req.body;
        const affectedRows = yield addressModel.update(addressId, body);
        if (affectedRows > 0) {
            return res.status(200).json({
                status: 200,
                message: "Updated successfully",
            });
        }
        else {
            return res.status(404).json({
                status: 404,
                message: "Address not found",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
}));
router.delete("/address/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addressId = parseInt(req.params.id);
        const affectedRows = yield addressModel.remove(addressId);
        if (affectedRows > 0) {
            return res.status(200).json({
                status: 200,
                message: "Deleted successfully",
            });
        }
        else {
            return res.status(404).json({
                status: 404,
                message: "Address not found",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
}));
exports.default = router;
