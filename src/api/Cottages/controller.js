import Cottages from "./model.js";

export const create = async (req, res, next) => {
	try {
		res.status(201).json(await Cottages.create(req.body));
	} catch (err) {
		next(err);
	}
};

export const findAll = async (_req, res, next) => {
	try {
		res.json(await Cottages.findAll());
	} catch (err) {
		next(err);
	}
};

export const findById = async (req, res, next) => {
	try {
		const doc = await Cottages.findById(req.params.id);
		if (!doc) return res.status(404).json({ message: "Cottage not found" });
		res.json(doc);
	} catch (err) {
		next(err);
	}
};

export const updateById = async (req, res, next) => {
	try {
		const doc = await Cottages.updateById(req.params.id, req.body);
		if (!doc) return res.status(404).json({ message: "Cottage not found" });
		res.json(doc);
	} catch (err) {
		next(err);
	}
};

export const deleteById = async (req, res, next) => {
	try {
		const doc = await Cottages.removeById(req.params.id);
		if (!doc) return res.status(404).json({ message: "Cottage not found" });
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};
