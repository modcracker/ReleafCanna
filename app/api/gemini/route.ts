import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize the official Google Gen AI client with appropriate headers
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const { messages, prompt } = await req.json();

    // Check if the API key is present
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY environment variable is missing on the server." },
        { status: 500 }
      );
    }

    // Build the query and context
    let formattedContents = "";
    if (messages && Array.isArray(messages)) {
      // Map chat history for context
      formattedContents = messages
        .map((m: any) => `${m.role === "user" ? "User" : "ReleafCanna Advisor"}: ${m.content}`)
        .join("\n");
      formattedContents += `\nUser: ${prompt || "Analyze and reply."}`;
    } else {
      formattedContents = prompt || "Hello";
    }

    const systemInstruction = `You are ReleafCanna AI, a professional, highly-informed, and compassionate medical cannabis educator and strain advisor. 
Your goal is to guide users through cannabinoids, terpenes, and symptoms with scientific and evidence-based information.
Key Guidance:
1. Always state clearly that this tool is for educational purposes only and is not official medical advice.
2. Structure your answers with clear headings, bullet points, and high readability.
3. Keep your tone professional, warm, scientific, and empirical.
4. When recommended, list suitable cannabinoids (e.g. THC for pain, CBD for anxiety, CBN for sleep) and terpenes (e.g. Myrcene for muscle relaxation, Limonene for mood elevation).
5. Suggest popular strain examples (like Blue Dream, ACDC, Granddaddy Purple, etc.) with brief explanations of why they suit the user's needs.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || "I was unable to formulate a response. Please try again.";

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error in Gemini API Route" },
      { status: 500 }
    );
  }
}
