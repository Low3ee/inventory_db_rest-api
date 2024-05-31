import { Router } from "express";
import { Staff, StaffDetails } from "../model/staff";
import * as staffModel from "../model/staff";

const router = Router();

router.get("/staff", async (req, res) => {
  try {
    const staff = await staffModel.getAll();
    return res.status(200).json({
      status: 200,
      message: "Ok",
      data: staff,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.post("/staff", async (req, res) => {
  try {
    const body = req.body as Staff;
    const newStaffId = await staffModel.insert(body);
    return res.status(201).json({
      status: 201,
      message: "Created successfully",
      data: {
        staff_id: newStaffId,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.get("/staff/:id", async (req, res) => {
  try {
    const staffId = parseInt(req.params.id);
    const staff = await staffModel.getById(staffId);
    if (staff) {
      return res.status(200).json({
        status: 200,
        message: "Ok",
        data: staff,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Staff not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.put("/staff/:id", async (req, res) => {
  try {
    const staffId = parseInt(req.params.id);
    const body = req.body as Partial<Staff>;
    const affectedRows = await staffModel.update(staffId, body);
    if (affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        message: "Updated successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Staff not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.delete("/staff/:id", async (req, res) => {
  try {
    const staffId = parseInt(req.params.id);
    const affectedRows = await staffModel.remove(staffId);
    if (affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        message: "Deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Staff not found",
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
