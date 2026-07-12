import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middlewares/errorMiddleware";
import { ApiResponse } from "./utils/ApiResponse";
import { logger } from "./utils/logger";

import authRoutes from "./routes/authRoute";
import eventRoutes from "./routes/eventRoute";
import userRoutes from "./routes/userRoute";
import clubRoutes from "./routes/clubRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Logging
app.use(morgan("dev", { stream: { write: (message) => logger.info(message.trim()) } }));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

// Basic health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json(new ApiResponse(200, null, "Event App API is running!"));
});

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
