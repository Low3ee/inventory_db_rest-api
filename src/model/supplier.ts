import { db } from "../db";

export interface Supplier {
  supplier_id: number;
  name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  createdby: number | null;
  createddate: string | null;
  modifiedby: number | null;
  modifieddate: string | null;
}

const table: string = "tblsupplier";

// Insert a new supplier
export async function insert(supplier: Supplier): Promise<number> {
  try {
    const [id] = await db<Supplier>(table).insert(supplier);
    return id;
  } catch (error) {
    console.error("Error inserting supplier:", error);
    throw new Error("Could not insert supplier");
  }
}

// Get all suppliers
export async function getAll(): Promise<Supplier[]> {
  try {
    const result = await db<Supplier>(table).select("*");
    return result;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    throw new Error("Could not fetch suppliers");
  }
}

// Get supplier by ID
export async function getById(supplier_id: number): Promise<Supplier | null> {
  try {
    const supplier = await db<Supplier>(table).where({ supplier_id }).first();
    return supplier || null;
  } catch (error) {
    console.error(`Error fetching supplier with ID ${supplier_id}:`, error);
    throw new Error("Could not fetch supplier");
  }
}

// Update a supplier by ID
export async function update(
  supplier_id: number,
  supplier: Partial<Supplier>
): Promise<number> {
  try {
    const affectedRows = await db<Supplier>(table)
      .where({ supplier_id })
      .update(supplier);
    if (affectedRows === 0) {
      throw new Error("No rows updated");
    }
    return affectedRows;
  } catch (error) {
    console.error(`Error updating supplier with ID ${supplier_id}:`, error);
    throw new Error("Could not update supplier");
  }
}

// Delete a supplier by ID
export async function remove(supplier_id: number): Promise<number> {
  try {
    const affectedRows = await db<Supplier>(table).where({ supplier_id }).del();
    if (affectedRows === 0) {
      throw new Error("No rows deleted");
    }
    return affectedRows;
  } catch (error) {
    console.error(`Error deleting supplier with ID ${supplier_id}:`, error);
    throw new Error("Could not delete supplier");
  }
}
