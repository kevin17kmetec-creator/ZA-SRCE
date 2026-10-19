<?php
// Empfängt die anonymen Statistik-Ereignisse der Webseite.
// Es werden keine Cookies gesetzt und keine IP-Adressen gespeichert.

require_once __DIR__ . '/../zasebno/jedro.php';

header('Cache-Control: no-store');

$koncaj = function () {
    http_response_code(204);
    exit;
};

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    exit;
}

// Nur Anfragen von der eigenen Domain
if (!zs_ista_domena()) {
    $koncaj();
}

// Geräte von Verein/Admin (nach Anmeldung im Dashboard markiert) nicht zählen
if (!empty($_COOKIE['zs_brez_statistike'])) {
    $koncaj();
}

$ua = (string)($_SERVER['HTTP_USER_AGENT'] ?? '');
if (zs_je_bot($ua)) {
    $koncaj();
}

$surovo = file_get_contents('php://input', false, null, 0, 4096);
$v = json_decode((string)$surovo, true);
if (!is_array($v)) {
    $koncaj();
}

$dovoljeniTipi = ['ogled', 'odhod', 'klik', 'obrazec', 'soglasje', 'asistent'];
$tip = (string)($v['t'] ?? '');
if (!in_array($tip, $dovoljeniTipi, true)) {
    $koncaj();
}

// Pfad bereinigen: nur interner Pfad, ohne Query-String
$pot = (string)($v['p'] ?? '/');
$pot = strtok($pot, '?#');
if ($pot === false || $pot === '' || $pot[0] !== '/') {
    $pot = '/';
}
$pot = zs_rez(rawurldecode($pot), 190) ?? '/';

zs_varno(function () use ($v, $tip, $pot, $ua) {
    $pdo = zs_baza();
    $zdaj = time();
    $dan = date('Y-m-d', $zdaj);
    $obiskovalec = zs_obiskovalec_hash($pdo);

    // Besuch (Sitzung) bestimmen: letztes Ereignis dieses anonymen Besuchers heute
    $st = $pdo->prepare('SELECT seja, cas FROM zs_dogodki WHERE dan = ? AND obiskovalec = ? ORDER BY id DESC LIMIT 1');
    $st->execute([$dan, $obiskovalec]);
    $zadnji = $st->fetch();

    $vstop = 0;
    if ($zadnji && ($tip !== 'ogled' || ($zdaj - strtotime($zadnji['cas'])) <= ZS_SEJA_MINUT * 60)) {
        $seja = $zadnji['seja'];
    } else {
        $seja = bin2hex(random_bytes(8));
        $vstop = $tip === 'ogled' ? 1 : 0;
    }

    list($naprava, $brskalnik, $os) = zs_razberi_ua($ua, (int)($v['s'] ?? 0));

    $napotitelj = null;
    $utmVir = null;
    $utmKampanja = null;
    if ($tip === 'ogled' && $vstop) {
        $napotitelj = zs_normaliziraj_napotitelja($v['r'] ?? '');
        $lastna = preg_replace('/^www\./', '', strtolower((string)($_SERVER['HTTP_HOST'] ?? '')));
        if ($napotitelj !== null && preg_replace('/^www\./', '', $napotitelj) === $lastna) {
            $napotitelj = null;
        }
        $utmVir = zs_rez(strtolower((string)($v['us'] ?? '')), 100);
        $utmKampanja = zs_rez(strtolower((string)($v['uc'] ?? '')), 100);
    }

    $trajanje = null;
    $pomik = null;
    if ($tip === 'odhod') {
        $trajanje = max(0, min(ZS_MAX_TRAJANJE, (int)($v['d'] ?? 0)));
        $pomik = max(0, min(100, (int)($v['m'] ?? 0)));
        if ($trajanje === 0) {
            return;
        }
    }

    $jezik = zs_rez(strtolower(preg_replace('/[^a-zA-Z-]/', '', (string)($v['j'] ?? ''))), 2);

    $pdo->prepare('INSERT INTO zs_dogodki
        (cas, dan, tip, pot, oznaka, vrednost, napotitelj, utm_vir, utm_kampanja, naprava, brskalnik, os, jezik, obiskovalec, seja, vstop, trajanje, pomik)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
        ->execute([
            date('Y-m-d H:i:s', $zdaj), $dan, $tip, $pot,
            zs_rez($v['o'] ?? '', 60), zs_rez($v['v'] ?? '', 200),
            $napotitelj, $utmVir, $utmKampanja,
            $naprava, $brskalnik, $os, $jezik,
            $obiskovalec, $seja, $vstop, $trajanje, $pomik,
        ]);

    // Gelegentlich abgeschlossene Tage zusammenfassen und alte Daten löschen
    if (random_int(1, 25) === 1) {
        zs_vzdrzevanje($pdo);
    }
});

$koncaj();
