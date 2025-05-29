import mongoose from "mongoose";
import { BookingStatus, BookingSource } from "../../constants/enums.js";
import wrapModel from "../../lib/dao.js";

const BookingSchema = new mongoose.Schema(
	{
		unitId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Unit",
			required: true,
		},
		cottageId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Cottage",
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		status: {
			type: String,
			enum: Object.values(BookingStatus),
			default: BookingStatus.PENDING,
		},
		source: {
			type: String,
			enum: Object.values(BookingSource),
			default: BookingSource.DIRECT,
		},

		checkIn: { type: Date, required: true },
		checkOut: { type: Date, required: true },

		guestCount: {
			adults: { type: Number, default: 2 },
			children: { type: Number, default: 0 },
		},
		guestNames: [String],
		icalEventUid: String,
		notes: String,
	},
	{ timestamps: true }
);

// unique overlap guard (ignore CANCELLED)
BookingSchema.index(
	{ unitId: 1, checkIn: 1, checkOut: 1, status: 1 },
	{
		unique: true,
		partialFilterExpression: { status: { $ne: BookingStatus.CANCELLED } },
	}
);

BookingSchema.index({ userId: 1, createdAt: -1 });
const Booking = mongoose.model("Booking", BookingSchema);
const wrappedModel = wrapModel(Booking);

export default wrappedModel;
export { Booking as Model };
