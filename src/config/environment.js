export default {
  port: process.env.PORT || 3000,
  mongodb: {
    url:
      process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017/db",
  },
};
