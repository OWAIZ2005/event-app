import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { z } from "zod";
import { ApiError } from "../utils/ApiError";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  department: z.string().optional(),
  yearOfStudy: z.number().int().min(1).max(5).optional(),
  role: z.enum(["STUDENT", "CLUB_ADMIN", "SUPER_ADMIN"]).optional().default("STUDENT"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

const generateTokens = (userId: string, role: string) => {
  const accessToken = jwt.sign({ userId, role }, JWT_ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId, role }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

export const authService = {
  async signup(data: z.infer<typeof signupSchema>) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ApiError(400, "User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        department: data.department,
        yearOfStudy: data.yearOfStudy,
        role: data.role,
      },
    });

    const { accessToken, refreshToken } = generateTokens(user.id, user.role);

    // Save refresh token to user
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    const { password, refreshToken: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, accessToken, refreshToken };
  },

  async login(data: z.infer<typeof loginSchema>) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const { accessToken, refreshToken } = generateTokens(user.id, user.role);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    const { password, refreshToken: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, accessToken, refreshToken };
  },

  async refreshToken(data: z.infer<typeof refreshTokenSchema>) {
    try {
      const decoded = jwt.verify(data.refreshToken, JWT_REFRESH_SECRET) as { userId: string, role: string };
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user || user.refreshToken !== data.refreshToken) {
        throw new ApiError(401, "Invalid refresh token");
      }

      const { accessToken, refreshToken } = generateTokens(user.id, user.role);

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });

      return { accessToken, refreshToken };
    } catch (error) {
      throw new ApiError(401, "Invalid or expired refresh token");
    }
  },
};
