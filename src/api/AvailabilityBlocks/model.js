import mongoose from "mongoose";
import { BlockReason } from "../../constants/enums.js";
import wrapModel from "../../lib/dao.js";

const AvailabilityBlockSchema = new mongoose.Schema(
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
		start: { type: Date, required: true },
		end: { type: Date, required: true },
		reason: { type: String, enum: Object.values(BlockReason), required: true },
		notes: String,

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

AvailabilityBlockSchema.index({ unitId: 1, start: 1, end: 1 });
AvailabilityBlockSchema.index({ cottageId: 1 });

const AvailabilityBlock = mongoose.model(
	"AvailabilityBlock",
	AvailabilityBlockSchema
);
const wrappedModel = wrapModel(AvailabilityBlock);

export default wrappedModel;
export { AvailabilityBlock as Model };
