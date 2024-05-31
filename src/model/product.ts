import { db } from "../db";

export interface Product {
  p_id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  createdby: number | null;
  createddate: string | null;
  modifiedby: number | null;
  modifieddate: string | null;
}

export interface ProductWithCategory extends Product {
  category_name: string;
}

const table: string = "tblproduct";

// Insert a new product
export async function insert(product: Product): Promise<number> {
  try {
    const [id] = await db<Product>(table).insert(product);
    return id;
  } catch (error) {
    console.error("Error inserting product:", error);
    throw new Error("Could not insert product");
  }
}

// Get all products with their category names
export async function getAll(): Promise<ProductWithCategory[]> {
  try {
    const result = await db<Product>(table)
      .join("tblcategory", "tblproduct.category_id", "tblcategory.c_id")
      .select(`${table}.*`, "tblcategory.name as category_name");
    return result;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch products");
  }
}

// Get product by ID with category name
export async function getById(
  p_id: number
): Promise<ProductWithCategory | null> {
  try {
    const product = await db<Product>(table)
      .join("tblcategory", "tblproduct.category_id", "tblcategory.c_id")
      .select(`${table}.*`, "tblcategory.name as category_name")
      .where({ "tblproduct.p_id": p_id })
      .first();
    return product || null;
  } catch (error) {
    console.error(`Error fetching product with ID ${p_id}:`, error);
    throw new Error("Could not fetch product");
  }
}

// Update a product by ID
export async function update(
  p_id: number,
  product: Partial<Product>
): Promise<number> {
  try {
    const affectedRows = await db<Product>(table)
      .where({ p_id })
      .update(product);
    if (affectedRows === 0) {
      throw new Error("No rows updated");
    }
    return affectedRows;
  } catch (error) {
    console.error(`Error updating product with ID ${p_id}:`, error);
    throw new Error("Could not update product");
  }
}

// Delete a product by ID
export async function remove(p_id: number): Promise<number> {
  try {
    const affectedRows = await db<Product>(table).where({ p_id }).del();
    if (affectedRows === 0) {
      throw new Error("No rows deleted");
    }
    return affectedRows;
  } catch (error) {
    console.error(`Error deleting product with ID ${p_id}:`, error);
    throw new Error("Could not delete product");
  }
}
