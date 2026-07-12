import { Request, Response } from "express";
import { userService } from "../services/userService";
import { AuthRequest } from "../middlewares/authMiddleware";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const userController = {
  getMe: asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await userService.getUserById(req.user!.userId);
    res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
  }),

  updateMe: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { name, department, yearOfStudy } = req.body;
    const profilePictureUrl = req.file?.path;
    
    const parsedYear = yearOfStudy ? parseInt(yearOfStudy, 10) : undefined;
    
    const updatedUser = await userService.updateUser(
      req.user!.userId, 
      { name, department, yearOfStudy: parsedYear }, 
      profilePictureUrl
    );
    res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
  }),

  toggleFavorite: asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await userService.toggleFavorite(req.user!.userId, req.params.eventId as string);
    res.status(200).json(new ApiResponse(200, result, "Favorite toggled"));
  }),

  getFavorites: asyncHandler(async (req: AuthRequest, res: Response) => {
    const favorites = await userService.getFavorites(req.user!.userId);
    res.status(200).json(new ApiResponse(200, favorites, "Favorites fetched"));
  }),

  getNotifications: asyncHandler(async (req: AuthRequest, res: Response) => {
    const notifications = await userService.getNotifications(req.user!.userId);
    res.status(200).json(new ApiResponse(200, notifications, "Notifications fetched"));
  }),

  markNotificationRead: asyncHandler(async (req: AuthRequest, res: Response) => {
    await userService.markNotificationRead(req.params.id as string, req.user!.userId);
    res.status(200).json(new ApiResponse(200, null, "Notification marked as read"));
  }),
};
