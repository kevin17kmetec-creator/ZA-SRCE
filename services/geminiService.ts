// Der Gemini-API-Schlüssel liegt NICHT mehr im Browser-Code.
// Die Anfrage geht an den eigenen Server (/api/gemini.php), der den Schlüssel
// aus der geschützten Konfiguration liest und die Anfrage an Google weiterleitet.

const KONCNA_TOCKA = '/api/gemini.php';

export const generateHealthResponse = async (userPrompt: string): Promise<string> => {
  try {
    const odziv = await fetch(KONCNA_TOCKA, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vprasanje: userPrompt.slice(0, 1000) }),
    });

    const podatki = await odziv.json().catch(() => null);

    if (odziv.status === 429) {
      return 'Prejeli smo veliko vprašanj v kratkem času. Prosimo, poskusite znova čez nekaj minut.';
    }
    if (!odziv.ok || !podatki?.odgovor) {
      return 'Prišlo je do napake pri komunikaciji. Prosimo poskusite kasneje.';
    }
    return podatki.odgovor as string;
  } catch (error) {
    console.error('Napaka asistenta:', error);
    return 'Prišlo je do napake pri komunikaciji. Prosimo poskusite kasneje.';
  }
};
