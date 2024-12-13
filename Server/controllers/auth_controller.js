import User from "../models/auth_model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// SignUpHandler
export const signup = async (req, res, next) => {
  try {
    // Server-side validation
    const { username, email, password } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      // return res.status(400).json({ message: "All fields are required" });
      next(errorHandler(400, "All fields are required"));
    }

    // Check if the username already exists
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return next(errorHandler(400, "Username already exists"));
    }

    // Check if the email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return next(errorHandler(400, "Email already exists"));
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

// SignInHandler
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Server-side validation
    if (!email || !password || email === "" || password === "") {
      // return res.status(400).json({ message: "All fields are required" });
      next(errorHandler(400, "All fields are required"));
    }
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(401, "Invalid email or password"));
    }
    // Check if the password is correct
    const isPasswordCorrect = bcryptjs.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(errorHandler(401, "Invalid email or password"));
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const { password: pass, ...rest } = user._doc;
    // res.json({ message: "User logged in successfully", token });
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    return next(error);
  }
};
