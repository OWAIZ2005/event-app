import prisma from "../config/prisma";
import { z } from "zod";
import { ApiError } from "../utils/ApiError";

export const updateClubSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  socialLinks: z.any().optional(), // Can be stricter if needed
});

export const clubService = {
  async getAllClubs() {
    return await prisma.club.findMany({
      include: {
        _count: {
          select: { events: true },
        },
      },
    });
  },

  async getClubById(id: string) {
    const club = await prisma.club.findUnique({
      where: { id },
      include: {
        events: {
          where: { isPublished: true },
        },
      },
    });

    if (!club) {
      throw new ApiError(404, "Club not found");
    }

    return club;
  },

  async updateClub(id: string, adminId: string, data: z.infer<typeof updateClubSchema>, fileUrl?: string) {
    const club = await prisma.club.findUnique({
      where: { id },
    });

    if (!club) {
      throw new ApiError(404, "Club not found");
    }

    if (club.adminId !== adminId) {
      throw new ApiError(403, "Not authorized to update this club");
    }

    return await prisma.club.update({
      where: { id },
      data: {
        ...data,
        ...(fileUrl && { logoUrl: fileUrl }),
      },
    });
  },

  async getMyClub(adminId: string) {
    const club = await prisma.club.findUnique({
      where: { adminId },
      include: {
        events: {
          orderBy: { date: 'desc' },
        },
      },
    });

    if (!club) {
      throw new ApiError(404, "Club not found for this admin");
    }

    return club;
  },

  async getMyAnalytics(adminId: string) {
    const club = await prisma.club.findUnique({ where: { adminId }, select: { id: true } });
    if (!club) throw new ApiError(404, "Club not found");

    const analytics = await prisma.eventAnalytics.aggregate({
      where: { event: { clubId: club.id } },
      _sum: {
        viewCount: true,
        favoriteCount: true,
        shareCount: true,
        registerClickCount: true,
      }
    });
    
    const eventsCount = await prisma.event.count({ where: { clubId: club.id } });

    return {
      eventsCount,
      totalViews: analytics._sum.viewCount || 0,
      totalFavorites: analytics._sum.favoriteCount || 0,
      totalShares: analytics._sum.shareCount || 0,
      totalRegisterClicks: analytics._sum.registerClickCount || 0,
    };
  }
};
