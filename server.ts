import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI client
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", aiConfigured: !!ai, timestamp: new Date().toISOString() });
});

// Endpoint: AI Live Pitch & Teleprompter Cue Generator
app.post("/api/director/ai-pitch", async (req, res) => {
  try {
    const { product, tone = "hype", dropStage = "flash_active", audienceMood = "curious" } = req.body;

    if (!ai) {
      // Fallback deterministic smart prompts if no API key is set
      const fallbackPitches = {
        hype: `🚨 CHAT LOOK AT THIS! We have ONLY ${product?.stock || 18} units left of the ${product?.title || "Signature Edition"}! If you tap the yellow bag on your screen right now, you lock in the $${product?.salePrice || "79"} flash drop price! Do NOT wait, once this countdown hits zero, it goes back to retail!`,
        informative: `Let's break down why the ${product?.title || "Curated Piece"} is our top-rated pick today. Crafted with premium finishes and backed by a 2-year warranty, notice how the ergonomic profile fits naturally. For anyone asking in chat about sizing—it runs true to size!`,
        urgency: `FINAL CALL ON THE ${product?.title?.toUpperCase() || "FEATURED DROP"}! Over 45 orders just crossed our live checkout queue in the last 60 seconds! Tap the spotlight pill at the bottom of your screen now before inventory turns red!`,
        objection_buster: `I see chat asking: "Is this water resistant?" YES! IPX7 rated. "Can it ship today?" Orders placed during this live broadcast get same-day priority dispatch with complimentary VIP packaging!`,
      };

      const toneKey = (tone as keyof typeof fallbackPitches) || "hype";
      return res.json({
        cueLines: [
          fallbackPitches[toneKey],
          `💬 "Show the texture up close!" Switching to Camera 2 Macro feed now!`,
          `🔥 Live exclusive bonus: Enter code DROP20 for an extra $20 off right now!`,
        ],
        talkingPoints: [
          `Highlight key material: ${product?.highlights?.[0] || "Aircraft-grade durability"}`,
          `Emphasize limited batch status (${product?.stock || 15} units left)`,
          `Address chat size/fit questions directly to boost conversion rate`,
        ],
        urgencyScore: 88,
        recommendedAction: "Trigger on-screen Flash Countdown and switch to Cam 2 Close-up",
      });
    }

    const prompt = `You are the lead AI Co-Director & Teleprompter Assistant for a live interactive shopping broadcast (like TikTok Shop, NTWRK, Whatnot, or Taobao Live).
Generate dynamic teleprompter lines, sales hooks, and host talking points for the live host.

Product Details:
- Title: ${product?.title || "Signature Drop Item"}
- Regular Price: $${product?.originalPrice || "120"} | Flash Price: $${product?.salePrice || "69"}
- Stock Remaining: ${product?.stock || "14"} units
- Features: ${JSON.stringify(product?.highlights || ["Premium build", "Fast delivery", "Exclusive colorway"])}
- Current Stream Context: Tone=${tone}, Drop Stage=${dropStage}, Audience Mood=${audienceMood}

Provide a structured JSON response matching this exact schema:
{
  "cueLines": [
    "Punchy teleprompter sentence 1 (direct to camera hook)",
    "Punchy teleprompter sentence 2 (product value & proof)",
    "Punchy teleprompter sentence 3 (call-to-action to tap the screen bag & buy)"
  ],
  "talkingPoints": [
    "Key spec or sensory detail to describe (feel, weight, sound)",
    "Objection buster (return policy, sizing, authenticity)",
    "Live exclusive perk reminder"
  ],
  "urgencyScore": 92,
  "recommendedAction": "Actionable director advice (e.g. Switch to Cam 2 Macro, Trigger Confetti Alert, Announce Mystery Voucher)"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("AI Pitch Generation Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI pitch" });
  }
});

// Endpoint: AI Live Chat Triage & Sentiment Analysis
app.post("/api/director/chat-triage", async (req, res) => {
  try {
    const { recentComments, currentProduct } = req.body;

    if (!ai) {
      return res.json({
        summary: "Audience is heavily asking about sizing, compatibility, and remaining flash discount duration.",
        topIntent: "high_buying_intent",
        highPriorityQuestions: [
          { user: "alex_m", question: "Does this come in the matte obsidian colorway?", answerCue: "Matte Obsidian is live right now—tap option 2 in the screen tray!" },
          { user: "jess_k", question: "How long is the flash price active?", answerCue: "The 30% voucher expires when our 3-minute timer on stream zeroes out!" }
        ],
        sentimentScore: 94,
        suggestedHostCallout: "Shout out @alex_m and @jess_k for asking about colors and flash expiry!"
      });
    }

    const commentsSummary = (recentComments || [])
      .slice(-12)
      .map((c: any) => `${c.user}: ${c.text}`)
      .join("\n");

    const prompt = `You are an AI Live Stream Shopping Director analyzing live audience chat comments during a shopping broadcast.
Current Featured Item: ${currentProduct?.title || "Featured Product"} ($${currentProduct?.salePrice || 79})

Recent Chat Feed:
${commentsSummary || "Chat asking: is shipping free? how fast does it arrive? show the back side!"}

Extract buying intent, top questions that the host MUST address immediately on-air to close sales, and sentiment.

Respond in JSON with this structure:
{
  "summary": "1-sentence executive summary of audience sentiment and main interest",
  "topIntent": "high_buying_intent" | "price_sensitive" | "curious_exploring" | "skeptical",
  "highPriorityQuestions": [
    { "user": "username", "question": "the core question", "answerCue": "concise 10-word answer the host can speak out loud" }
  ],
  "sentimentScore": 88,
  "suggestedHostCallout": "Direct host instruction on air"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("Chat Triage Error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze chat stream" });
  }
});

// Endpoint: AI Flash Sale Strategy Copilot
app.post("/api/director/strategy-copilot", async (req, res) => {
  try {
    const { streamStats, productCatalog } = req.body;

    if (!ai) {
      return res.json({
        recommendedDropTime: "Drop in 45s",
        strategyTitle: "Urgency Surge: Flash 50-Unit Cap",
        recommendation: "Viewer velocity is peaking (+180 CCV in 2 mins). Release the $25 off coupon code 'FLASH25' now with a 2:00 timer to trigger impulse cart checkouts.",
        suggestedBanner: "⚡ LIGHTNING SURGE: $25 OFF NEXT 50 ORDERS ONLY",
        actionItem: "Trigger sound effect 'Cash Register' and push Overlay Banner 2"
      });
    }

    const prompt = `You are a world-class Live Commerce Executive Director optimizing Gross Merchandise Value (GMV) and Conversion Rate (CVR).
Stream Stats:
- Concurrent Viewers: ${streamStats?.ccv || 4200}
- Current GMV: $${streamStats?.gmv || 14800}
- Cart Add Velocity: ${streamStats?.cartVelocity || "18 adds/min"}
- Active Conversion Rate: ${streamStats?.cvr || "4.8%"}

Analyze the live event pacing and give one ultra-high-converting tactic for the director to execute in the next 60 seconds.

Return JSON:
{
  "recommendedDropTime": "string",
  "strategyTitle": "string",
  "recommendation": "string",
  "suggestedBanner": "string",
  "actionItem": "string"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("Strategy Copilot Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate strategy" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Live Shopping Director Suite running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
