import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/generate", async (req, res) => {
  const { vibe, energy, creativity, artist } = req.body;

  try {
    const prompt = `
You're a music curator AI. Given a user's vibe and preferences, return 5 songs that match. Respond in this format:
1. Song - Artist
2. Song - Artist
...

Mood: ${vibe}
Preferred Artists: ${artist || "None"}
Energy Level: ${energy}
Creativity Level: ${creativity}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: creativity / 100,
      max_tokens: 200,
    });

    const aiResponse = completion.choices[0].message.content;
    res.json({ songs: aiResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate vibe" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
