import express, { Express } from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import databaseConnection from "./config/database";
dotenv.config();

import { env } from "./config";
import userRoutes from "./user";
import taskRoutes from "./task";
import authRoutes from "./auth";


databaseConnection();
const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); //used to serve static files

const server = http.createServer(app);
const io =  new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  
   socket.on("login",(username)=>{
    console.log(username)
    socket.join(username)
   })

   socket.on("assignTask",({message, assignedBy, assignedTo})=>{
    console.log(message)
    console.log(assignedTo)
    io.to(assignedTo).emit("getTask", message)
   })
  });

app.use("/api", userRoutes());
app.use("/api", authRoutes());
app.use("/api", taskRoutes());



server.listen(port, () => {
  console.log(` Server is running at http://localhost:${env.PORT}`);
});
