import { Router } from "express";
import { Category } from "../model/category";
import * as categoryModel from "../model/category";

const router = Router();

router.get("/categories", async (req, res) => {
  try {
    const categories = await categoryModel.getAll();
    return res.status(200).json({
      status: 200,
      message: "Ok",
      data: categories,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.post("/category", async (req, res) => {
  try {
    const body = req.body as Category;
    const newCategoryId = await categoryModel.insert(body);
    return res.status(201).json({
      status: 201,
      message: "Created successfully",
      data: {
        category_id: newCategoryId,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.get("/category/:id", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const category = await categoryModel.getById(categoryId);
    if (category) {
      return res.status(200).json({
        status: 200,
        message: "Ok",
        data: category,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Category not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.put("/category/:id", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const body = req.body as Partial<Category>;
    const affectedRows = await categoryModel.update(categoryId, body);
    if (affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        message: "Updated successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Category not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.delete("/category/:id", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const affectedRows = await categoryModel.remove(categoryId);
    if (affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        message: "Deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Category not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

export default router;
