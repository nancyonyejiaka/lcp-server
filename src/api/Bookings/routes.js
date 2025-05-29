import express from "express";
import * as ctrl from "./controller.js";

const router = express.Router();

router.get("/", ctrl.findAll);
router.get("/:id", ctrl.findById);
router.post("/", ctrl.create);
router.patch("/:id", ctrl.updateById);
router.patch("/:id/cancel", ctrl.cancelById); // soft-delete / cancel
router.delete("/:id", ctrl.deleteById); // hard delete (optional)

export default router;
