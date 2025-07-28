import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import axios from "axios";

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
You're a music curator AI. Given a user's vibe and preferences, return exactly 3 unique songs that match.

Always respond in this format:
1. Song Name - Artist Name
2. Song Name - Artist Name
3. Song Name - Artist Name

Mood/Vibe: ${vibe}
Preferred Artists: ${artist || "None"}
Energy Level (0 to 1): ${energy}
Creativity Level (0-100): ${creativity}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: creativity / 100,
      max_tokens: 250,
    });

    const aiResponse = completion.choices[0].message.content;
    res.json({ songs: aiResponse });
  } catch (err) {
    console.error("OpenAI Error:", err);
    res.status(500).json({ error: "Failed to generate songs" });
  }
});

app.get("/api/youtube", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const ytRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q,
          key: process.env.YOUTUBE_API_KEY,
          maxResults: 1,
          type: "video",
        },
      }
    );

    const video = ytRes.data.items[0];
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    const thumbnail = video.snippet.thumbnails.high.url;

    res.json({
      title,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail,
      videoId,
    });
  } catch (err) {
    console.error("YouTube API Error:", err.response?.data || err.message);
    res.status(500).json({ error: "YouTube search failed" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
