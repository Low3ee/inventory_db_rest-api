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
const table = "tblcategory";
function insert(category) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [id] = yield (0, db_1.db)(table).insert(category);
            return id;
        }
        catch (error) {
            console.error("Error inserting category:", error);
            throw new Error("Could not insert category");
        }
    });
}
exports.insert = insert;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, db_1.db)(table).select();
            return result;
        }
        catch (error) {
            console.error("Error fetching categories:", error);
            throw new Error("Could not fetch categories");
        }
    });
}
exports.getAll = getAll;
function getById(c_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield (0, db_1.db)(table).where({ c_id }).first();
            return category || null;
        }
        catch (error) {
            console.error(`Error fetching category with ID ${c_id}:`, error);
            throw new Error("Could not fetch category");
        }
    });
}
exports.getById = getById;
function update(c_id, category) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const affectedRows = yield (0, db_1.db)(table)
                .where({ c_id })
                .update(category);
            if (affectedRows === 0) {
                throw new Error("No rows updated");
            }
            return affectedRows;
        }
        catch (error) {
            console.error(`Error updating category with ID ${c_id}:`, error);
            throw new Error("Could not update category");
        }
    });
}
exports.update = update;
function remove(c_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const affectedRows = yield (0, db_1.db)(table).where({ c_id }).del();
            if (affectedRows === 0) {
                throw new Error("No rows deleted");
            }
            return affectedRows;
        }
        catch (error) {
            console.error(`Error deleting category with ID ${c_id}:`, error);
            throw new Error("Could not delete category");
        }
    });
}
exports.remove = remove;
