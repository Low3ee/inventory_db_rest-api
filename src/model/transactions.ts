import { db } from "../db";

export interface Transaction {
  transaction_id: number;
  customer_id: number;
  product_id: number;
  quantity: number;
  total_price: number;
  transaction_date: string;
  createdby: number | null;
  createddate: string | null;
  modifiedby: number | null;
  modifieddate: string | null;
}

export interface TransactionDetails extends Transaction {
  customer_name: string;
  product_name: string;
}

const table: string = "tbltransaction";

// Insert a new transaction
export async function insert(transaction: Transaction): Promise<number> {
  try {
    const [id] = await db<Transaction>(table).insert(transaction);
    return id;
  } catch (error) {
    console.error("Error inserting transaction:", error);
    throw new Error("Could not insert transaction");
  }
}

// Get all transactions with customer and product names
export async function getAll(): Promise<TransactionDetails[]> {
  try {
    const result: any = await db<Transaction>(table)
      .join("tblcustomer", "tblcustomer.customer_id", `${table}.customer_id`)
      .join("tblproduct", "tblproduct.product_id", `${table}.product_id`)
      .select(
        `${table}.*`,
        db.raw(
          "CONCAT(tblcustomer.firstname, ' ', tblcustomer.lastname) AS customer_name"
        ),
        "tblproduct.name AS product_name"
      );
    return result;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Could not fetch transactions");
  }
}

// Get transaction by ID
export async function getById(
  transaction_id: number
): Promise<TransactionDetails | null> {
  try {
    const transaction = await db<Transaction>(table)
      .join("tblcustomer", "tblcustomer.customer_id", `${table}.customer_id`)
      .join("tblproduct", "tblproduct.product_id", `${table}.product_id`)
      .select(
        `${table}.*`,
        db.raw(
          "CONCAT(tblcustomer.firstname, ' ', tblcustomer.lastname) AS customer_name"
        ),
        "tblproduct.name AS product_name"
      )
      .where({ transaction_id })
      .first();
    return transaction || null;
  } catch (error) {
    console.error(
      `Error fetching transaction with ID ${transaction_id}:`,
      error
    );
    throw new Error("Could not fetch transaction");
  }
}

// Update a transaction by ID
export async function update(
  transaction_id: number,
  transaction: Partial<Transaction>
): Promise<number> {
  try {
    const affectedRows = await db<Transaction>(table)
      .where({ transaction_id })
      .update(transaction);
    if (affectedRows === 0) {
      throw new Error("No rows updated");
    }
    return affectedRows;
  } catch (error) {
    console.error(
      `Error updating transaction with ID ${transaction_id}:`,
      error
    );
    throw new Error("Could not update transaction");
  }
}

// Delete a transaction by ID
export async function remove(transaction_id: number): Promise<number> {
  try {
    const affectedRows = await db<Transaction>(table)
      .where({ transaction_id })
      .del();
    if (affectedRows === 0) {
      throw new Error("No rows deleted");
    }
    return affectedRows;
  } catch (error) {
    console.error(
      `Error deleting transaction with ID ${transaction_id}:`,
      error
    );
    throw new Error("Could not delete transaction");
  }
}
