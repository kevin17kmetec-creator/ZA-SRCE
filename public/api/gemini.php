<?php
// Serverseitiger Proxy für den KI-Assistenten (Google Gemini).
// Der API-Schlüssel bleibt auf dem Server (zasebno/config.php) und ist im Browser nicht sichtbar.
// Fragen werden weder gespeichert noch protokolliert.

require_once __DIR__ . '/../zasebno/jedro.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    zs_json(['napaka' => 'Dovoljen je le POST.'], 405);
}

// Nur Anfragen von der eigenen Webseite annehmen
if (!zs_ista_domena()) {
    zs_json(['napaka' => 'Nedovoljen dostop.'], 403);
}

$vhod = json_decode((string)file_get_contents('php://input', false, null, 0, 8192), true);
$vprasanje = is_array($vhod) ? trim((string)($vhod['vprasanje'] ?? '')) : '';
if ($vprasanje === '') {
    zs_json(['napaka' => 'Vprašanje je prazno.'], 400);
}
$vprasanje = zs_rez($vprasanje, 1000);

$SISTEMSKO_NAVODILO = <<<'BESEDILO'
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
- Kontakt: 02/228-22-63 (ponedeljek od 9 do 12 ure in sredo od 9 do 14 ure), tajnistvo@zasrce-mb.si
- Naslov: Pobreška cesta 8, 2000 Maribor (bližina UKC Maribor)
- Vodstvo: Prim. Mirko BOMBEK (predsednik), Vasil KOSEV (podpredsednik)
- Članarina: 15€ letno.
BESEDILO;

zs_varno(function () use ($vprasanje, $SISTEMSKO_NAVODILO) {
    $nastavitve = zs_config()['gemini'];
    $kljuc = trim((string)($nastavitve['kljuc'] ?? ''));
    if ($kljuc === '' || strpos($kljuc, 'TVOJ_') === 0) {
        throw new RuntimeException('Gemini-Schlüssel ist in config.php nicht gesetzt.');
    }

    // Missbrauchsschutz: Limit pro Besucher und Tageslimit insgesamt
    $pdo = zs_baza();
    $kljucObiskovalca = zs_kljuc_ip('gemini');
    if (zs_omejitev_stevilo($pdo, 'gemini', $kljucObiskovalca, 3600) >= (int)($nastavitve['omejitev_na_uro'] ?? 20)
        || zs_omejitev_stevilo($pdo, 'gemini_vse', 'skupno', 86400) >= (int)($nastavitve['omejitev_na_dan'] ?? 500)) {
        zs_json(['napaka' => 'Preveč vprašanj.'], 429);
    }
    zs_omejitev_zabelezi($pdo, 'gemini', $kljucObiskovalca);
    zs_omejitev_zabelezi($pdo, 'gemini_vse', 'skupno');

    $model = preg_replace('/[^a-zA-Z0-9.\-]/', '', (string)($nastavitve['model'] ?? 'gemini-3-flash-preview'));
    $url = 'https://generativelanguage.googleapis.com/v1beta/models/' . $model . ':generateContent';

    $telo = json_encode([
        'systemInstruction' => ['parts' => [['text' => $SISTEMSKO_NAVODILO]]],
        'contents' => [['role' => 'user', 'parts' => [['text' => $vprasanje]]]],
        'generationConfig' => ['temperature' => 0.7],
    ], JSON_UNESCAPED_UNICODE);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $telo,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'x-goog-api-key: ' . $kljuc],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_TIMEOUT => 45,
    ]);
    $odziv = curl_exec($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $napaka = curl_error($ch);
    curl_close($ch);

    if ($odziv === false || $status !== 200) {
        throw new RuntimeException('Gemini-Fehler ' . $status . ' ' . $napaka . ' ' . substr((string)$odziv, 0, 300));
    }

    $podatki = json_decode($odziv, true);
    $besedilo = '';
    foreach (($podatki['candidates'][0]['content']['parts'] ?? []) as $del) {
        if (isset($del['text']) && empty($del['thought'])) {
            $besedilo .= $del['text'];
        }
    }
    if (trim($besedilo) === '') {
        $besedilo = 'Oprostite, nisem mogel generirati odgovora.';
    }

    zs_json(['odgovor' => $besedilo]);
});
