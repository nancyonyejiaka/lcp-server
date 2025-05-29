import express from "express";
import * as ctrl from "./controller.js";

const router = express.Router();

router.get("/", ctrl.findAll);
router.get("/:id", ctrl.findById);
router.post("/", ctrl.create);
router.patch("/:id", ctrl.updateById);
router.delete("/:id", ctrl.deleteById);

export default router;
