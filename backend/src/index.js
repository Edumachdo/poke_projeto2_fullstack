require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const authRouter = require("./routes/auth");
const pokemonRouter = require("./routes/pokemon");
const { requestLogger } = require("./middleware/logging");
const rateLimit = require("express-rate-limit");

const app = express();
const port = process.env.PORT || 3000;

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(requestLogger);

app.use("/api", apiLimiter);
app.use("/api/auth", authRouter);
app.use("/api/pokemon", pokemonRouter);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

if (require.main === module) {
  app.listen(port, () => {});
}

module.exports = app;
