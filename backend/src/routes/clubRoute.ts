import { Router } from "express";
import { clubController } from "../controllers/clubController";
import { authenticate, requireRole } from "../middlewares/authMiddleware";
import { upload } from "../utils/cloudinary";

const router = Router();

router.get("/", clubController.getAllClubs);
router.get("/my", authenticate, requireRole("CLUB_ADMIN"), clubController.getMyClub);
router.get("/my/analytics", authenticate, requireRole("CLUB_ADMIN"), clubController.getMyAnalytics);
router.get("/:id", clubController.getClubById);
router.put("/:id", authenticate, requireRole("CLUB_ADMIN"), upload.single("logo"), clubController.updateClub);

export default router;
