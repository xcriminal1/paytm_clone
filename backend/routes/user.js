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

