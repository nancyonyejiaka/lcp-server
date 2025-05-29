import Blocks from "./model.js";

export const create = async (req, res, next) => {
	try {
		res.status(201).json(await Blocks.create(req.body));
	} catch (err) {
		next(err);
	}
};

export const findAll = async (_req, res, next) => {
	try {
		res.json(await Blocks.findAll());
	} catch (err) {
		next(err);
	}
};

export const findById = async (req, res, next) => {
	try {
		const doc = await Blocks.findById(req.params.id);
		if (!doc) return res.status(404).json({ message: "Block not found" });
		res.json(doc);
	} catch (err) {
		next(err);
	}
};

export const updateById = async (req, res, next) => {
	try {
		const doc = await Blocks.updateById(req.params.id, req.body);
		if (!doc) return res.status(404).json({ message: "Block not found" });
		res.json(doc);
	} catch (err) {
		next(err);
	}
};

export const deleteById = async (req, res, next) => {
	try {
		const doc = await Blocks.removeById(req.params.id);
		if (!doc) return res.status(404).json({ message: "Block not found" });
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};
