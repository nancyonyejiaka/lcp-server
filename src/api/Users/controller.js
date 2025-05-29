import Users from "./model.js";
import { UserRole } from "../../constants/enums.js";

export const create = async (req, res, next) => {
	try {
		const user = await Users.create({
			...req.body,
			role: req.body.role || UserRole.GUEST,
		});
		res.status(201).json(user);
	} catch (err) {
		next(err);
	}
};

export const findAll = async (_req, res, next) => {
	try {
		res.json(await Users.findAll());
	} catch (err) {
		next(err);
	}
};

export const findById = async (req, res, next) => {
	try {
		const u = await Users.findById(req.params.id);
		if (!u) return res.status(404).json({ message: "User not found" });
		res.json(u);
	} catch (err) {
		next(err);
	}
};

export const updateById = async (req, res, next) => {
	try {
		const updated = await Users.updateById(req.params.id, req.body);
		if (!updated) return res.status(404).json({ message: "User not found" });
		res.json(updated);
	} catch (err) {
		next(err);
	}
};

export const deleteById = async (req, res, next) => {
	try {
		const deleted = await Users.removeById(req.params.id);
		if (!deleted) return res.status(404).json({ message: "User not found" });
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};
