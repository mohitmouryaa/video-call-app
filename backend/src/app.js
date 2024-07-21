import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import connectToSocket from "./controllers/socket.manager.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const startServer = async () => {
  const connectionDb = await mongoose.connect(process.env.MONGO_DB);
  console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("Server is running on port 8000...");
  });
};

startServer();
