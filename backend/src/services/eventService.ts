import prisma from "../config/prisma";
import { z } from "zod";
import { ApiError } from "../utils/ApiError";
import { notificationService } from "./notificationService";

export const createEventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(2),
  date: z.string().datetime(), // ISO string
  endTime: z.string().datetime().optional(),
  venue: z.string().min(2),
  registrationDeadline: z.string().datetime().optional(),
  registrationUrl: z.string().url().optional(),
  contactPerson: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  capacity: z.number().int().optional(),
});

export const updateEventSchema = createEventSchema.partial();

export const eventService = {
  async getEvents(page: number, limit: number, query: any) {
    const skip = (page - 1) * limit;

    const where: any = { isPublished: true };

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: "insensitive" } },
        { description: { contains: query.search, mode: "insensitive" } },
      ];
    }
    if (query.category) where.category = query.category;
    if (query.clubId) where.clubId = query.clubId;
    if (query.upcoming) {
      where.date = { gte: new Date() };
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: query.sortByDate === "desc" ? "desc" : "asc" },
        include: { club: { select: { name: true, logoUrl: true } } },
      }),
      prisma.event.count({ where }),
    ]);

    return {
      events,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getEventById(id: string) {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        club: { select: { id: true, name: true, logoUrl: true, socialLinks: true } },
        analytics: true,
      },
    });

    if (!event) throw new ApiError(404, "Event not found");

    // Increment view count asynchronously
    prisma.eventAnalytics.upsert({
      where: { eventId: id },
      update: { viewCount: { increment: 1 } },
      create: { eventId: id, viewCount: 1 },
    }).catch(console.error);

    return event;
  },

  async createEvent(data: z.infer<typeof createEventSchema>, adminId: string, posterUrl?: string) {
    const club = await prisma.club.findUnique({ where: { adminId } });
    if (!club) throw new ApiError(404, "Club not found for this admin");

    const event = await prisma.event.create({
      data: {
        ...data,
        clubId: club.id,
        posterUrl,
        analytics: { create: {} }, // Initialize analytics
      },
    });

    if (event.isPublished) {
      notificationService.notifyAllUsers(
        "New Event: " + event.title,
        "A new event has been published by " + club.name,
        "NEW_EVENT"
      );
    }

    return event;
  },

  async updateEvent(id: string, adminId: string, data: z.infer<typeof updateEventSchema>, posterUrl?: string) {
    const event = await prisma.event.findUnique({ where: { id }, include: { club: true } });
    
    if (!event) throw new ApiError(404, "Event not found");
    if (event.club.adminId !== adminId) throw new ApiError(403, "Not authorized to update this event");

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        ...data,
        ...(posterUrl && { posterUrl }),
      },
    });

    if (data.isPublished && !event.isPublished) {
      notificationService.notifyAllUsers(
        "Event Published: " + updatedEvent.title,
        updatedEvent.title + " is now open for registration!",
        "NEW_EVENT"
      );
    } else if (data.isPublished) {
       notificationService.notifyAllUsers(
        "Event Updated: " + updatedEvent.title,
        "Details for " + updatedEvent.title + " have been updated.",
        "EVENT_UPDATED"
      );
    }

    return updatedEvent;
  },

  async deleteEvent(id: string, adminId: string) {
    const event = await prisma.event.findUnique({ where: { id }, include: { club: true } });
    
    if (!event) throw new ApiError(404, "Event not found");
    if (event.club.adminId !== adminId) throw new ApiError(403, "Not authorized to delete this event");

    return await prisma.event.delete({ where: { id } });
  },

  async registerClick(id: string) {
    await prisma.eventAnalytics.upsert({
      where: { eventId: id },
      update: { registerClickCount: { increment: 1 } },
      create: { eventId: id, registerClickCount: 1 },
    });
    return { success: true };
  },

  async shareClick(id: string) {
    await prisma.eventAnalytics.upsert({
      where: { eventId: id },
      update: { shareCount: { increment: 1 } },
      create: { eventId: id, shareCount: 1 },
    });
    return { success: true };
  }
};
