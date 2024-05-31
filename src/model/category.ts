import { db } from "../db";

export interface Category {
  c_id: number;
  name: string;
  description: string;
  createdby: number | null;
  createddate: string | null;
  modifiedby: number | null;
  modifieddate: string | null;
}

const table: string = "tblcategory";

// Insert a new category
export async function insert(category: Category): Promise<number> {
  try {
    const [id] = await db<Category>(table).insert(category);
    return id;
  } catch (error) {
    console.error("Error inserting category:", error);
    throw new Error("Could not insert category");
  }
}

// Get all categories
export async function getAll(): Promise<Category[]> {
  try {
    const result = await db<Category>(table).select();
    return result;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Could not fetch categories");
  }
}

// Get category by ID
export async function getById(c_id: number): Promise<Category | null> {
  try {
    const category = await db<Category>(table).where({ c_id }).first();
    return category || null;
  } catch (error) {
    console.error(`Error fetching category with ID ${c_id}:`, error);
    throw new Error("Could not fetch category");
  }
}

// Update a category by ID
export async function update(
  c_id: number,
  category: Partial<Category>
): Promise<number> {
  try {
    const affectedRows = await db<Category>(table)
      .where({ c_id })
      .update(category);
    if (affectedRows === 0) {
      throw new Error("No rows updated");
    }
    return affectedRows;
  } catch (error) {
    console.error(`Error updating category with ID ${c_id}:`, error);
    throw new Error("Could not update category");
  }
}

// Delete a category by ID
export async function remove(c_id: number): Promise<number> {
  try {
    const affectedRows = await db<Category>(table).where({ c_id }).del();
    if (affectedRows === 0) {
      throw new Error("No rows deleted");
    }
    return affectedRows;
  } catch (error) {
    console.error(`Error deleting category with ID ${c_id}:`, error);
    throw new Error("Could not delete category");
  }
}
