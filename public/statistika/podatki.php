<?php
// Liefert die Statistikdaten für das Dashboard (JSON) bzw. als CSV-Export.

require_once __DIR__ . '/../zasebno/jedro.php';

zs_zahtevaj_prijavo(true);

$jeDatum = function ($d) {
    return is_string($d) && preg_match('/^\d{4}-\d{2}-\d{2}$/', $d) && strtotime($d) !== false;
};

$do = $_GET['do'] ?? date('Y-m-d');
$od = $_GET['od'] ?? date('Y-m-d', strtotime('-29 days'));
if (!$jeDatum($od) || !$jeDatum($do)) {
    zs_json(['napaka' => 'Neveljaven datum.'], 400);
}
if ($od > $do) {
    list($od, $do) = [$do, $od];
}
// Höchstens 5 Jahre auf einmal
if ((strtotime($do) - strtotime($od)) / 86400 > 1830) {
    $od = date('Y-m-d', strtotime($do . ' -1830 days'));
}

zs_varno(function () use ($od, $do) {
    $pdo = zs_baza();
    zs_vzdrzevanje($pdo);

    $podatki = zs_obdobje($pdo, $od, $do);

    // Vergleichszeitraum gleicher Länge direkt davor
    $dni = (int)round((strtotime($do) - strtotime($od)) / 86400) + 1;
    $prejDo = date('Y-m-d', strtotime($od . ' -1 day'));
    $prejOd = date('Y-m-d', strtotime($od . " -$dni days"));
    $prej = zs_obdobje($pdo, $prejOd, $prejDo);

    $sestej = function (array $dnevno) {
        $s = ['obiskovalci' => 0, 'seje' => 0, 'ogledi' => 0, 'odboji' => 0, 'cas_skupaj' => 0];
        foreach ($dnevno as $d) {
            foreach ($s as $k => $_) {
                $s[$k] += (int)($d[$k] ?? 0);
            }
        }
        return $s;
    };

    // Lückenlose Tagesreihe
    $vrsta = [];
    for ($t = strtotime($od); $t <= strtotime($do); $t = strtotime('+1 day', $t)) {
        $dan = date('Y-m-d', $t);
        $d = $podatki['dnevno'][$dan] ?? [];
        $vrsta[] = [
            'dan' => $dan,
            'obiskovalci' => (int)($d['obiskovalci'] ?? 0),
            'seje' => (int)($d['seje'] ?? 0),
            'ogledi' => (int)($d['ogledi'] ?? 0),
            'odboji' => (int)($d['odboji'] ?? 0),
            'cas_skupaj' => (int)($d['cas_skupaj'] ?? 0),
        ];
    }

    $strani = [];
    foreach ($podatki['strani'] as $pot => $s) {
        $strani[] = [
            'pot' => $pot,
            'ogledi' => $s['ogledi'],
            'obiskovalci' => $s['obiskovalci'],
            'povp_cas' => $s['ogledi'] > 0 ? (int)round($s['cas_skupaj'] / $s['ogledi']) : 0,
            'povp_pomik' => $s['pomik_n'] > 0 ? (int)round($s['pomik_vsota'] / $s['pomik_n']) : null,
        ];
    }
    usort($strani, function ($a, $b) {
        return $b['ogledi'] <=> $a['ogledi'];
    });

    $dimenzije = [];
    foreach ($podatki['dimenzije'] as $dim => $vrednosti) {
        arsort($vrednosti);
        $seznam = [];
        foreach (array_slice($vrednosti, 0, 25, true) as $vr => $n) {
            $seznam[] = ['vrednost' => (string)$vr, 'stevilo' => $n];
        }
        $dimenzije[$dim] = $seznam;
    }

    // CSV-Export (für Jahresberichte des Vereins)
    if (($_GET['izvoz'] ?? '') === 'csv') {
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="statistika_' . $od . '_' . $do . '.csv"');
        // Schutz vor Formel-Injektion in Excel (Werte stammen teils von Besuchern)
        $celica = function ($v) {
            $v = (string)$v;
            return ($v !== '' && strpos('=+-@', $v[0]) !== false) ? "'" . $v : $v;
        };
        $izhod = fopen('php://output', 'w');
        fwrite($izhod, "\xEF\xBB\xBF"); // BOM, damit Excel UTF-8 erkennt
        fputcsv($izhod, ['Dan', 'Obiskovalci', 'Obiski (seje)', 'Ogledi strani', 'Odboji', 'Skupni čas (s)'], ';');
        foreach ($vrsta as $r) {
            fputcsv($izhod, [$r['dan'], $r['obiskovalci'], $r['seje'], $r['ogledi'], $r['odboji'], $r['cas_skupaj']], ';');
        }
        fputcsv($izhod, [], ';');
        fputcsv($izhod, ['Stran', 'Ogledi', 'Obiskovalci (dnevni seštevek)', 'Povprečni čas (s)', 'Povprečni pomik (%)'], ';');
        foreach ($strani as $s) {
            fputcsv($izhod, [$celica($s['pot']), $s['ogledi'], $s['obiskovalci'], $s['povp_cas'], $s['povp_pomik'] ?? ''], ';');
        }
        foreach ($dimenzije as $dim => $seznam) {
            fputcsv($izhod, [], ';');
            fputcsv($izhod, [strtoupper($dim), 'Število'], ';');
            foreach ($seznam as $vr) {
                fputcsv($izhod, [$celica($vr['vrednost']), $vr['stevilo']], ';');
            }
        }
        fclose($izhod);
        exit;
    }

    zs_json([
        'od' => $od,
        'do' => $do,
        'skupaj' => $sestej($podatki['dnevno']),
        'prej' => $sestej($prej['dnevno']),
        'dni' => $dni,
        'dnevno' => $vrsta,
        'strani' => array_slice($strani, 0, 50),
        'dimenzije' => $dimenzije,
    ]);
});
