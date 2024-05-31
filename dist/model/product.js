"use strict";
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
exports.remove = exports.update = exports.getById = exports.getAll = exports.insert = void 0;
const db_1 = require("../db");
const table = "tblproduct";
function insert(product) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [id] = yield (0, db_1.db)(table).insert(product);
            return id;
        }
        catch (error) {
            console.error("Error inserting product:", error);
            throw new Error("Could not insert product");
        }
    });
}
exports.insert = insert;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, db_1.db)(table)
                .join("tblcategory", "tblproduct.category_id", "tblcategory.c_id")
                .select(`${table}.*`, "tblcategory.name as category_name");
            return result;
        }
        catch (error) {
            console.error("Error fetching products:", error);
            throw new Error("Could not fetch products");
        }
    });
}
exports.getAll = getAll;
function getById(p_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield (0, db_1.db)(table)
                .join("tblcategory", "tblproduct.category_id", "tblcategory.c_id")
                .select(`${table}.*`, "tblcategory.name as category_name")
                .where({ "tblproduct.p_id": p_id })
                .first();
            return product || null;
        }
        catch (error) {
            console.error(`Error fetching product with ID ${p_id}:`, error);
            throw new Error("Could not fetch product");
        }
    });
}
exports.getById = getById;
function update(p_id, product) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const affectedRows = yield (0, db_1.db)(table)
                .where({ p_id })
                .update(product);
            if (affectedRows === 0) {
                throw new Error("No rows updated");
            }
            return affectedRows;
        }
        catch (error) {
            console.error(`Error updating product with ID ${p_id}:`, error);
            throw new Error("Could not update product");
        }
    });
}
exports.update = update;
function remove(p_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const affectedRows = yield (0, db_1.db)(table).where({ p_id }).del();
            if (affectedRows === 0) {
                throw new Error("No rows deleted");
            }
            return affectedRows;
        }
        catch (error) {
            console.error(`Error deleting product with ID ${p_id}:`, error);
            throw new Error("Could not delete product");
        }
    });
}
exports.remove = remove;
