import { Router } from "express";
import addressRouter from "./addressRouter";
import categoryRouter from "./categoryRouter";
import customerRouter from "./customerRouter";
import productRouter from "./productRouter";
import roleRouter from "./roleRouter";
import staffRouter from "./staffRouter";
import supplierRouter from "./supplierRouter";
import transactionRouter from "./transactionRouter";

const router = Router();

router.use("/address", addressRouter);
router.use("/category", categoryRouter);
router.use("/customers", customerRouter);
router.use("/products", productRouter);
router.use("/roles", roleRouter);
router.use("/staff", staffRouter);
router.use("/supplier", supplierRouter);
router.use("/transactions", transactionRouter);

export default router;
