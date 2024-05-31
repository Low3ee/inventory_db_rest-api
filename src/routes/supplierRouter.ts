import { Router } from "express";
import { Supplier } from "../model/supplier";
import * as supplierModel from "../model/supplier";

const router = Router();

router.get("/suppliers", async (req, res) => {
  try {
    const suppliers = await supplierModel.getAll();
    return res.status(200).json({
      status: 200,
      message: "Ok",
      data: suppliers,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.post("/supplier", async (req, res) => {
  try {
    const body = req.body as Supplier;
    const newSupplierId = await supplierModel.insert(body);
    return res.status(201).json({
      status: 201,
      message: "Created successfully",
      data: {
        supplier_id: newSupplierId,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.get("/supplier/:id", async (req, res) => {
  try {
    const supplierId = parseInt(req.params.id);
    const supplier = await supplierModel.getById(supplierId);
    if (supplier) {
      return res.status(200).json({
        status: 200,
        message: "Ok",
        data: supplier,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Supplier not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.put("/supplier/:id", async (req, res) => {
  try {
    const supplierId = parseInt(req.params.id);
    const body = req.body as Partial<Supplier>;
    const affectedRows = await supplierModel.update(supplierId, body);
    if (affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        message: "Updated successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Supplier not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.delete("/supplier/:id", async (req, res) => {
  try {
    const supplierId = parseInt(req.params.id);
    const affectedRows = await supplierModel.remove(supplierId);
    if (affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        message: "Deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Supplier not found",
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
