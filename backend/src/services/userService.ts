import prisma from "../config/prisma";
import { ApiError } from "../utils/ApiError";

export const userService = {
  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profilePictureUrl: true,
        department: true,
        yearOfStudy: true,
        createdAt: true,
      },
    });

    if (!user) throw new ApiError(404, "User not found");
    return user;
  },

  async updateUser(id: string, data: { name?: string; department?: string; yearOfStudy?: number }, profilePictureUrl?: string) {
    const updateData: any = { ...data };
    if (profilePictureUrl) {
      updateData.profilePictureUrl = profilePictureUrl;
    }

    return await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profilePictureUrl: true,
        department: true,
        yearOfStudy: true,
        createdAt: true,
      }
    });
  },

  async toggleFavorite(userId: string, eventId: string) {
    const existing = await prisma.favorite.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });

    if (existing) {
      await prisma.favorite.delete({
        where: { userId_eventId: { userId, eventId } },
      });
      // Decrement counter
      await prisma.eventAnalytics.update({
        where: { eventId },
        data: { favoriteCount: { decrement: 1 } },
      }).catch(() => {});
      return { favorited: false };
    } else {
      await prisma.favorite.create({
        data: { userId, eventId },
      });
      // Increment counter
      await prisma.eventAnalytics.update({
        where: { eventId },
        data: { favoriteCount: { increment: 1 } },
      }).catch(() => {});
      return { favorited: true };
    }
  },

  async getFavorites(userId: string) {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        event: {
          include: { club: { select: { name: true, logoUrl: true } } },
        },
      },
    });
    return favorites.map(f => f.event);
  },

  async getNotifications(userId: string) {
    return await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  async markNotificationRead(id: string, userId: string) {
    const notif = await prisma.notification.findUnique({ where: { id } });
    if (!notif || notif.userId !== userId) throw new ApiError(404, "Notification not found");

    return await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }
};
