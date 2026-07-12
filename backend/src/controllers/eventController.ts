import { Request, Response } from "express";
import { eventService, createEventSchema, updateEventSchema } from "../services/eventService";
import { AuthRequest } from "../middlewares/authMiddleware";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const eventController = {
  getEvents: asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await eventService.getEvents(page, limit, req.query);

    res.status(200).json(new ApiResponse(200, result, "Events fetched successfully"));
  }),

  getEventById: asyncHandler(async (req: Request, res: Response) => {
    const event = await eventService.getEventById(req.params.id as string);
    res.status(200).json(new ApiResponse(200, event, "Event fetched successfully"));
  }),

  createEvent: asyncHandler(async (req: AuthRequest, res: Response) => {
    const parsedData = createEventSchema.parse(req.body);
    const posterUrl = req.file?.path;
    const adminId = req.user!.userId;

    const event = await eventService.createEvent(parsedData, adminId, posterUrl);
    res.status(201).json(new ApiResponse(201, event, "Event created successfully"));
  }),

  updateEvent: asyncHandler(async (req: AuthRequest, res: Response) => {
    const parsedData = updateEventSchema.parse(req.body);
    const posterUrl = req.file?.path;
    const adminId = req.user!.userId;

    const event = await eventService.updateEvent(req.params.id as string, adminId, parsedData, posterUrl);
    res.status(200).json(new ApiResponse(200, event, "Event updated successfully"));
  }),

  deleteEvent: asyncHandler(async (req: AuthRequest, res: Response) => {
    const adminId = req.user!.userId;
    await eventService.deleteEvent(req.params.id as string, adminId);
    res.status(200).json(new ApiResponse(200, null, "Event deleted successfully"));
  }),

  registerClick: asyncHandler(async (req: Request, res: Response) => {
    await eventService.registerClick(req.params.id as string);
    res.status(200).json(new ApiResponse(200, null, "Click registered"));
  }),

  shareClick: asyncHandler(async (req: Request, res: Response) => {
    await eventService.shareClick(req.params.id as string);
    res.status(200).json(new ApiResponse(200, null, "Share registered"));
  }),
};
