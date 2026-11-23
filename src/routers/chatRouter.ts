import express from "express";
import GeminiService from "../services/gemini.service.ts";
import { error } from "node:console";

const router = express.Router();

router.post("/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required"});
    };

    try {
      const gemini = new GeminiService(
        process.env.GEMINI_API_KEY!,
        process.env.GEMINI_MODEL!
      );

      const response = await gemini.generateResponse(message);
      res.json({ reply: response });
    } catch(error:any) {
      console.error("Error generating response from Gemini:", error);
      res.status(500).json({ error: "Failed to get a response from the AI." });
    }
} );

export default router;