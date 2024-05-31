import { Router } from "express";
import { Address } from "../model/address";
import * as addressModel from "../model/address";

const router = Router();

router.get("/addresses", async (req, res) => {
  try {
    const addresses = await addressModel.getAll();
    return res.status(200).json({
      status: 200,
      message: "Ok",
      data: addresses,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.post("/address", async (req, res) => {
  try {
    const body = req.body as Address;
    const newAddressId = await addressModel.insert(body);
    return res.status(201).json({
      status: 201,
      message: "Created successfully",
      data: {
        address_id: newAddressId,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.get("/address/:id", async (req, res) => {
  try {
    const addressId = parseInt(req.params.id);
    const address = await addressModel.getById(addressId);
    if (address) {
      return res.status(200).json({
        status: 200,
        message: "Ok",
        data: address,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Address not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.put("/address/:id", async (req, res) => {
  try {
    const addressId = parseInt(req.params.id);
    const body = req.body as Partial<Address>;
    const affectedRows = await addressModel.update(addressId, body);
    if (affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        message: "Updated successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Address not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.delete("/address/:id", async (req, res) => {
  try {
    const addressId = parseInt(req.params.id);
    const affectedRows = await addressModel.remove(addressId);
    if (affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        message: "Deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Address not found",
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
