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
const table = "tblstaff";
function insert(staff) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [id] = yield (0, db_1.db)(table).insert(staff);
            return id;
        }
        catch (error) {
            console.error("Error inserting staff:", error);
            throw new Error("Could not insert staff");
        }
    });
}
exports.insert = insert;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, db_1.db)(table)
                .join("tbladdress", "tbladdress.a_id", `${table}.address_id`)
                .join("tblrole", "tblrole.r_id", `${table}.role_id`)
                .select(`${table}.*`, db_1.db.raw("CONCAT(tbladdress.street, ', ', tbladdress.city, ', ', tbladdress.province, ', ', tbladdress.zipcode) AS address"), "tblrole.role_name AS role");
            return result;
        }
        catch (error) {
            console.error("Error fetching staff members:", error);
            throw new Error("Could not fetch staff members");
        }
    });
}
exports.getAll = getAll;
function getById(s_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const staff = yield (0, db_1.db)(table)
                .join("tbladdress", "tbladdress.a_id", `${table}.address_id`)
                .join("tblrole", "tblrole.r_id", `${table}.role_id`)
                .select(`${table}.*`, db_1.db.raw("CONCAT(tbladdress.street, ', ', tbladdress.city, ', ', tbladdress.province, ', ', tbladdress.zipcode) AS address"), "tblrole.role_name AS role")
                .where({ [`${table}.s_id`]: s_id })
                .first();
            return staff || null;
        }
        catch (error) {
            console.error(`Error fetching staff with ID ${s_id}:`, error);
            throw new Error("Could not fetch staff");
        }
    });
}
exports.getById = getById;
function update(s_id, staff) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const affectedRows = yield (0, db_1.db)(table).where({ s_id }).update(staff);
            if (affectedRows === 0) {
                throw new Error("No rows updated");
            }
            return affectedRows;
        }
        catch (error) {
            console.error(`Error updating staff with ID ${s_id}:`, error);
            throw new Error("Could not update staff");
        }
    });
}
exports.update = update;
function remove(s_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const affectedRows = yield (0, db_1.db)(table).where({ s_id }).del();
            if (affectedRows === 0) {
                throw new Error("No rows deleted");
            }
            return affectedRows;
        }
        catch (error) {
            console.error(`Error deleting staff with ID ${s_id}:`, error);
            throw new Error("Could not delete staff");
        }
    });
}
exports.remove = remove;
