import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: new URL("./.env", import.meta.url) });

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Check OpenRouter API key
if (!process.env.OPENROUTER_API_KEY) {
  console.error("OpenRouter API key is missing. Check server/.env");
  process.exit(1);
}

// Test route
app.get("/", (req, res) => {
  res.send("MediCare Backend is running!");
});

// AI Healthcare Chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Please enter a message.",
      });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            {
              role: "system",
              content: `
                You are MediCare AI, a friendly healthcare information assistant.

                Provide general health education and wellness information.
                Explain common health terms in simple language.
                Help users understand the MediCare application.

                Never diagnose diseases or prescribe medicines.
                For serious or emergency symptoms, advise users
                to seek immediate medical attention.

                Always be polite and clear.
              `,
            },
            {
              role: "user",
              content: message.trim(),
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter API error:", data);
      return res.status(response.status).json({
        error: data.error?.message || "AI service request failed.",
      });
    }

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      throw new Error("No response received from AI.");
    }

    res.json({ reply });

  } catch (error) {
    console.error("Chatbot error:", error);

    res.status(500).json({
      error: "Unable to get a response. Please try again.",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`MediCare backend running at http://localhost:${PORT}`);
});