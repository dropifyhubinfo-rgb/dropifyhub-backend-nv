import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// =========================
// TEST ROUTE
// =========================
app.get("/", (req, res) => {
  res.send("DropifyHub Backend is running! 🚀");
});

// =========================
// SCRAPER ROUTE
// =========================
import { scrapeCJ } from "./scrapers/cj.js";

app.post("/scrape", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) return res.status(400).json({ error: "Missing URL" });

    // Only CJ now
    if (url.includes("cjdropshipping.com")) {
      const data = await scrapeCJ(url);
      return res.json(data);
    }

    return res.status(400).json({
      error: "Unsupported website (currently only CJ Dropshipping is supported)",
    });
  } catch (err) {
    console.error("Scrape Error:", err);
    res.status(500).json({ error: "Scraper failed" });
  }
});

// =========================
// AI REWRITE ROUTE
// =========================
import { rewriteText } from "./ai/rewrite.js";

app.post("/rewrite", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Missing text to rewrite" });
    }

    const rewritten = await rewriteText(text);
    res.json({ rewritten });

  } catch (err) {
    console.error("AI Rewrite Error:", err);
    res.status(500).json({ error: "AI rewrite failed" });
  }
});

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
