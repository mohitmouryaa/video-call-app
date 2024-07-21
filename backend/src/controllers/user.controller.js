import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Username and password are required!" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User not found!" });
    }

    if (bcrypt.compare(password, user.password)) {
      const token = crypto.randomBytes(20).toString("hex");
      user.token = token;
      await user.save();
      return res.status(httpStatus.OK).json({ message: "User Logged in successfully!", user });
    }
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid credentials!" });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong ${err}` });
  }
};

export const register = async (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Name, username, and password are required!" });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(httpStatus.FOUND).json({ message: "User already exists!" });
    }
    const hashedPassword = await hash(password, 10);
    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(httpStatus.CREATED).json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong ${err}` });
  }
};
