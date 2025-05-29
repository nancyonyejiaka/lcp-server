import mongoose from "mongoose";
import wrapModel from "../../lib/dao.js";

const CottageSchema = new mongoose.Schema(
	{
		code: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		description: String,
		sharedAmenities: [String],
		images: [{ url: String, caption: String }],
	},
	{ timestamps: true }
);

CottageSchema.index({ code: 1 }, { unique: true });

const Cottage = mongoose.model("Cottage", CottageSchema);
const wrappedModel = wrapModel(Cottage);

export default wrappedModel;
export { Cottage as Model };
