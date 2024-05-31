import { Router } from "express";
import { Role } from "../model/role";
import * as roleModel from "../model/role";

const router = Router();

router.get("/roles", async (req, res) => {
  try {
    const roles = await roleModel.getAll();
    return res.status(200).json({
      status: 200,
      message: "Ok",
      data: roles,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.post("/role", async (req, res) => {
  try {
    const body = req.body as Role;
    const newRoleId = await roleModel.insert(body);
    return res.status(201).json({
      status: 201,
      message: "Created successfully",
      data: {
        role_id: newRoleId,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.get("/role/:id", async (req, res) => {
  try {
    const roleId = parseInt(req.params.id);
    const role = await roleModel.getById(roleId);
    if (role) {
      return res.status(200).json({
        status: 200,
        message: "Ok",
        data: role,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Role not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.put("/role/:id", async (req, res) => {
  try {
    const roleId = parseInt(req.params.id);
    const body = req.body as Partial<Role>;
    const affectedRows = await roleModel.update(roleId, body);
    if (affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        message: "Updated successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Role not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.delete("/role/:id", async (req, res) => {
  try {
    const roleId = parseInt(req.params.id);
    const affectedRows = await roleModel.remove(roleId);
    if (affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        message: "Deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Role not found",
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
