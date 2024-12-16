import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    profilePicture: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw16ZRXv5jBHvo9QX4H7onEo&ust=1734436460627000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMD9vbydrIoDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
