import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
		name: {
					type: String,
					required: true,
					trim: true,
			          },
		job: {
					type: String,
					required: true,
					trim: true,
					validate(value) {
							if (value.length < 2)
								  throw new Error("Inval_id job, must be at least 2 characters.");
						 },
					 },
	},
   { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

export default User;
