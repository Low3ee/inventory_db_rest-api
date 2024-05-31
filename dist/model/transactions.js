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
const table = "tbltransaction";
function insert(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [id] = yield (0, db_1.db)(table).insert(transaction);
            return id;
        }
        catch (error) {
            console.error("Error inserting transaction:", error);
            throw new Error("Could not insert transaction");
        }
    });
}
exports.insert = insert;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, db_1.db)(table)
                .join("tblcustomer", "tblcustomer.customer_id", `${table}.customer_id`)
                .join("tblproduct", "tblproduct.product_id", `${table}.product_id`)
                .select(`${table}.*`, db_1.db.raw("CONCAT(tblcustomer.firstname, ' ', tblcustomer.lastname) AS customer_name"), "tblproduct.name AS product_name");
            return result;
        }
        catch (error) {
            console.error("Error fetching transactions:", error);
            throw new Error("Could not fetch transactions");
        }
    });
}
exports.getAll = getAll;
function getById(transaction_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaction = yield (0, db_1.db)(table)
                .join("tblcustomer", "tblcustomer.customer_id", `${table}.customer_id`)
                .join("tblproduct", "tblproduct.product_id", `${table}.product_id`)
                .select(`${table}.*`, db_1.db.raw("CONCAT(tblcustomer.firstname, ' ', tblcustomer.lastname) AS customer_name"), "tblproduct.name AS product_name")
                .where({ transaction_id })
                .first();
            return transaction || null;
        }
        catch (error) {
            console.error(`Error fetching transaction with ID ${transaction_id}:`, error);
            throw new Error("Could not fetch transaction");
        }
    });
}
exports.getById = getById;
function update(transaction_id, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const affectedRows = yield (0, db_1.db)(table)
                .where({ transaction_id })
                .update(transaction);
            if (affectedRows === 0) {
                throw new Error("No rows updated");
            }
            return affectedRows;
        }
        catch (error) {
            console.error(`Error updating transaction with ID ${transaction_id}:`, error);
            throw new Error("Could not update transaction");
        }
    });
}
exports.update = update;
function remove(transaction_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const affectedRows = yield (0, db_1.db)(table)
                .where({ transaction_id })
                .del();
            if (affectedRows === 0) {
                throw new Error("No rows deleted");
            }
            return affectedRows;
        }
        catch (error) {
            console.error(`Error deleting transaction with ID ${transaction_id}:`, error);
            throw new Error("Could not delete transaction");
        }
    });
}
exports.remove = remove;
