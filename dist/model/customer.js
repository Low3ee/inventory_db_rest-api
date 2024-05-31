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
const table = "tblcustomer";
function insert(customer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [id] = yield (0, db_1.db)(table).insert(customer);
            return id;
        }
        catch (error) {
            console.error("Error inserting customer:", error);
            throw new Error("Could not insert customer");
        }
    });
}
exports.insert = insert;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, db_1.db)(table)
                .join("tbladdress", "tblcustomer.addid", "tbladdress.a_id")
                .select(`${table}.*`, "tbladdress.type as address.type", "tbladdress.street as address.street", "tbladdress.brgy as address.brgy", "tbladdress.city as address.city", "tbladdress.province as address.province", "tbladdress.zipcode as address.zipcode");
            return result;
        }
        catch (error) {
            console.error("Error fetching customers:", error);
            throw new Error("Could not fetch customers");
        }
    });
}
exports.getAll = getAll;
function getById(c_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customer = yield (0, db_1.db)(table)
                .join("tbladdress", "tblcustomer.addid", "tbladdress.a_id")
                .select(`${table}.*`, "tbladdress.type as address.type", "tbladdress.street as address.street", "tbladdress.brgy as address.brgy", "tbladdress.city as address.city", "tbladdress.province as address.province", "tbladdress.zipcode as address.zipcode")
                .where({ "tblcustomer.c_id": c_id })
                .first();
            return customer || null;
        }
        catch (error) {
            console.error(`Error fetching customer with ID ${c_id}:`, error);
            throw new Error("Could not fetch customer");
        }
    });
}
exports.getById = getById;
function update(c_id, customer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const affectedRows = yield (0, db_1.db)(table).where({ c_id }).update(customer);
            if (affectedRows === 0) {
                throw new Error("No rows updated");
            }
            return affectedRows;
        }
        catch (error) {
            console.error(`Error updating customer with ID ${c_id}:`, error);
            throw new Error("Could not update customer");
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
            console.error(`Error deleting customer with ID ${c_id}:`, error);
            throw new Error("Could not delete customer");
        }
    });
}
exports.remove = remove;
