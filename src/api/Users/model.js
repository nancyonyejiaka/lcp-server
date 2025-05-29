import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserRole } from "../../constants/enums.js";
import wrapModel from "../../lib/dao.js";

const UserSchema = new mongoose.Schema(
	{
		role: {
			type: String,
			enum: Object.values(UserRole),
			default: UserRole.GUEST,
		},
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		name: {
			first: { type: String, required: true },
			last: { type: String, required: true },
		},
		phone: String,
		passwordHash: { type: String, required: true },
	},
	{ timestamps: true }
);

// Hash whenever the password changes
UserSchema.pre("save", async function (next) {
	if (!this.isModified("passwordHash")) return next();
	const salt = await bcrypt.genSalt(12);
	this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
	next();
});

UserSchema.methods.comparePassword = function (plain) {
	return bcrypt.compare(plain, this.passwordHash);
};

UserSchema.index({ role: 1 });

const User = mongoose.model("User", UserSchema);
const wrappedModel = wrapModel(User);

export default wrappedModel;
export { User as Model };
