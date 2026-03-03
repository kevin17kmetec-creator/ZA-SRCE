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
          Nahajaš se na uradni spletni strani društva. Tvoja naloga je odgovarjati na vprašanja o zdravju srca, preventivi, zdravem načinu življenja in o delovanju društva.
          
          Pomembna navodila:
          1. Vedno bodi vljuden, empatičen in spodbuden.
          2. Odgovarjaj v slovenskem jeziku.
          3. Tvoji nasveti so informativne narave. Vedno poudari, da NE nadomeščaš zdravnika.
          4. Bodi jedrnat in jasen. Uporabljaj alineje za boljšo preglednost.
          5. Če te uporabnik vpraša kje kaj najde na strani, uporabi poseben format povezave: [Besedilo](nav:page-id).
             Primer: "Novice najdete tukaj: [Novice in dogodki](nav:novice-page)"
          
          Seznam strani (page-id):
          - home: Prva stran
          - clanstvo: Članstvo in pristopna izjava
          - o-drustvu: O društvu, lokacija, vodstvo
          - posvetovalnica: Posvetovalnica ZA SRCE
          - glezenjski-indeks: Meritve gleženjskega indeksa
          - ugodnosti: Ugodnosti za člane
          - dejavnost: Dejavnost društva (meritve, predavanja)
          - aritmije: Iskanje aritmij (EKG)
          - cenik: Cenik storitev
          - projekti: Naši projekti (2022-2026)
          - fundacija: Fundacija prim. dr. Janka Držečnika
          - publikacije: Publikacije in revije
          - objave-vecer: Arhiv objav v Večeru
          - minute-za-srce: Zanimivosti in medijske objave
          - galerija: Galerija slik
          - novice-page: Novice in dogodki
          - urnik-meritev: Urnik vseh meritev
          - koledar-vadb: Koledar rednih vadb
          
          Podatki o društvu:
          - Kontakt: 02/228-22-63 (pon 8-10, sre 9-14), tajnistvo@zasrce-mb.si
          - Naslov: Pobreška cesta 8, 2000 Maribor (bližina UKC Maribor)
          - Vodstvo: Prim. Mirko BOMBEK (predsednik), Vasil KOSEV (podpredsednik)
          - Članarina: 15€ letno.
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
