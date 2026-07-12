import { Router } from "express";
import { userController } from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";
import { upload } from "../utils/cloudinary";

const router = Router();

router.use(authenticate);
router.get("/me", userController.getMe);
router.put("/me", upload.single("profilePicture"), userController.updateMe);

// Favorites
router.post("/favorites/:eventId", userController.toggleFavorite);
router.get("/favorites", userController.getFavorites);

// Notifications
router.get("/notifications", userController.getNotifications);
router.put("/notifications/:id/read", userController.markNotificationRead);

export default router;
