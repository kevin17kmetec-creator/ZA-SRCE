<?php
// Einmalige Einrichtung: legt die Tabellen an und erstellt die Startbenutzer aus config.php.
// Ist bereits ein Benutzer vorhanden, darf nur ein angemeldeter Benutzer das Skript erneut ausführen.
// Bestehende Passwörter werden NIE überschrieben.

require_once __DIR__ . '/../zasebno/jedro.php';

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');

$vrstice = [];
$uspeh = false;

try {
    $pdo = zs_baza();
    $vrstice[] = '✓ Povezava z bazo deluje.';

    // Nach der Ersteinrichtung nur noch für angemeldete Benutzer
    $obstaja = $pdo->query("SHOW TABLES LIKE 'zs_uporabniki'")->fetchColumn();
    if ($obstaja && (int)$pdo->query('SELECT COUNT(*) FROM zs_uporabniki')->fetchColumn() > 0 && !zs_prijavljen()) {
        http_response_code(403);
        echo '<p style="font-family:sans-serif">Namestitev je že izvedena. Za ponovni zagon se najprej prijavite v <a href="./">nadzorno ploščo</a>.</p>';
        exit;
    }

    foreach (zs_shema() as $sql) {
        $pdo->exec($sql);
    }
    $vrstice[] = '✓ Tabele so pripravljene.';

    $st = $pdo->prepare('INSERT IGNORE INTO zs_uporabniki (uporabnisko_ime, geslo_hash) VALUES (?, ?)');
    foreach ((zs_config()['zacetni_uporabniki'] ?? []) as $ime => $hash) {
        if (strpos((string)$hash, '$2y$') !== 0 && strpos((string)$hash, '$argon') !== 0) {
            $vrstice[] = '✗ Uporabnik ' . zs_h($ime) . ': v config.php ni veljavnega hasha gesla – preskočeno.';
            continue;
        }
        $st->execute([$ime, $hash]);
        $vrstice[] = $st->rowCount() ? '✓ Uporabnik »' . zs_h($ime) . '« je ustvarjen.' : '• Uporabnik »' . zs_h($ime) . '« že obstaja (geslo ni spremenjeno).';
    }

    // Kurzer Funktionstest des Salzes
    zs_sol_danes($pdo);
    $vrstice[] = '✓ Statistika je pripravljena za zbiranje podatkov.';

    // Gemini-Konfiguration prüfen (nur Hinweis)
    $kljuc = (string)(zs_config()['gemini']['kljuc'] ?? '');
    $vrstice[] = ($kljuc === '' || strpos($kljuc, 'TVOJ_') === 0)
        ? '⚠ Gemini ključ v config.php še ni vpisan – AI asistent ne bo deloval.'
        : '✓ Gemini ključ je vpisan.';
    $vrstice[] = function_exists('curl_init') ? '✓ PHP cURL je na voljo.' : '✗ PHP cURL ni na voljo – AI asistent in PDF-ji ne bodo delovali.';
    $uspeh = true;
} catch (Throwable $e) {
    error_log('[zasrce] namestitev: ' . $e->getMessage());
    $vrstice[] = '✗ Napaka: ' . zs_h($e->getMessage());
    $vrstice[] = 'Preverite podatke za bazo v datoteki zasebno/config.php.';
}
?><!DOCTYPE html>
<html lang="sl">
<head>
    <meta charset="UTF-8">
    <meta name="robots" content="noindex, nofollow">
    <title>Namestitev statistike</title>
    <link rel="stylesheet" href="slog.css?v=1">
</head>
<body>
<main class="vsebina ozka">
    <div class="kartica">
        <h1>Namestitev statistike</h1>
        <ul class="koraki">
            <?php foreach ($vrstice as $v): ?><li><?= $v ?></li><?php endforeach; ?>
        </ul>
        <?php if ($uspeh): ?>
            <p><a class="gumb glavni" href="./">Odpri nadzorno ploščo</a></p>
        <?php endif; ?>
    </div>
</main>
</body>
</html>
