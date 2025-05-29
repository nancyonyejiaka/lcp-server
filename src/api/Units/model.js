import mongoose from "mongoose";
import wrapModel from "../../lib/dao.js";

const UnitSchema = new mongoose.Schema(
	{
		cottageId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Cottage",
			required: true,
		},
		code: { type: String, unique: true, required: true },
		name: { type: String, required: true },
		sleeps: Number,
		bedrooms: Number,
		bathrooms: Number,
		amenities: [String],
		icalUid: { type: String, unique: true },
		images: [{ url: String, caption: String }],
	},
	{ timestamps: true }
);

UnitSchema.index({ code: 1 }, { unique: true });
UnitSchema.index({ cottageId: 1 });

const Unit = mongoose.model("Unit", UnitSchema);
const wrappedModel = wrapModel(Unit);

export default wrappedModel;
export { Unit as Model };
