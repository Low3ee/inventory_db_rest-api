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
const table = "tbladdress";
function insert(address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [id] = yield (0, db_1.db)(table).insert(address);
            return id;
        }
        catch (error) {
            console.error("Error inserting address:", error);
            throw new Error("Could not insert address");
        }
    });
}
exports.insert = insert;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, db_1.db)(table)
                .join("tblcustomer", "tblcustomer.addid", `${table}.a_id`)
                .select(`${table}.*`, db_1.db.raw("CONCAT(tblcustomer.firstname, ' ', tblcustomer.lastname) AS name"));
            return result;
        }
        catch (error) {
            console.error("Error fetching addresses:", error);
            throw new Error("Could not fetch addresses");
        }
    });
}
exports.getAll = getAll;
function getById(a_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const address = yield (0, db_1.db)(table).where({ a_id }).first();
            return address || null;
        }
        catch (error) {
            console.error(`Error fetching address with ID ${a_id}:`, error);
            throw new Error("Could not fetch address");
        }
    });
}
exports.getById = getById;
function update(a_id, address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const affectedRows = yield (0, db_1.db)(table)
                .where({ a_id })
                .update(address);
            if (affectedRows === 0) {
                throw new Error("No rows updated");
            }
            return affectedRows;
        }
        catch (error) {
            console.error(`Error updating address with ID ${a_id}:`, error);
            throw new Error("Could not update address");
        }
    });
}
exports.update = update;
function remove(a_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const affectedRows = yield (0, db_1.db)(table).where({ a_id }).del();
            if (affectedRows === 0) {
                throw new Error("No rows deleted");
            }
            return affectedRows;
        }
        catch (error) {
            console.error(`Error deleting address with ID ${a_id}:`, error);
            throw new Error("Could not delete address");
        }
    });
}
exports.remove = remove;
