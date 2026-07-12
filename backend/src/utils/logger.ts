import winston from "winston";

const { combine, timestamp, printf, colorize } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), colorize(), myFormat),
  transports: [
    new winston.transports.Console(),
    // In production, we can add a File transport here
  ],
});
