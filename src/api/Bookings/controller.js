import Bookings from "./model.js";
import { BookingStatus } from "../../constants/enums.js";

export const create = async (req, res, next) => {
	try {
		const booking = await Bookings.create(req.body);
		res.status(201).json(booking);
	} catch (err) {
		// duplicate key (double-booking)
		if (err.code === 11000) {
			return res
				.status(409)
				.json({ message: "This unit is already booked for those dates." });
		}
		next(err);
	}
};

export const findAll = async (_req, res, next) => {
	try {
		res.json(await Bookings.findAll());
	} catch (err) {
		next(err);
	}
};

export const findById = async (req, res, next) => {
	try {
		const b = await Bookings.findById(req.params.id);
		if (!b) return res.status(404).json({ message: "Booking not found" });
		res.json(b);
	} catch (err) {
		next(err);
	}
};

export const updateById = async (req, res, next) => {
	try {
		const up = await Bookings.updateById(req.params.id, req.body);
		if (!up) return res.status(404).json({ message: "Booking not found" });
		res.json(up);
	} catch (err) {
		if (err.code === 11000) {
			return res
				.status(409)
				.json({ message: "New dates conflict with an existing booking." });
		}
		next(err);
	}
};

// soft-delete = cancel
export const cancelById = async (req, res, next) => {
	try {
		const cancelled = await Bookings.updateById(req.params.id, {
			status: BookingStatus.CANCELLED,
		});
		if (!cancelled)
			return res.status(404).json({ message: "Booking not found" });
		res.json(cancelled);
	} catch (err) {
		next(err);
	}
};

// hard delete if needed
export const deleteById = async (req, res, next) => {
	try {
		const del = await Bookings.removeById(req.params.id);
		if (!del) return res.status(404).json({ message: "Booking not found" });
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};
