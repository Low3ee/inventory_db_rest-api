import { Router } from "express";
import { Transaction, TransactionDetails } from "../model/transactions";
import * as transactionModel from "../model/transactions";

const router = Router();

router.get("/transactions", async (req, res) => {
  try {
    const transactions = await transactionModel.getAll();
    return res.status(200).json({
      status: 200,
      message: "Ok",
      data: transactions,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.post("/transaction", async (req, res) => {
  try {
    const body = req.body as Transaction;
    const newTransactionId = await transactionModel.insert(body);
    return res.status(201).json({
      status: 201,
      message: "Created successfully",
      data: {
        transaction_id: newTransactionId,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.get("/transaction/:id", async (req, res) => {
  try {
    const transactionId = parseInt(req.params.id);
    const transaction = await transactionModel.getById(transactionId);
    if (transaction) {
      return res.status(200).json({
        status: 200,
        message: "Ok",
        data: transaction,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Transaction not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.put("/transaction/:id", async (req, res) => {
  try {
    const transactionId = parseInt(req.params.id);
    const body = req.body as Partial<Transaction>;
    const affectedRows = await transactionModel.update(transactionId, body);
    if (affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        message: "Updated successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Transaction not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.delete("/transaction/:id", async (req, res) => {
  try {
    const transactionId = parseInt(req.params.id);
    const affectedRows = await transactionModel.remove(transactionId);
    if (affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        message: "Deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Transaction not found",
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
