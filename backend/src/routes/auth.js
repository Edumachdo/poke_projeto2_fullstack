const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/user.model");

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

router.post(
  "/login",
  body("email").isEmail().normalizeEmail(),
  body("password").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findByEmail(email);

      if (!user) {
        console.error(`Login failed: User not found - ${email}`);
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const match = await bcrypt.compare(password, user.password_hash);

      if (!match) {
        console.error(`Login failed: Invalid password for user - ${email}`);
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
        algorithm: "HS256",
        expiresIn: "24h",
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post(
  "/register",
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res
          .status(409)
          .json({ error: "User with this email already exists." });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      await User.create(email, passwordHash);

      res.status(201).json({ message: "User created successfully." });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
