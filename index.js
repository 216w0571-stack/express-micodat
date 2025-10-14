import 'dotenv/config';
import express from "express";
import hongosRouter from "./routes/hongos.js";
import imagenesRouter from "./routes/imagenes.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import cors from "cors";
import { connect } from "./db/index.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors('*'));

// Routes
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/hongos", hongosRouter);
app.use("/imagenes", imagenesRouter);

app.listen(3000, async () => {
  await connect();
  console.log("Server is running on port 3000");
});