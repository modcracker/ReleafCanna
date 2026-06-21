import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Handle lazy initialization and check for API key
const getGoogleGenAI = (): GoogleGenAI => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required but missing. Please configure it in your Secrets/Environment panel.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

export async function POST(req: NextRequest) {
  try {
    const { prompt, context } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const ai = getGoogleGenAI();

    // Constructing a robust system instruction that focuses strictly on high-quality botanical science, medical studies, terpene dynamics, and dosing/consumption safety.
    const systemInstruction = `You are the chief educational botanist and wellness scientist for ReleafCanna.com, the world's leading educational directory for cannabis therapeutic relief ("releaf"). Your goal is to provide deep, scientifically grounded, and compassionate educational guidance on how cannabis, cannabinoids, and terpenes offer organic relief.

Rules for your responses:
1. Provide extremely detailed, high-quality botanical science. Reference cannabinoids (THC, CBD, CBG, CBN, THCV, CBC, etc.), terpenoids (Myrcene, Limonene, Caryophyllene, Linalool, Pinene, Humulene, Terpinolene), and the Endocannabinoid System (CB1 & CB2 receptors).
2. Clearly explain the physiological mechanism of action (e.g., "how Myrcene acts as an agonist or how Caryophyllene interacts directly with CB2 receptors to minimize inflammation").
3. Structure your responses beautifully using clear headings (H3), bold bullet points, and highly readable, informative blocks.
4. Add dosage tips and safe consumption guidance, warning the user about starting low and going slow ("Titration").
5. Include a brief medical disclaimer: "ReleafCanna provides educational resources based on clinical research. We are not medical practitioners; please consult with a clinical cannabis specialist before starting any therapeutic regimen."
6. Tone: Highly prestigious, intellectual, clinical yet warm, and deeply reassuring. Avoid standard 'AI-slop' phrases. Speak directly to the science of natural herbal relief.`;

    const userPrompt = context 
      ? `User question about cannabis relief: "${prompt}"\nContext or category: ${context}`
      : `User question about cannabis relief: "${prompt}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    if (!response.text) {
      throw new Error("Empty response received from the Gemini AI engine.");
    }

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API server-side error:", error);
    return NextResponse.json(
      { error: error?.message || "An error occurred during content generation." },
      { status: 500 }
    );
  }
}
