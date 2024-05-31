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
const table = "tblrole";
function insert(role) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [id] = yield (0, db_1.db)(table).insert(role);
            return id;
        }
        catch (error) {
            console.error("Error inserting role:", error);
            throw new Error("Could not insert role");
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
            console.error("Error fetching roles:", error);
            throw new Error("Could not fetch roles");
        }
    });
}
exports.getAll = getAll;
function getById(r_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const role = yield (0, db_1.db)(table).where({ r_id }).first();
            return role || null;
        }
        catch (error) {
            console.error(`Error fetching role with ID ${r_id}:`, error);
            throw new Error("Could not fetch role");
        }
    });
}
exports.getById = getById;
function update(r_id, role) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const affectedRows = yield (0, db_1.db)(table).where({ r_id }).update(role);
            if (affectedRows === 0) {
                throw new Error("No rows updated");
            }
            return affectedRows;
        }
        catch (error) {
            console.error(`Error updating role with ID ${r_id}:`, error);
            throw new Error("Could not update role");
        }
    });
}
exports.update = update;
function remove(r_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const affectedRows = yield (0, db_1.db)(table).where({ r_id }).del();
            if (affectedRows === 0) {
                throw new Error("No rows deleted");
            }
            return affectedRows;
        }
        catch (error) {
            console.error(`Error deleting role with ID ${r_id}:`, error);
            throw new Error("Could not delete role");
        }
    });
}
exports.remove = remove;
