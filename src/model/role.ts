import { db } from "../db";

export interface Role {
  r_id: number;
  role_name: string;
  description: string | null;
  createdby: number | null;
  createddate: string | null;
  modifiedby: number | null;
  modifieddate: string | null;
}

const table: string = "tblrole";

// Insert a new role
export async function insert(role: Role): Promise<number> {
  try {
    const [id] = await db<Role>(table).insert(role);
    return id;
  } catch (error) {
    console.error("Error inserting role:", error);
    throw new Error("Could not insert role");
  }
}

// Get all roles
export async function getAll(): Promise<Role[]> {
  try {
    const result = await db<Role>(table).select();
    return result;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw new Error("Could not fetch roles");
  }
}

// Get role by ID
export async function getById(r_id: number): Promise<Role | null> {
  try {
    const role = await db<Role>(table).where({ r_id }).first();
    return role || null;
  } catch (error) {
    console.error(`Error fetching role with ID ${r_id}:`, error);
    throw new Error("Could not fetch role");
  }
}

// Update a role by ID
export async function update(
  r_id: number,
  role: Partial<Role>
): Promise<number> {
  try {
    const affectedRows = await db<Role>(table).where({ r_id }).update(role);
    if (affectedRows === 0) {
      throw new Error("No rows updated");
    }
    return affectedRows;
  } catch (error) {
    console.error(`Error updating role with ID ${r_id}:`, error);
    throw new Error("Could not update role");
  }
}

// Delete a role by ID
export async function remove(r_id: number): Promise<number> {
  try {
    const affectedRows = await db<Role>(table).where({ r_id }).del();
    if (affectedRows === 0) {
      throw new Error("No rows deleted");
    }
    return affectedRows;
  } catch (error) {
    console.error(`Error deleting role with ID ${r_id}:`, error);
    throw new Error("Could not delete role");
  }
}
