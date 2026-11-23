import express from "express";
import cors from "cors";
import chatRouter from './routers/chatRouter.ts'

const app = express();
const PORT:number = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', chatRouter);

app.get("/", (_req, res) => {
  res.send("Hello Bachir, Agentic App Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

