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
const productModel = __importStar(require("../model/product"));
const router = (0, express_1.Router)();
router.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel.getAll();
        return res.status(200).json({
            status: 200,
            message: "Ok",
            data: products,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
}));
router.post("/product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newProductId = yield productModel.insert(body);
        return res.status(201).json({
            status: 201,
            message: "Created successfully",
            data: {
                product_id: newProductId,
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
router.get("/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = parseInt(req.params.id);
        const product = yield productModel.getById(productId);
        if (product) {
            return res.status(200).json({
                status: 200,
                message: "Ok",
                data: product,
            });
        }
        else {
            return res.status(404).json({
                status: 404,
                message: "Product not found",
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
router.put("/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = parseInt(req.params.id);
        const body = req.body;
        const affectedRows = yield productModel.update(productId, body);
        if (affectedRows > 0) {
            return res.status(200).json({
                status: 200,
                message: "Updated successfully",
            });
        }
        else {
            return res.status(404).json({
                status: 404,
                message: "Product not found",
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
router.delete("/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = parseInt(req.params.id);
        const affectedRows = yield productModel.remove(productId);
        if (affectedRows > 0) {
            return res.status(200).json({
                status: 200,
                message: "Deleted successfully",
            });
        }
        else {
            return res.status(404).json({
                status: 404,
                message: "Product not found",
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
