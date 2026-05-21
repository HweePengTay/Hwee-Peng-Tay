import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Ensure Gemini Client is initialized safely
const apiKey = process.env.GEMINI_API_KEY;

// Create server
async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Initialize Gemini client lazily
  let ai: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!ai) {
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is missing.");
      }
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return ai;
  }

  // AI-Powered Endpoints

  // 1. Generate active vocabulary words based on Grade and Theme
  app.post("/api/spelling/generate", async (req, res) => {
    try {
      const { grade, theme, count } = req.body;
      const client = getGeminiClient();

      const prompt = `You are a helpful preschool and primary school teacher. Generate exactly ${count || 8} spelling words suited for children in "${grade || "Grade 2"}".
The theme for this spelling list is: "${theme || "General Everyday Words"}".
For each word, provide:
1. The word itself (all lowercase, correctly spelled).
2. A simplified phonetics visual helper for kids (like rock-it, ba-nan-a).
3. A kid-friendly, simple and cute definition.
4. An engaging example sentence that uses the word naturally.
5. A playful educational clue to help them guess the word.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              words: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING, description: "Spelling word, lowercase, perfectly written" },
                    phonetics: { type: Type.STRING, description: "Child-friendly phonetics separator, e.g. el-e-phant" },
                    definition: { type: Type.STRING, description: "Extremely simple, warm and cheerful definition" },
                    sentence: { type: Type.STRING, description: "Cheerful sentence utilizing the word" },
                    clue: { type: Type.STRING, description: "Playful educational clue to help guess" },
                  },
                  required: ["word", "phonetics", "definition", "sentence", "clue"],
                },
              },
            },
            required: ["words"],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from AI model.");
      }

      const result = JSON.parse(responseText.trim());
      res.json({ success: true, list: result.words });
    } catch (error: any) {
      console.error("Error generating spelling list:", error);
      res.status(500).json({ success: false, error: error.message || "Failed to generate words list." });
    }
  });

  // 2. Enrich custom parent spelling homework word list
  app.post("/api/spelling/enrich", async (req, res) => {
    try {
      const { words, grade } = req.body;
      if (!words || !Array.isArray(words) || words.length === 0) {
        return res.status(400).json({ success: false, error: "Please provide a valid list of spelling words." });
      }

      const client = getGeminiClient();
      const wordString = words.join(", ");

      const prompt = `You are a warm elementary school educator.
Input spelling words: [${wordString}].
For each spelling word, generate spelling helper contexts appropriate for "${grade || "Grade 1 or 2"}":
1. Word: Exact input word in lowercase.
2. Phonetics: Easy pronunciation cues (e.g., gi-raffe).
3. Definition: A simple definition readable by a child.
4. Sentence: An amazing playful sentence illustrating the word's use.
5. Clue: A riddle or educational clue so they can guess it.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              words: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING, description: "The spelling word matching one from input, lowercase" },
                    phonetics: { type: Type.STRING, description: "Simple phonetic helper, e.g., coo-kie" },
                    definition: { type: Type.STRING, description: "Kind definition" },
                    sentence: { type: Type.STRING, description: "Sentence utilizing the word" },
                    clue: { type: Type.STRING, description: "Playful riddle or hint" },
                  },
                  required: ["word", "phonetics", "definition", "sentence", "clue"],
                },
              },
            },
            required: ["words"],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response description.");
      }

      const result = JSON.parse(responseText.trim());
      res.json({ success: true, list: result.words });
    } catch (error: any) {
      console.error("Error enriching word spelling list:", error);
      res.status(500).json({ success: false, error: error.message || "Failed to enrich dictionary attributes." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Bind to 0.0.0.0:3000
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SpellBuddy fullstack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
