import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide your Name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email Address"],
      unique: [true, "This Email  already exist"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid Email address"],
    },
    picture: {
      type: String,
      default: "https://avatar.iran.liara.run/public",
    },
    status: {
      type: String,
      default: "Hey there am using Pulse",
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: [
        6,
        "Please make sure your password is atleast 6 character Long",
      ],
      maxLength: [
        128,
        "Please make sure your password is less than 6 and 128 character Long",
      ],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});
const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel;
