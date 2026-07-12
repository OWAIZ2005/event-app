import { Request, Response } from "express";
import { authService, loginSchema, signupSchema, refreshTokenSchema } from "../services/authService";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const authController = {
  signup: asyncHandler(async (req: Request, res: Response) => {
    const parsedData = signupSchema.parse(req.body);
    const result = await authService.signup(parsedData);
    res.status(201).json(new ApiResponse(201, result, "User registered successfully"));
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const parsedData = loginSchema.parse(req.body);
    const result = await authService.login(parsedData);
    res.status(200).json(new ApiResponse(200, result, "Login successful"));
  }),

  refreshToken: asyncHandler(async (req: Request, res: Response) => {
    const parsedData = refreshTokenSchema.parse(req.body);
    const result = await authService.refreshToken(parsedData);
    res.status(200).json(new ApiResponse(200, result, "Token refreshed successfully"));
  }),
};
