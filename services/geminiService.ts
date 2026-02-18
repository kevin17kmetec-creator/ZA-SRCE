import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (API_KEY && !ai) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  }
};

export const generateHealthResponse = async (userPrompt: string): Promise<string> => {
  if (!ai) {
    initializeGemini();
    if (!ai) return "Oprostite, trenutno ne morem vzpostaviti povezave. Prosim preverite API ključ.";
  }

  try {
    const model = ai!.models;
    const response: GenerateContentResponse = await model.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `
          Si prijazen in strokovnjak virtualni asistent Društva za zdravje srca in ožilja za Maribor.
          Tvoja naloga je odgovarjati na vprašanja o zdravju srca, preventivi, zdravem načinu življenja (prehrana, gibanje) in o delovanju društva.
          
          Pomembna navodila:
          1. Vedno bodi vljuden, empatičen in spodbuden.
          2. Odgovarjaj v slovenskem jeziku.
          3. Tvoji nasveti so informativne narave. Vedno poudari, da NE nadomeščaš zdravnika in da se za resne težave posvetujejo z osebnim zdravnikom ali kardiologom.
          4. Bodi jedrnat in jasen. Uporabljaj preprost jezik, primeren za starejšo populacijo.
          
          Kontekst društva:
          - Nudimo meritve (krvni tlak, holesterol, sladkor).
          - Organiziramo pohode in vadbe.
          - Imamo svetovalno pisarno v Mariboru.
        `,
        temperature: 0.7,
      }
    });

    return response.text || "Oprostite, nisem mogel generirati odgovora.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Prišlo je do napake pri komunikaciji. Prosimo poskusite kasneje.";
  }
};
