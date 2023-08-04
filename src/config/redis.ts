import Redis from "ioredis";

const redisConnection = new Redis({
  host: "localhost",
  port: 6379,
});

redisConnection.on("connection", () => {
  console.error("Redis connection successfull");
});

redisConnection.on("error", (error) => {
  console.error("Redis connection error:", error);
});

module.exports = { redisConnection };
