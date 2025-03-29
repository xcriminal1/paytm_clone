const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmQwMmQ3YjRkNGJmNWJjNGVmMDg2ZTciLCJpYXQiOjE3MjQ5MTkxNjN9.5NErE6ezz7KJqU261Rh0z1gS7jSZ7UWBJwm8BMinrvg
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmQwMmY4YTg4OGQwM2Y0ZDNlMGJkZmQiLCJpYXQiOjE3MjQ5MTk2OTF9.uhnsmXAbxTuznqqiuNV4b55I96Duvy3N7F4MGLqdGdQ
const router = express.Router();

//all schemas
const signupSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  username: zod.string().email(),
  password: zod.string(),
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

//all routes
router.post("/signup", async (req, res) => {
  const body = req.body;
  const success = signupSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({ message: "Invalid data" });
  }

  const user = await User.findOne({ username: body.username });
  if (user) {
    return res.status(411).json({ message: "User already exists" });
  }

  const dbUser = await User.create(body);
  const userId = dbUser._id;
  await Account.create({ userId: userId, balance: 1 + Math.random() * 1000 });
  const token = jwt.sign({ userId: userId }, JWT_SECRET);
  res.json({ message: "User created successfully", token: token });
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const success = signinSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({ message: "Error while loggin in" });
  }
  const existingUser = await User.findOne({
    username: body.username,
    password: body.password,
  });

  if (existingUser) {
    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);
    res.json({ message: "User logged in successfully", token: token });
  } else return res.status(411).json({ message: "Error while logging in" });
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );

  res.json({
    message: "Updated successfully",
  });
});

router.get("/details", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    res.json({
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        exists: true,
      },});
  } catch {
    res.json({
      user: {
        exists: false,
      },
    });
  }
  
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });
  //use filter to remove the requesting user from the array
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the user route",
  });
});

module.exports = router;
