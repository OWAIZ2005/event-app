import { Request, Response } from "express";
import { clubService, updateClubSchema } from "../services/clubService";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { AuthRequest } from "../middlewares/authMiddleware";

export const clubController = {
  getAllClubs: asyncHandler(async (req: Request, res: Response) => {
    const clubs = await clubService.getAllClubs();
    res.status(200).json(new ApiResponse(200, clubs, "Clubs fetched successfully"));
  }),

  getClubById: asyncHandler(async (req: Request, res: Response) => {
    const club = await clubService.getClubById(req.params.id as string);
    res.status(200).json(new ApiResponse(200, club, "Club fetched successfully"));
  }),

  getMyClub: asyncHandler(async (req: AuthRequest, res: Response) => {
    const club = await clubService.getMyClub(req.user!.userId);
    res.status(200).json(new ApiResponse(200, club, "My club fetched successfully"));
  }),

  getMyAnalytics: asyncHandler(async (req: AuthRequest, res: Response) => {
    const analytics = await clubService.getMyAnalytics(req.user!.userId);
    res.status(200).json(new ApiResponse(200, analytics, "Analytics fetched successfully"));
  }),

  updateClub: asyncHandler(async (req: AuthRequest, res: Response) => {
    const parsedData = updateClubSchema.parse(req.body);
    const fileUrl = req.file?.path; // Multer-storage-cloudinary populates this with the Cloudinary URL

    const updatedClub = await clubService.updateClub(req.params.id as string, req.user!.userId, parsedData, fileUrl);
    res.status(200).json(new ApiResponse(200, updatedClub, "Club updated successfully"));
  }),
};
