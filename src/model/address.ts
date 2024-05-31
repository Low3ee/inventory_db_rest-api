import { db } from "../db";

export interface Address {
  a_id: number;
  type: string;
  street: string;
  brgy: string;
  city: string;
  province: string;
  zipcode: number;
  createdby: number | null;
  createddate: string | null;
  modifiedby: number | null;
  modifieddate: string | null;
}

const table: string = "tbladdress";

// Insert a new address
export async function insert(address: Address): Promise<number> {
  try {
    const [id] = await db<Address>(table).insert(address);
    return id;
  } catch (error) {
    console.error("Error inserting address:", error);
    throw new Error("Could not insert address");
  }
}

// Get all addresses with customer name
export async function getAll(): Promise<Address[]> {
  try {
    const result = await db<Address>(table)
      .join("tblcustomer", "tblcustomer.addid", `${table}.a_id`)
      .select(
        `${table}.*`,
        db.raw(
          "CONCAT(tblcustomer.firstname, ' ', tblcustomer.lastname) AS name"
        )
      );
    return result;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw new Error("Could not fetch addresses");
  }
}

// Get address by ID
export async function getById(a_id: number): Promise<Address | null> {
  try {
    const address = await db<Address>(table).where({ a_id }).first();
    return address || null;
  } catch (error) {
    console.error(`Error fetching address with ID ${a_id}:`, error);
    throw new Error("Could not fetch address");
  }
}

// Update an address by ID
export async function update(
  a_id: number,
  address: Partial<Address>
): Promise<number> {
  try {
    const affectedRows = await db<Address>(table)
      .where({ a_id })
      .update(address);
    if (affectedRows === 0) {
      throw new Error("No rows updated");
    }
    return affectedRows;
  } catch (error) {
    console.error(`Error updating address with ID ${a_id}:`, error);
    throw new Error("Could not update address");
  }
}

// Delete an address by ID
export async function remove(a_id: number): Promise<number> {
  try {
    const affectedRows = await db<Address>(table).where({ a_id }).del();
    if (affectedRows === 0) {
      throw new Error("No rows deleted");
    }
    return affectedRows;
  } catch (error) {
    console.error(`Error deleting address with ID ${a_id}:`, error);
    throw new Error("Could not delete address");
  }
}
