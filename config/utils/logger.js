const { createLogger, format, transports } = require("winston");
const ipinfo = require("ipinfo");
const { combine, timestamp, printf } = format;

// Define log format to include IP and location
const logFormat = printf(({ level, message, timestamp, ip, location }) => {
  return `${timestamp} [${level}] IP: ${ip}, Location: ${location} - ${message}`;
});

// Create a Winston logger
const logger = createLogger({
  level: "info",
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app.log" }),
  ],
});

// Function to get IP and location and log the message
async function logWithIpAndLocation(req, message, level = "info") {
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Check if the IP is local (loopback address)
  if (clientIp === "::1" || clientIp === "127.0.0.1") {
    location = "Localhost";
  } else {
    try {
      const loc = await getGeolocation(clientIp);
      location = `${loc.city || "Unknown City"}, ${
        loc.region || "Unknown Region"
      }, ${loc.country || "Unknown Country"}`;
    } catch (error) {
      logger.error("Error getting geolocation", error);
    }
  }

  // Log with Winston, including IP and location
  logger.log({
    level,
    message,
    ip: clientIp,
    location,
  });
}

// Function to get geolocation from IP
function getGeolocation(ip) {
  return new Promise((resolve, reject) => {
    ipinfo(ip, (err, cLoc) => {
      if (err) reject(err);
      else resolve(cLoc);
    });
  });
}

module.exports = { logger, logWithIpAndLocation };
