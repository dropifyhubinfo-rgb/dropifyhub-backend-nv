import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function rewriteText(text) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Rewrite this product description to be clean, simple, and optimized for eCommerce."
        },
        {
          role: "user",
          content: text
        }
      ]
    });

    return completion.choices[0].message.content;

  } catch (err) {
    console.error("AI Rewrite error:", err);
    return "AI rewrite failed.";
  }
}
