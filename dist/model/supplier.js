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
const table = "tblsupplier";
function insert(supplier) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [id] = yield (0, db_1.db)(table).insert(supplier);
            return id;
        }
        catch (error) {
            console.error("Error inserting supplier:", error);
            throw new Error("Could not insert supplier");
        }
    });
}
exports.insert = insert;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, db_1.db)(table).select("*");
            return result;
        }
        catch (error) {
            console.error("Error fetching suppliers:", error);
            throw new Error("Could not fetch suppliers");
        }
    });
}
exports.getAll = getAll;
function getById(supplier_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const supplier = yield (0, db_1.db)(table).where({ supplier_id }).first();
            return supplier || null;
        }
        catch (error) {
            console.error(`Error fetching supplier with ID ${supplier_id}:`, error);
            throw new Error("Could not fetch supplier");
        }
    });
}
exports.getById = getById;
function update(supplier_id, supplier) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const affectedRows = yield (0, db_1.db)(table)
                .where({ supplier_id })
                .update(supplier);
            if (affectedRows === 0) {
                throw new Error("No rows updated");
            }
            return affectedRows;
        }
        catch (error) {
            console.error(`Error updating supplier with ID ${supplier_id}:`, error);
            throw new Error("Could not update supplier");
        }
    });
}
exports.update = update;
function remove(supplier_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const affectedRows = yield (0, db_1.db)(table).where({ supplier_id }).del();
            if (affectedRows === 0) {
                throw new Error("No rows deleted");
            }
            return affectedRows;
        }
        catch (error) {
            console.error(`Error deleting supplier with ID ${supplier_id}:`, error);
            throw new Error("Could not delete supplier");
        }
    });
}
exports.remove = remove;
