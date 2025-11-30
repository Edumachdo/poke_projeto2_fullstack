const express = require("express");
const { body, query, param, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const cacheMiddleware = require("../middleware/cacheMiddleware");
const Pokemon = require("../models/pokemon.model");

const router = express.Router();

// Protect all routes in this file
router.use(authMiddleware);

// GET /api/pokemon?search=...
router.get(
  "/",
  cacheMiddleware(30),
  [
    query("search").optional().trim().escape(),
    query("page")
      .optional()
      .isInt({ min: 1 })
      .toInt()
      .withMessage("Page must be a positive integer."),
    query("limit")
      .optional()
      .isInt({ min: 1 })
      .toInt()
      .withMessage("Limit must be a positive integer."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { search, page = 1, limit = 30 } = req.query;

    try {
      const { pokemons, totalItems } = await Pokemon.findAll(
        search,
        page,
        limit
      );
      const totalPages = Math.ceil(totalItems / limit);

      res.json({
        pokemons,
        currentPage: page,
        totalPages,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// POST /api/pokemon
router.post(
  "/",
  body("id").isInt({ min: 1 }),
  body("name").trim().not().isEmpty().escape(),
  body("data").isObject(),
  body("data.types")
    .isArray({ min: 1 })
    .withMessage("Types must be a non-empty array."),
  // weaknesses and stats are optional for minimal insertion UI — validate if present
  body("data.weaknesses")
    .optional()
    .isArray()
    .withMessage("Weaknesses must be an array if provided."),
  body("data.stats").optional().isObject(),
  body("data.stats.*")
    .optional()
    .isNumeric()
    .withMessage("All stat values must be numeric if provided."),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const result = await Pokemon.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error("Full error object:", error);
      if (error.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ error: "A Pokémon with this ID already exists." });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// PUT /api/pokemon/:id
router.put(
  "/:id",
  param("id").isInt().withMessage("ID must be an integer"),
  body("name").trim().not().isEmpty().escape(),
  body("data").isObject(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
      const result = await Pokemon.update(id, req.body);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Pokémon not found" });
      }
      res.status(200).json({ message: "Pokémon updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// DELETE /api/pokemon/:id
router.delete(
  "/:id",
  param("id").isInt().withMessage("ID must be an integer"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
      const result = await Pokemon.delete(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Pokémon not found" });
      }
      res.status(200).json({ message: "Pokémon deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
