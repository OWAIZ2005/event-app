import { Router } from "express";
import { eventController } from "../controllers/eventController";
import { authenticate, requireRole } from "../middlewares/authMiddleware";
import { upload } from "../utils/cloudinary";

const router = Router();

// Public routes (Students)
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEventById);
router.post("/:id/click", eventController.registerClick);
router.post("/:id/share", eventController.shareClick);

// Protected Admin routes
router.use(authenticate);
router.use(requireRole("CLUB_ADMIN"));

router.post("/", upload.single("poster"), eventController.createEvent);
router.put("/:id", upload.single("poster"), eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

export default router;
