import { Router } from "express";
import { Product, ProductWithCategory } from "../model/product";
import * as productModel from "../model/product";

const router = Router();

router.get("/products", async (req, res) => {
  try {
    const products = await productModel.getAll();
    return res.status(200).json({
      status: 200,
      message: "Ok",
      data: products,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.post("/product", async (req, res) => {
  try {
    const body = req.body as Product;
    const newProductId = await productModel.insert(body);
    return res.status(201).json({
      status: 201,
      message: "Created successfully",
      data: {
        product_id: newProductId,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await productModel.getById(productId);
    if (product) {
      return res.status(200).json({
        status: 200,
        message: "Ok",
        data: product,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.put("/product/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const body = req.body as Partial<Product>;
    const affectedRows = await productModel.update(productId, body);
    if (affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        message: "Updated successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.delete("/product/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const affectedRows = await productModel.remove(productId);
    if (affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        message: "Deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
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
