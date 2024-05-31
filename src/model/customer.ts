import { db } from "../db";

export interface Customer {
  c_id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  addid: number;
  createdby: number | null;
  createddate: string | null;
  modifiedby: number | null;
  modifieddate: string | null;
}

export interface CustomerWithAddress extends Customer {
  address: {
    type: string;
    street: string;
    brgy: string;
    city: string;
    province: string;
    zipcode: number;
  };
}

const table: string = "tblcustomer";

// Insert a new customer
export async function insert(customer: Customer): Promise<number> {
  try {
    const [id] = await db<Customer>(table).insert(customer);
    return id;
  } catch (error) {
    console.error("Error inserting customer:", error);
    throw new Error("Could not insert customer");
  }
}

// Get all customers with their addresses
export async function getAll(): Promise<CustomerWithAddress[]> {
  try {
    const result = await db<Customer>(table)
      .join("tbladdress", "tblcustomer.addid", "tbladdress.a_id")
      .select(
        `${table}.*`,
        "tbladdress.type as address.type",
        "tbladdress.street as address.street",
        "tbladdress.brgy as address.brgy",
        "tbladdress.city as address.city",
        "tbladdress.province as address.province",
        "tbladdress.zipcode as address.zipcode"
      );
    return result;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Could not fetch customers");
  }
}

// Get customer by ID with address
export async function getById(c_id: number): Promise<CustomerWithAddress | null> {
  try {
    const customer = await db<Customer>(table)
      .join("tbladdress", "tblcustomer.addid", "tbladdress.a_id")
      .select(
        `${table}.*`,
        "tbladdress.type as address.type",
        "tbladdress.street as address.street",
        "tbladdress.brgy as address.brgy",
        "tbladdress.city as address.city",
        "tbladdress.province as address.province",
        "tbladdress.zipcode as address.zipcode"
      )
      .where({ "tblcustomer.c_id": c_id })
      .first();
    return customer || null;
  } catch (error) {
    console.error(`Error fetching customer with ID ${c_id}:`, error);
    throw new Error("Could not fetch customer");
  }
}

// Update a customer by ID
export async function update(c_id: number, customer: Partial<Customer>): Promise<number> {
  try {
    const affectedRows = await db<Customer>(table).where({ c_id }).update(customer);
    if (affectedRows === 0) {
      throw new Error("No rows updated");
    }
    return affectedRows;
  } catch (error) {
    console.error(`Error updating customer with ID ${c_id}:`, error);
    throw new Error("Could not update customer");
  }
}

// Delete a customer by ID
export async function remove(c_id: number): Promise<number> {
  try {
    const affectedRows = await db<Customer>(table).where({ c_id }).del();
    if (affectedRows === 0) {
      throw new Error("No rows deleted");
    }
    return affectedRows;
  } catch (error) {
    console.error(`Error deleting customer with ID ${c_id}:`, error);
    throw new Error("Could not delete customer");
  }
}
