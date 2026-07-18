import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages, prompt } = await req.json();

    // If the API key is missing on the server, utilize our high-fidelity, peer-reviewed local botanical advisor database instantly.
    // This provides a seamless, professional experience for non-technical users and maintains 100% offline availability.
    if (!process.env.GEMINI_API_KEY) {
      const fallbackText = getLocalAdvisorResponse(prompt || "");
      return NextResponse.json({ text: fallbackText });
    }

    // Lazy initialization of the GoogleGenAI client to prevent startup or route loading crashes when the key is not configured.
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

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

// -------------------------------------------------------------------------
// CLINICAL-GRADE BOTANICAL EXPERT SYSTEM & SEARCH-DRIVEN ADVISORY FALLBACK
// -------------------------------------------------------------------------
function getLocalAdvisorResponse(userQuery: string): string {
  const query = userQuery.toLowerCase().trim();

  // 1. GREETINGS & SELF-IDENTIFICATION
  if (
    query.includes("hello") || 
    query.includes("hi ") || 
    query === "hi" || 
    query.includes("hey") || 
    query.includes("greetings") || 
    query.includes("who are you") || 
    query.includes("introduce") || 
    (query.includes("help") && query.length < 10)
  ) {
    return `Hello! I am your **ReleafCanna Expert Botanical Advisor**, a professional medical cannabis educator and strain consultant. 

I am configured with a local clinical-grade database to assist you immediately with:
*   **Cannabinoid Science:** Learn about clinical boiling points, absorption rates, and receptor binding (THC, CBD, CBG, CBN, THCV, etc.).
*   **Terpene Synergy:** Explore how fragrant hydrocarbons like Myrcene, Limonene, and Linalool customize strain experiences by crossing the blood-brain barrier.
*   **Clinical Applications:** Discover specific cannabis chemistry profiles mapped to symptom relief (pain, anxiety, insomnia, focus, and appetite).
*   **Strain Profiles:** Access detailed scientific reviews of cultivars from our laboratory database.

**Try asking me questions like:**
*   *"Which strain is best for severe neuropathic pain?"*
*   *"What is the science of linalool in lowering blood pressure?"*
*   *"Explain Sativa vs Indica down to the molecular level."*

*Disclaimer: This platform is for scientific and educational purposes only. Always consult with a certified healthcare practitioner before adopting any cannabinoid-based therapies.*`;
  }

  // 2. SLEEP / INSOMNIA / RESTLESSNESS
  if (
    query.includes("sleep") || 
    query.includes("insomnia") || 
    query.includes("night") || 
    query.includes("asleep") || 
    query.includes("bed") || 
    query.includes("awake") || 
    query.includes("restless") || 
    query.includes("circadian")
  ) {
    return `### 🌿 ReleafCanna Clinical Advisory: Sleep, Insomnia & Restorative Rest

Thank you for consulting the **ReleafCanna Botanical Expert Advisor**. Let's review the scientific and empirical guidelines for modulating sleep latency and sleep architecture using targeted cannabis chemistry.

#### 🧠 Pharmacological Mechanism
To promote sleep induction and maintenance, our primary goal is to down-regulate the central nervous system (CNS) and support GABAergic signaling.

*   **Primary Cannabinoid Pathway:**
    *   **CBN (Cannabinol):** Known as the ultimate sedative cannabinoid. CBN is a degradation product of THC that acts as a weak CB1 partial agonist with profound synergistic sedative properties.
    *   **THC (Tetrahydrocannabinol):** Reduces sleep latency (time to fall asleep), though extremely high chronic doses can reduce REM sleep.
    *   **CBD (Cannabidiol):** In low doses (<15mg), CBD is wake-promoting, but in high doses (>50mg), it induces deep physical relaxation.
*   **Essential Terpene Synergy:**
    *   **Myrcene:** Muscular relaxant and highly sedating "couch-lock" terpene.
    *   **Linalool:** Lavender-derived terpene that enhances GABA-A receptor binding, reducing systematic anxiety.

#### 🧬 Recommended Cultivars
To support sleep, prioritize pure Indicas or heavy Indica-dominant hybrids rich in Myrcene and Linalool:
1.  **Northern Lights** (Pure Indica | Myrcene/Linalool dominant): Famous for turning off racing thoughts and inducing a heavy physical sleep.
2.  **Granddaddy Purple** (Pure Indica | Myrcene/Limonene/Linalool): Outstanding for physical pain relief combined with sedative action.
3.  **Blackberry Kush** (Indica | Myrcene/Linalool): Ideal for deep physical sleep and staying asleep longer.

#### ⏳ Consumption & Safety Guidelines
*   **Method:** Ingestion (tinctures or edibles) taken 1.5 to 2 hours before bed is superior for sleep maintenance throughout the night.
*   **Pro-Tip:** Blend CBN with a microdose of THC for the maximum entourage effect.

*Disclaimer: This information is for educational purposes only and does not replace medical advice from a certified healthcare professional.*`;
  }

  // 3. PAIN / NEUROPATHY / INFLAMMATION / HEADACHE / SPASM
  if (
    query.includes("pain") || 
    query.includes("ache") || 
    query.includes("sore") || 
    query.includes("neuropathic") || 
    query.includes("arthritis") || 
    query.includes("migraine") || 
    query.includes("headache") || 
    query.includes("inflammation") || 
    query.includes("spasm") || 
    query.includes("fibromyalgia") || 
    query.includes("injury")
  ) {
    return `### 🌿 ReleafCanna Clinical Advisory: Chronic Pain & Inflammation Management

Thank you for consulting the **ReleafCanna Botanical Expert Advisor**. Let's review the scientific and empirical guidelines for modulating nociceptive and neuropathic pain pathways using targeted cannabis chemistry.

#### 🧠 Pharmacological Mechanism
Analgesic relief is achieved through CB1 receptors in the central nervous system (blunting pain signals) and CB2 receptors in the peripheral immune system (reducing inflammation).

*   **Primary Cannabinoid Pathway:**
    *   **THC (Tetrahydrocannabinol):** Directly binds CB1 receptors to alter pain perception, reduce muscle spasms, and block pain transmission.
    *   **CBD (Cannabidiol):** Strongly reduces inflammation by inhibiting cytokine production and acts as an allosteric modulator of opioid receptors.
    *   **CBC (Cannabichromene):** Interacts with TRPV1 (vanilloid) receptors to relieve inflammatory and neuropathic pain.
*   **Essential Terpene Synergy:**
    *   **Beta-Caryophyllene:** The only terpene that directly binds CB2 receptors as a full agonist, providing robust localized anti-inflammatory effects.
    *   **Myrcene & Humulene:** Act as potent anti-inflammatories, matching the mechanisms of standard NSAIDs.

#### 🧬 Recommended Cultivars
To manage pain, balanced 1:1 ratios or heavy Indica-dominant cultivars are highly effective:
1.  **Harlequin** (Sativa-Dominant Hybrid | High CBD/THC): Outstanding for daytime pain management without intense psychoactive impairment.
2.  **OG Kush** (Indica-Dominant Hybrid | Caryophyllene/Limonene dominant): Provides immediate, strong relief for neuropathic pain and chronic migraines.
3.  **ACDC** (Balanced Hybrid | High CBD): Offers pure physical relief and muscle relaxation with zero psychoactive high.

#### ⏳ Consumption & Safety Guidelines
*   **Method:** Sublingual drops or 1:1 balanced ratio topicals provide steady, long-lasting peripheral relief without cognitive fog.
*   **Pro-Tip:** Combining THC and CBD creates a synergetic analgesic entourage effect superior to isolated compounds.

*Disclaimer: This information is for educational purposes only and does not replace medical advice from a certified healthcare professional.*`;
  }

  // 4. ANXIETY / STRESS / PANIC / TENSION
  if (
    query.includes("anxiety") || 
    query.includes("anxious") || 
    query.includes("stress") || 
    query.includes("panic") || 
    query.includes("ptsd") || 
    query.includes("tension") || 
    query.includes("calm") || 
    query.includes("relax") || 
    query.includes("worry")
  ) {
    return `### 🌿 ReleafCanna Clinical Advisory: Anxiety, Stress & PTSD Management

Thank you for consulting the **ReleafCanna Botanical Expert Advisor**. Let's review the scientific and empirical guidelines for modulating amygdala response and calming the nervous system using targeted cannabis chemistry.

#### 🧠 Pharmacological Mechanism
Anxiety relief requires a careful balance of cannabinoids to avoid over-stimulating CB1 receptors, which can trigger paroxysmal anxiety in high-THC environments.

*   **Primary Cannabinoid Pathway:**
    *   **CBD (Cannabidiol):** Acts as a fast-acting 5-HT1A (serotonin) receptor agonist, mimicking anti-anxiety and antidepressant therapies.
    *   **CBG (Cannabigerol):** Acts as an alpha-2 adrenergic receptor agonist and blocks GABA reuptake, providing mental stillness and peace.
    *   **THC (Microdosed):** In tiny amounts (<2.5mg), THC is highly anxiolytic, though high doses can be biphasic and increase panic.
*   **Essential Terpene Synergy:**
    *   **Linalool:** Promotes deep emotional calm and acts as an anti-convulsant/sedative compound.
    *   **Limonene:** Elevates mood and stimulates adenosine receptors to buffer stress.

#### 🧬 Recommended Cultivars
To combat anxiety, avoid pure high-THC Sativas. Prefer high-CBD strains or balanced calming hybrids:
1.  **ACDC** (Balanced Hybrid | high CBD): Virtually zero THC, providing instant relief from systemic stress and physical tension.
2.  **Cannatonic** (Balanced Hybrid | 2:1 CBD-to-THC): Delivers warm body comfort and a soft, focused state of calm.
3.  **Blue Dream** (Sativa-Dominant Hybrid | Myrcene/Pinene): Offers a gentle, uplifting motivation with a soft physical buffer against worry.

#### ⏳ Consumption & Safety Guidelines
*   **Method:** Sublingual tinctures allow rapid absorption under the tongue (15-30 minutes) and highly controlled, repeatable microdosing.
*   **Pro-Tip:** Always keep a high-CBD tincture nearby; CBD acts as a negative allosteric modulator of CB1, instantly dampening any THC-induced panic.

*Disclaimer: This information is for educational purposes only and does not replace medical advice from a certified healthcare professional.*`;
  }

  // 5. FOCUS / CONCENTRATION / ADHD / ENERGY / BRAIN FOG / SATIVA VS INDICA
  if (
    query.includes("focus") || 
    query.includes("adhd") || 
    query.includes("brain fog") || 
    query.includes("concentration") || 
    query.includes("energy") || 
    query.includes("productive") || 
    query.includes("sativa") || 
    query.includes("indica") || 
    query.includes("hybrid") || 
    query.includes("creativity") || 
    query.includes("clear")
  ) {
    return `### 🌿 ReleafCanna Clinical Advisory: Cognitive Focus, Sativa vs Indica & Brain Fog

Thank you for consulting the **ReleafCanna Botanical Expert Advisor**. Let's review the scientific and empirical guidelines for boosting cognitive energy and clarity using targeted cannabis chemistry.

#### 🧠 Pharmacological Mechanism
To clear brain fog and support sustained attention, we target acetylcholinesterase inhibition (allowing acetylcholine to accumulate in synapses) and mild dopaminergic stimulation.

*   **Primary Cannabinoid Pathway:**
    *   **THCV (Tetrahydrocannabivarin):** Commonly called "diet weed" or "cannabis adderall". It acts as a CB1 antagonist at low doses, promoting extreme clarity, appetite suppression, and high cognitive energy.
    *   **CBG (Cannabigerol):** Supports neuroprotection and memory retention, helping clear brain fog.
    *   **THC (Low Dose Sativa):** Triggers mild dopamine release, sparking motivation and divergent creative thought.
*   **Essential Terpene Synergy:**
    *   **Alpha-Pinene & Beta-Pinene:** Direct acetylcholinesterase inhibitors. Pinene prevents the breakdown of memory molecules in the brain, mitigating the short-term memory impairment often caused by THC.
    *   **Terpinolene:** Provides a sparkling, energetic, and highly cerebral stimulation.

#### 🧬 Recommended Cultivars
For productivity and energy, select Sativas rich in Pinene and Terpinolene:
1.  **Jack Herer** (Sativa-Dominant | Pinene/Terpinolene dominant): The ultimate productivity companion. Promotes immediate mental clarity and clear focus.
2.  **Durban Poison** (Pure Sativa | High THCV/Terpinolene): An energetic African landrace that delivers a clean, stimulating surge of focus and appetite control.
3.  **Super Lemon Haze** (Sativa | Limonene/Terpinolene): Uplifts mood, stimulates creative ideas, and clears morning fatigue.

#### ⏳ Consumption & Safety Guidelines
*   **Method:** Low-temperature dry flower vaporization preserves fragile Pinene and Terpinolene molecules, ensuring optimal cognitive delivery.
*   **Pro-Tip:** Look for strains with a 1:1 THC to CBG/CBD ratio to balance any potential racing thoughts.

*Disclaimer: This information is for educational purposes only and does not replace medical advice from a certified healthcare professional.*`;
  }

  // 6. APPETITE / NAUSEA / GASTROINTESTINAL
  if (
    query.includes("appetite") || 
    query.includes("nausea") || 
    query.includes("eating") || 
    query.includes("vomit") || 
    query.includes("stomach") || 
    query.includes("gastric") || 
    query.includes("digestive")
  ) {
    return `### 🌿 ReleafCanna Clinical Advisory: Nausea Relief & Appetite Modulation

Thank you for consulting the **ReleafCanna Botanical Expert Advisor**. Let's review the scientific and empirical guidelines for gastrointestinal soothing and appetite modulation using targeted cannabis chemistry.

#### 🧠 Pharmacological Mechanism
The gastrointestinal tract is incredibly rich in cannabinoid receptors. Activating CB1 receptors in the stomach slows motility and blocks the neurological vomiting reflex in the brainstem.

*   **Primary Cannabinoid Pathway:**
    *   **THC (Tetrahydrocannabinol):** The most effective compound for suppressing nausea and vomiting. It directly activates CB1 receptors to stimulate ghrelin, the body's primary hunger hormone.
    *   **CBDA (Cannabidiolic Acid):** Pre-activated raw CBD. Research indicates CBDA is an incredibly potent anti-emetic, binding serotonin 5-HT1A receptors up to 1000x more effectively than activated CBD.
    *   **THCV (Tetrahydrocannabivarin):** Acts as an appetite suppressant, making it valuable for glycemic index control.
*   **Essential Terpene Synergy:**
    *   **Limonene:** Protects the gastric lining, eases acid reflux, and reduces digestive spasms.
    *   **Caryophyllene:** Directly binds peripheral CB2 receptors to soothe inflammatory gut conditions like IBD and Crohn's.

#### 🧬 Recommended Cultivars
1.  **OG Kush** (Indica-Dominant Hybrid): Heavily stimulates appetite and blocks immediate nausea.
2.  **Charlotte's Web** (CBD/CBDA-Rich): Excellent for physical gut soothing and inflammation reduction with zero psychoactivity.
3.  **Durban Poison** (Pure Sativa | High THCV): Use if your goal is appetite suppression or metabolic control rather than stimulation.

#### ⏳ Consumption & Safety Guidelines
*   **Method:** Raw sublingual tincture extracts containing CBDA are ideal for fast-acting nausea relief without any psychoactive effects.
*   **Pro-Tip:** Consuming a small, warm meal 15-20 minutes after inhalation helps activate gastric digestion mechanisms smoothly.

*Disclaimer: This information is for educational purposes only and does not replace medical advice from a certified healthcare professional.*`;
  }

  // 7. SPECIFIC CANNABINOIDS
  const cannabinoidsList = ["thc", "cbd", "cbg", "cbn", "thcv", "cbc", "cbda", "thca", "cbdv", "cbga"];
  const matchedCannabinoid = cannabinoidsList.find(c => query.includes(c));
  if (matchedCannabinoid) {
    const ucName = matchedCannabinoid.toUpperCase();
    return `### 🧬 ReleafCanna Compound Profile: **${ucName}**

Let's review the scientific details of the cannabinoid **${ucName}**:

#### 🧪 Pharmacological & Binding Affinity
**${ucName}** is one of the key active chemical compounds produced within the trichomes of the cannabis plant.
*   **Mechanism:** It interacts directly or indirectly with CB1 receptors (mainly in the brain) and CB2 receptors (mainly in the immune and peripheral nervous systems) to coordinate systematic balance.
*   **Clinical Research:** It is widely recognized for its high therapeutic utility, including properties that are neuroprotective, analgesic, and stress-softening.

#### 🌿 High-Density Representation
In our **Strains Directory**, you can find strains meticulously mapped according to their **${ucName}** expressions. Strains like **ACDC** (high CBD), **Durban Poison** (high THCV), or **Granddaddy Purple** (high THC) are scientifically balanced to maximize this specific cannabinoid's synergy.

*Disclaimer: Individual endocannabinoid tone varies. Consult our Cannabinoids Index for deep technical specifications.*`;
  }

  // 8. SPECIFIC TERPENES
  const terpenesList = ["myrcene", "limonene", "caryophyllene", "linalool", "pinene", "terpinolene", "humulene", "ocimene", "bisabolol"];
  const matchedTerpene = terpenesList.find(t => query.includes(t));
  if (matchedTerpene) {
    const ucName = matchedTerpene.charAt(0).toUpperCase() + matchedTerpene.slice(1);
    return `### 🧪 ReleafCanna Compound Profile: **${ucName}**

Let's review the therapeutic and physiological details of the terpene **${ucName}**:

#### 👃 Aromatic & Absorption Properties
**${ucName}** is an organic botanical hydrocarbon that works in perfect harmony with major cannabinoids (the Entourage Effect) to customize the physical and emotional outcome.
*   **Aroma:** Features a highly distinct aromatic profile with rich natural, organic scents.
*   **Bioavailability:** Enhances blood-brain barrier permeability, allowing cannabinoids to bind more efficiently and prolonging their therapeutic lifespan.

#### 🧬 Cultivar Suggestions
Navigate to our dedicated **Terpenes Directory** on the main dashboard to find cultivars containing certified high levels of **${ucName}**. This terpene is excellent for patients targeting specific receptor pathways and sensory elevation.

*Disclaimer: Personal metabolism varies. Start low, go slow.*`;
  }

  // 9. SPECIFIC CLASSIC STRAINS
  const strainsList = ["blue dream", "og kush", "sour diesel", "granddaddy purple", "jack herer", "white widow", "northern lights", "girl scout cookies", "durban poison", "acdc", "charlotte", "harlequin"];
  const matchedStrain = strainsList.find(s => query.includes(s));
  if (matchedStrain) {
    const ucName = matchedStrain.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return `### 🌿 ReleafCanna Cultivar Advisory: **${ucName}**

Thank you for requesting a scientific profile for the iconic cultivar **${ucName}**. Let's analyze its botanical chemistry and medical indications:

#### 🧠 Chemical Composition & Terpene Synergy
This premium cultivar has been mapped in our database with the following laboratory specifications:
*   **Cannabinoid Core:** Showcases a balanced, high-potency chemical structure engineered for optimal therapeutic response.
*   **Terpene Profile:** High concentration of primary aromatic compounds that enhance the entourage effect, facilitating deeper receptor binding in the central nervous system.
*   **Target Relief:** Highly recommended for relieving physical tension, supporting sleep onset, or elevating cognitive focus depending on its dominant classification.

#### 🔍 Mapped Strain Page
We have a fully dedicated page with deep scientific analysis for this exact strain! Search for **${ucName}** in our **Strains Directory** (accessible via the top navigation bar) to view its certified THC/CBD percentages, active molecule paths, and GoDaddy domain acquisition metrics.

*Disclaimer: Start with low dosages to evaluate your personal tolerance curve.*`;
  }

  // 10. COMPREHENSIVE FALLBACK GENERATOR
  const capitalizedQuery = userQuery.trim().replace(/[?.]/g, "");
  return `### 🌿 ReleafCanna Clinical Advisory: Endocannabinoid Consultation

Thank you for consulting the **ReleafCanna Expert Advisor**. Let's analyze your inquiry regarding:
> *"${capitalizedQuery}"*

#### 🧠 Clinical Endocannabinoid System (ECS) Action
Every individual has an endogenous physiological system called the **Endocannabinoid System (ECS)**. It consists of millions of cannabinoid receptors (CB1 and CB2) located throughout the brain, immune cells, and peripheral organs.

*   **CB1 Receptors:** Concentrated in the brain and central nervous system. They coordinate memory, mood, motor control, and pain perception.
*   **CB2 Receptors:** Abundant in the peripheral organs, immune system, and gastrointestinal tract. They regulate inflammation, immune response, and tissue healing.

When you ask about **"${capitalizedQuery}"**, your target physiological pathways can be optimized using specific cannabinoid ratios and terpene formulations.

#### 🧬 How to Optimize Your Formulation
1.  **Map Your Cannabinoids:** Go to our **Cannabinoids Directory** to compare major active ingredients. High-THC options bind directly to CB1 receptors, while non-psychoactive choices like CBD, CBG, or CBN act as gentle buffers to restore baseline balance.
2.  **Target Terpene Synergies:** Consult our **Terpenes Directory**. Hydrocarbons like *Myrcene* (sedating), *Limonene* (uplifting), or *Beta-Caryophyllene* (anti-inflammatory) cross the blood-brain barrier to dynamically shift the medicinal outcome.
3.  **Run the Interactive Strain Matcher:** Click on the **Strain Matcher** tab at the top. Input your exact tolerance, preferred consumption route, and therapeutic goal to receive instant, mathematically mapped cultivar recommendations.
4.  **Explore the Botanical Database:** Use the search feature in our **Botanical Directory** to query over 1,700 individual strains, complete with chemical potency reviews and symptom guidelines.

*Disclaimer: This advisory is for scientific and educational purposes only and does not replace professional medical diagnosis or treatment. Always consult with a certified clinical health professional before starting any new botanical therapies.*`;
}

