import prisma from "../config/prisma";

export const notificationService = {
  /**
   * Send a notification to all users (e.g. for a new event)
   * This is a simple implementation that writes to the database.
   */
  async notifyAllUsers(title: string, message: string, type: string) {
    try {
      const users = await prisma.user.findMany({ select: { id: true } });
      const notifications = users.map(u => ({
        userId: u.id,
        title,
        message,
        type,
      }));

      await prisma.notification.createMany({
        data: notifications
      });
    } catch (error) {
      console.error("Error sending bulk notifications:", error);
    }
  },

  /**
   * Get notifications for a user
   */
  async getUserNotifications(userId: string) {
    return await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
  },

  /**
   * Mark notification as read
   */
  async markAsRead(id: string, userId: string) {
    return await prisma.notification.update({
      where: { id },
      data: { isRead: true }
    });
  }
};
