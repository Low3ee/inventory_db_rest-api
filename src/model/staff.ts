import { db } from "../db";

export interface Staff {
  s_id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address_id: number;
  role_id: number;
  createdby: number | null;
  createddate: string | null;
  modifiedby: number | null;
  modifieddate: string | null;
}

export interface StaffDetails extends Staff {
  address: string;
  role: string;
}

const table: string = "tblstaff";

// Insert a new staff member
export async function insert(staff: Staff): Promise<number> {
  try {
    const [id] = await db<Staff>(table).insert(staff);
    return id;
  } catch (error) {
    console.error("Error inserting staff:", error);
    throw new Error("Could not insert staff");
  }
}

// Get all staff members with their address and role
export async function getAll(): Promise<StaffDetails[]> {
  try {
    const result = await db<Staff>(table)
      .join("tbladdress", "tbladdress.a_id", `${table}.address_id`)
      .join("tblrole", "tblrole.r_id", `${table}.role_id`)
      .select(
        `${table}.*`,
        db.raw(
          "CONCAT(tbladdress.street, ', ', tbladdress.city, ', ', tbladdress.province, ', ', tbladdress.zipcode) AS address"
        ),
        "tblrole.role_name AS role"
      );
    return result;
  } catch (error) {
    console.error("Error fetching staff members:", error);
    throw new Error("Could not fetch staff members");
  }
}

// Get staff member by ID with their address and role
export async function getById(s_id: number): Promise<StaffDetails | null> {
  try {
    const staff = await db<Staff>(table)
      .join("tbladdress", "tbladdress.a_id", `${table}.address_id`)
      .join("tblrole", "tblrole.r_id", `${table}.role_id`)
      .select(
        `${table}.*`,
        db.raw(
          "CONCAT(tbladdress.street, ', ', tbladdress.city, ', ', tbladdress.province, ', ', tbladdress.zipcode) AS address"
        ),
        "tblrole.role_name AS role"
      )
      .where({ [`${table}.s_id`]: s_id })
      .first();
    return staff || null;
  } catch (error) {
    console.error(`Error fetching staff with ID ${s_id}:`, error);
    throw new Error("Could not fetch staff");
  }
}

// Update a staff member by ID
export async function update(
  s_id: number,
  staff: Partial<Staff>
): Promise<number> {
  try {
    const affectedRows = await db<Staff>(table).where({ s_id }).update(staff);
    if (affectedRows === 0) {
      throw new Error("No rows updated");
    }
    return affectedRows;
  } catch (error) {
    console.error(`Error updating staff with ID ${s_id}:`, error);
    throw new Error("Could not update staff");
  }
}

// Delete a staff member by ID
export async function remove(s_id: number): Promise<number> {
  try {
    const affectedRows = await db<Staff>(table).where({ s_id }).del();
    if (affectedRows === 0) {
      throw new Error("No rows deleted");
    }
    return affectedRows;
  } catch (error) {
    console.error(`Error deleting staff with ID ${s_id}:`, error);
    throw new Error("Could not delete staff");
  }
}
