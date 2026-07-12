import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest, JwtPayload } from "../types";
import { ApiError } from "../utils/ApiError";

export { AuthenticatedRequest as AuthRequest } from "../types";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Unauthorized. No token provided."));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return next(new ApiError(401, "Unauthorized. Invalid or expired token."));
  }
};

export const requireRole = (role: string | string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized."));
    }

    const rolesArray = Array.isArray(role) ? role : [role];

    if (!rolesArray.includes(req.user.role)) {
      return next(new ApiError(403, "Forbidden. Insufficient permissions."));
    }

    next();
  };
};
