<?php
// Proxy für PDF-Dateien aus Google Drive (Ersatz für den Node-Endpunkt /api/pdf,
// der auf dem A1-PHP-Hosting nicht läuft). Nur Drive-Datei-IDs sind erlaubt.

$id = (string)($_GET['id'] ?? '');
if (!preg_match('/^[A-Za-z0-9_-]{10,100}$/', $id)) {
    http_response_code(400);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Neveljaven ID dokumenta.';
    exit;
}

$najvecBajtov = 60 * 1024 * 1024; // Schutz vor sehr großen Dateien
$vsebina = '';
$prevelika = false;

$ch = curl_init('https://drive.google.com/uc?export=download&id=' . rawurlencode($id));
curl_setopt_array($ch, [
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_MAXREDIRS => 5,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 60,
    CURLOPT_USERAGENT => 'Mozilla/5.0 (ZA-SRCE PDF proxy)',
    CURLOPT_WRITEFUNCTION => function ($ch, $kos) use (&$vsebina, &$prevelika, $najvecBajtov) {
        $vsebina .= $kos;
        if (strlen($vsebina) > $najvecBajtov) {
            $prevelika = true;
            return 0; // Abbruch
        }
        return strlen($kos);
    },
]);
curl_exec($ch);
$status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Nur echte PDFs ausliefern (Drive liefert bei Fehlern HTML-Seiten)
if ($prevelika || $status !== 200 || strncmp($vsebina, '%PDF', 4) !== 0) {
    http_response_code($prevelika ? 413 : 502);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Dokumenta ni bilo mogoče naložiti.';
    exit;
}

header('Content-Type: application/pdf');
header('Content-Length: ' . strlen($vsebina));
header('Cache-Control: public, max-age=3600');
header('X-Content-Type-Options: nosniff');
echo $vsebina;
