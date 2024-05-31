import { Router } from "express";
import { Customer, CustomerWithAddress } from "../model/customer";
import * as customerModel from "../model/customer";

const router = Router();

router.get("/customers", async (req, res) => {
  try {
    const customers = await customerModel.getAll();
    return res.status(200).json({
      status: 200,
      message: "Ok",
      data: customers,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.post("/customer", async (req, res) => {
  try {
    const body = req.body as Customer;
    const newCustomerId = await customerModel.insert(body);
    return res.status(201).json({
      status: 201,
      message: "Created successfully",
      data: {
        customer_id: newCustomerId,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.get("/customer/:id", async (req, res) => {
  try {
    const customerId = parseInt(req.params.id);
    const customer = await customerModel.getById(customerId);
    if (customer) {
      return res.status(200).json({
        status: 200,
        message: "Ok",
        data: customer,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Customer not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.put("/customer/:id", async (req, res) => {
  try {
    const customerId = parseInt(req.params.id);
    const body = req.body as Partial<Customer>;
    const affectedRows = await customerModel.update(customerId, body);
    if (affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        message: "Updated successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Customer not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.delete("/customer/:id", async (req, res) => {
  try {
    const customerId = parseInt(req.params.id);
    const affectedRows = await customerModel.remove(customerId);
    if (affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        message: "Deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Customer not found",
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
