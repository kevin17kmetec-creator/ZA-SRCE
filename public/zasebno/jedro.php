<?php
// Gemeinsamer Kern für Statistik, Dashboard und Gemini-Proxy.
// Liegt im gesperrten Ordner "zasebno" und wird nur per require eingebunden.

define('ZS_JEDRO', true);
date_default_timezone_set('Europe/Ljubljana');

const ZS_SEJA_MINUT = 30;          // Inaktivität, nach der ein neuer Besuch beginnt
const ZS_MAX_TRAJANJE = 1800;      // max. gezählte Verweildauer pro Messung (Sekunden)
const ZS_PRIJAVA_MAX_POSKUSOV = 5; // Fehlversuche, bevor die Anmeldung gesperrt wird
const ZS_PRIJAVA_OKNO = 900;       // Sperrfenster in Sekunden (15 Minuten)
const ZS_SEJA_POTEK = 7200;        // Abmeldung nach 2 Stunden Inaktivität

// ---------------------------------------------------------------------------
// Konfiguration und Datenbank
// ---------------------------------------------------------------------------

function zs_config()
{
    static $config = null;
    if ($config === null) {
        $pot = __DIR__ . '/config.php';
        if (!is_file($pot)) {
            throw new RuntimeException('Datei zasebno/config.php fehlt.');
        }
        $config = require $pot;
    }
    return $config;
}

function zs_baza()
{
    static $pdo = null;
    if ($pdo === null) {
        $b = zs_config()['baza'];
        $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $b['gostitelj'], (int)($b['vrata'] ?? 3306), $b['ime']);
        $pdo = new PDO($dsn, $b['uporabnik'], $b['geslo'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    }
    return $pdo;
}

function zs_shema()
{
    $mozn = 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC';
    return [
        // Rohereignisse (werden nach "hramba_dni" Tagen gelöscht)
        "CREATE TABLE IF NOT EXISTS zs_dogodki (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            cas DATETIME NOT NULL,
            dan DATE NOT NULL,
            tip VARCHAR(12) NOT NULL,
            pot VARCHAR(190) NOT NULL,
            oznaka VARCHAR(60) NULL,
            vrednost VARCHAR(200) NULL,
            napotitelj VARCHAR(100) NULL,
            utm_vir VARCHAR(100) NULL,
            utm_kampanja VARCHAR(100) NULL,
            naprava VARCHAR(12) NULL,
            brskalnik VARCHAR(20) NULL,
            os VARCHAR(20) NULL,
            jezik VARCHAR(5) NULL,
            obiskovalec CHAR(16) NOT NULL,
            seja CHAR(16) NOT NULL,
            vstop TINYINT(1) NOT NULL DEFAULT 0,
            trajanje INT UNSIGNED NULL,
            pomik TINYINT UNSIGNED NULL,
            KEY idx_dan_obiskovalec (dan, obiskovalec),
            KEY idx_dan_tip (dan, tip)
        ) $mozn",
        // Tägliches Salz für den anonymen Besucher-Hash (wird täglich gelöscht)
        "CREATE TABLE IF NOT EXISTS zs_sol (
            dan DATE NOT NULL PRIMARY KEY,
            vrednost CHAR(64) NOT NULL
        ) $mozn",
        // Dauerhafte Tageszusammenfassungen (ohne Personenbezug)
        "CREATE TABLE IF NOT EXISTS zs_povzetek_dan (
            dan DATE NOT NULL PRIMARY KEY,
            obiskovalci INT UNSIGNED NOT NULL DEFAULT 0,
            seje INT UNSIGNED NOT NULL DEFAULT 0,
            ogledi INT UNSIGNED NOT NULL DEFAULT 0,
            odboji INT UNSIGNED NOT NULL DEFAULT 0,
            cas_skupaj INT UNSIGNED NOT NULL DEFAULT 0
        ) $mozn",
        "CREATE TABLE IF NOT EXISTS zs_povzetek_strani (
            dan DATE NOT NULL,
            pot VARCHAR(190) NOT NULL,
            ogledi INT UNSIGNED NOT NULL DEFAULT 0,
            obiskovalci INT UNSIGNED NOT NULL DEFAULT 0,
            cas_skupaj INT UNSIGNED NOT NULL DEFAULT 0,
            pomik_vsota INT UNSIGNED NOT NULL DEFAULT 0,
            pomik_n INT UNSIGNED NOT NULL DEFAULT 0,
            PRIMARY KEY (dan, pot)
        ) $mozn",
        "CREATE TABLE IF NOT EXISTS zs_povzetek_dimenzij (
            dan DATE NOT NULL,
            dimenzija VARCHAR(20) NOT NULL,
            vrednost VARCHAR(150) NOT NULL,
            stevilo INT UNSIGNED NOT NULL DEFAULT 0,
            PRIMARY KEY (dan, dimenzija, vrednost)
        ) $mozn",
        // Dashboard-Benutzer
        "CREATE TABLE IF NOT EXISTS zs_uporabniki (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            uporabnisko_ime VARCHAR(50) NOT NULL,
            geslo_hash VARCHAR(255) NOT NULL,
            zadnja_prijava DATETIME NULL,
            geslo_spremenjeno DATETIME NULL,
            UNIQUE KEY uq_ime (uporabnisko_ime)
        ) $mozn",
        // Ratenbegrenzung (Anmeldung, Gemini) – nur gehashte Schlüssel
        "CREATE TABLE IF NOT EXISTS zs_omejitve (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            vrsta VARCHAR(10) NOT NULL,
            kljuc CHAR(64) NOT NULL,
            cas INT UNSIGNED NOT NULL,
            KEY idx_vrsta_kljuc (vrsta, kljuc, cas)
        ) $mozn",
    ];
}

// ---------------------------------------------------------------------------
// Hilfsfunktionen
// ---------------------------------------------------------------------------

function zs_rez($niz, $dolzina)
{
    $niz = trim((string)$niz);
    if ($niz === '') {
        return null;
    }
    return function_exists('mb_substr') ? mb_substr($niz, 0, $dolzina, 'UTF-8') : substr($niz, 0, $dolzina);
}

function zs_json($podatki, $status = 200)
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($podatki, JSON_UNESCAPED_UNICODE);
    exit;
}

function zs_h($niz)
{
    return htmlspecialchars((string)$niz, ENT_QUOTES, 'UTF-8');
}

function zs_je_https()
{
    if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
        return true;
    }
    return ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https' || (int)($_SERVER['SERVER_PORT'] ?? 0) === 443;
}

// IP nur zur Hash-Berechnung bzw. Ratenbegrenzung – wird nie gespeichert
function zs_ip()
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    // Hinter einem internen Proxy des Hosters die echte Adresse verwenden
    $jeZasebna = filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false;
    if ($jeZasebna && !empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $prvi = trim(explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0]);
        if (filter_var($prvi, FILTER_VALIDATE_IP)) {
            $ip = $prvi;
        }
    }
    return $ip;
}

function zs_ista_domena()
{
    $gostitelj = strtolower($_SERVER['HTTP_HOST'] ?? '');
    foreach (['HTTP_ORIGIN', 'HTTP_REFERER'] as $glava) {
        if (!empty($_SERVER[$glava])) {
            $vir = strtolower((string)parse_url($_SERVER[$glava], PHP_URL_HOST));
            return $vir !== '' && $vir === preg_replace('/:\d+$/', '', $gostitelj);
        }
    }
    return false;
}

// ---------------------------------------------------------------------------
// Anonymer Besucher-Hash mit täglich wechselndem Salz
// ---------------------------------------------------------------------------

function zs_sol_danes(PDO $pdo)
{
    $danes = date('Y-m-d');
    $st = $pdo->prepare('SELECT vrednost FROM zs_sol WHERE dan = ?');
    $st->execute([$danes]);
    $sol = $st->fetchColumn();
    if ($sol) {
        return $sol;
    }
    $pdo->prepare('INSERT IGNORE INTO zs_sol (dan, vrednost) VALUES (?, ?)')->execute([$danes, bin2hex(random_bytes(32))]);
    // Salz der Vortage sofort löschen – damit sind alte Hashes nicht mehr zuordenbar
    $pdo->prepare('DELETE FROM zs_sol WHERE dan < ?')->execute([$danes]);
    $st->execute([$danes]);
    return $st->fetchColumn();
}

function zs_obiskovalec_hash(PDO $pdo)
{
    $podlaga = zs_sol_danes($pdo) . '|' . zs_ip() . '|' . ($_SERVER['HTTP_USER_AGENT'] ?? '') . '|' . ($_SERVER['HTTP_HOST'] ?? '');
    return substr(hash('sha256', $podlaga), 0, 16);
}

// ---------------------------------------------------------------------------
// Grobe Geräteerkennung aus dem User-Agent
// ---------------------------------------------------------------------------

function zs_je_bot($ua)
{
    if ($ua === '') {
        return true;
    }
    return (bool)preg_match('/bot|crawl|spider|slurp|preview|headless|lighthouse|pingdom|uptime|monitor|curl|wget|python|java\/|facebookexternalhit|bingpreview/i', $ua);
}

function zs_razberi_ua($ua, $sirina)
{
    if (preg_match('/iPad|Tablet|Nexus 7|Nexus 10|SM-T|Kindle|Silk/i', $ua) || (stripos($ua, 'Android') !== false && stripos($ua, 'Mobile') === false)) {
        $naprava = 'tablica';
    } elseif (preg_match('/Mobi|iPhone|iPod|Android.*Mobile|Windows Phone/i', $ua)) {
        $naprava = 'mobilnik';
    } elseif ($sirina > 0 && $sirina < 768) {
        $naprava = 'mobilnik';
    } else {
        $naprava = 'računalnik';
    }

    if (preg_match('/Edg\//', $ua)) {
        $brskalnik = 'Edge';
    } elseif (preg_match('/OPR\/|Opera/', $ua)) {
        $brskalnik = 'Opera';
    } elseif (preg_match('/SamsungBrowser/', $ua)) {
        $brskalnik = 'Samsung Internet';
    } elseif (preg_match('/Firefox|FxiOS/', $ua)) {
        $brskalnik = 'Firefox';
    } elseif (preg_match('/Chrome|CriOS/', $ua)) {
        $brskalnik = 'Chrome';
    } elseif (preg_match('/Safari/', $ua)) {
        $brskalnik = 'Safari';
    } else {
        $brskalnik = 'Drugo';
    }

    if (preg_match('/iPhone|iPad|iPod/', $ua)) {
        $os = 'iOS';
    } elseif (stripos($ua, 'Android') !== false) {
        $os = 'Android';
    } elseif (stripos($ua, 'Windows') !== false) {
        $os = 'Windows';
    } elseif (stripos($ua, 'Mac OS X') !== false || stripos($ua, 'Macintosh') !== false) {
        $os = 'macOS';
    } elseif (stripos($ua, 'CrOS') !== false) {
        $os = 'ChromeOS';
    } elseif (stripos($ua, 'Linux') !== false) {
        $os = 'Linux';
    } else {
        $os = 'Drugo';
    }

    return [$naprava, $brskalnik, $os];
}

function zs_normaliziraj_napotitelja($gostitelj)
{
    $g = strtolower(trim((string)$gostitelj));
    if ($g === '' || !preg_match('/^[a-z0-9.-]+$/', $g)) {
        return null;
    }
    $g = preg_replace('/^(www\.|m\.|l\.|lm\.)/', '', $g);
    $znani = [
        'google' => 'Google',
        'bing.' => 'Bing',
        'duckduckgo' => 'DuckDuckGo',
        'yahoo.' => 'Yahoo',
        'facebook' => 'Facebook',
        'instagram' => 'Instagram',
        'youtube' => 'YouTube',
        'linkedin' => 'LinkedIn',
        't.co' => 'X / Twitter',
        'vecer.com' => 'Večer',
        'chatgpt' => 'ChatGPT',
    ];
    foreach ($znani as $iskano => $ime) {
        if (strpos($g, $iskano) !== false) {
            return $ime;
        }
    }
    return zs_rez($g, 100);
}

// ---------------------------------------------------------------------------
// Ratenbegrenzung
// ---------------------------------------------------------------------------

function zs_omejitev_stevilo(PDO $pdo, $vrsta, $kljuc, $oknoSekund)
{
    $st = $pdo->prepare('SELECT COUNT(*) FROM zs_omejitve WHERE vrsta = ? AND kljuc = ? AND cas > ?');
    $st->execute([$vrsta, $kljuc, time() - $oknoSekund]);
    return (int)$st->fetchColumn();
}

function zs_omejitev_zabelezi(PDO $pdo, $vrsta, $kljuc)
{
    $pdo->prepare('INSERT INTO zs_omejitve (vrsta, kljuc, cas) VALUES (?, ?, ?)')->execute([$vrsta, $kljuc, time()]);
}

function zs_omejitev_pocisti(PDO $pdo, $vrsta, $kljuc)
{
    $pdo->prepare('DELETE FROM zs_omejitve WHERE vrsta = ? AND kljuc = ?')->execute([$vrsta, $kljuc]);
}

function zs_kljuc_ip($namen)
{
    return hash('sha256', $namen . '|' . zs_ip() . '|' . __DIR__);
}

// ---------------------------------------------------------------------------
// Zusammenfassungen
// ---------------------------------------------------------------------------

// Berechnet alle Kennzahlen eines Tages aus den Rohdaten
function zs_izracunaj_dan(PDO $pdo, $dan)
{
    $max = ZS_MAX_TRAJANJE;

    $st = $pdo->prepare("SELECT COUNT(*) AS ogledi, COUNT(DISTINCT obiskovalec) AS obiskovalci, COUNT(DISTINCT seja) AS seje
                         FROM zs_dogodki WHERE dan = ? AND tip = 'ogled'");
    $st->execute([$dan]);
    $osnova = $st->fetch();

    $st = $pdo->prepare("SELECT COUNT(*) FROM (SELECT seja FROM zs_dogodki WHERE dan = ? AND tip = 'ogled' GROUP BY seja HAVING COUNT(*) = 1) x");
    $st->execute([$dan]);
    $odboji = (int)$st->fetchColumn();

    $st = $pdo->prepare("SELECT COALESCE(SUM(LEAST(trajanje, $max)), 0) FROM zs_dogodki WHERE dan = ? AND tip = 'odhod'");
    $st->execute([$dan]);
    $cas = (int)$st->fetchColumn();

    $povzetek = [
        'obiskovalci' => (int)$osnova['obiskovalci'],
        'seje' => (int)$osnova['seje'],
        'ogledi' => (int)$osnova['ogledi'],
        'odboji' => $odboji,
        'cas_skupaj' => $cas,
    ];

    // Seiten
    $strani = [];
    $st = $pdo->prepare("SELECT pot, COUNT(*) AS ogledi, COUNT(DISTINCT obiskovalec) AS obiskovalci
                         FROM zs_dogodki WHERE dan = ? AND tip = 'ogled' GROUP BY pot");
    $st->execute([$dan]);
    foreach ($st as $v) {
        $strani[$v['pot']] = ['ogledi' => (int)$v['ogledi'], 'obiskovalci' => (int)$v['obiskovalci'], 'cas_skupaj' => 0, 'pomik_vsota' => 0, 'pomik_n' => 0];
    }
    $st = $pdo->prepare("SELECT pot, SUM(LEAST(trajanje, $max)) AS cas FROM zs_dogodki WHERE dan = ? AND tip = 'odhod' GROUP BY pot");
    $st->execute([$dan]);
    foreach ($st as $v) {
        if (!isset($strani[$v['pot']])) {
            $strani[$v['pot']] = ['ogledi' => 0, 'obiskovalci' => 0, 'cas_skupaj' => 0, 'pomik_vsota' => 0, 'pomik_n' => 0];
        }
        $strani[$v['pot']]['cas_skupaj'] = (int)$v['cas'];
    }
    // Scrolltiefe: Maximum je pro Besuch und Seite maßgeblich
    $st = $pdo->prepare("SELECT pot, SUM(m) AS vsota, COUNT(*) AS n FROM (
                             SELECT pot, seja, MAX(pomik) AS m FROM zs_dogodki
                             WHERE dan = ? AND tip = 'odhod' AND pomik IS NOT NULL GROUP BY pot, seja
                         ) x GROUP BY pot");
    $st->execute([$dan]);
    foreach ($st as $v) {
        if (isset($strani[$v['pot']])) {
            $strani[$v['pot']]['pomik_vsota'] = (int)$v['vsota'];
            $strani[$v['pot']]['pomik_n'] = (int)$v['n'];
        }
    }

    // Dimensionen
    $poizvedbe = [
        'vir' => "SELECT COALESCE(napotitelj, '(neposredno)') AS v, COUNT(*) AS n FROM zs_dogodki WHERE dan = ? AND tip = 'ogled' AND vstop = 1 GROUP BY v",
        'vstop' => "SELECT pot AS v, COUNT(*) AS n FROM zs_dogodki WHERE dan = ? AND tip = 'ogled' AND vstop = 1 GROUP BY v",
        'utm' => "SELECT CONCAT(utm_vir, IF(utm_kampanja IS NULL, '', CONCAT(' / ', utm_kampanja))) AS v, COUNT(*) AS n FROM zs_dogodki WHERE dan = ? AND tip = 'ogled' AND vstop = 1 AND utm_vir IS NOT NULL GROUP BY v",
        'naprava' => "SELECT naprava AS v, COUNT(*) AS n FROM zs_dogodki WHERE dan = ? AND tip = 'ogled' AND vstop = 1 GROUP BY v",
        'brskalnik' => "SELECT brskalnik AS v, COUNT(*) AS n FROM zs_dogodki WHERE dan = ? AND tip = 'ogled' AND vstop = 1 GROUP BY v",
        'os' => "SELECT os AS v, COUNT(*) AS n FROM zs_dogodki WHERE dan = ? AND tip = 'ogled' AND vstop = 1 GROUP BY v",
        'jezik' => "SELECT COALESCE(jezik, '?') AS v, COUNT(*) AS n FROM zs_dogodki WHERE dan = ? AND tip = 'ogled' AND vstop = 1 GROUP BY v",
        'ura' => "SELECT LPAD(HOUR(cas), 2, '0') AS v, COUNT(*) AS n FROM zs_dogodki WHERE dan = ? AND tip = 'ogled' GROUP BY v",
        'klik' => "SELECT oznaka AS v, COUNT(*) AS n FROM zs_dogodki WHERE dan = ? AND tip = 'klik' GROUP BY v",
        'klik_cilj' => "SELECT CONCAT(oznaka, ': ', vrednost) AS v, COUNT(*) AS n FROM zs_dogodki WHERE dan = ? AND tip = 'klik' AND vrednost IS NOT NULL GROUP BY v",
        'obrazec' => "SELECT oznaka AS v, COUNT(*) AS n FROM zs_dogodki WHERE dan = ? AND tip = 'obrazec' GROUP BY v",
        'asistent' => "SELECT oznaka AS v, COUNT(*) AS n FROM zs_dogodki WHERE dan = ? AND tip = 'asistent' GROUP BY v",
        'soglasje' => "SELECT oznaka AS v, COUNT(*) AS n FROM zs_dogodki WHERE dan = ? AND tip = 'soglasje' GROUP BY v",
    ];
    $dimenzije = [];
    foreach ($poizvedbe as $dimenzija => $sql) {
        $st = $pdo->prepare($sql);
        $st->execute([$dan]);
        foreach ($st as $v) {
            $kljuc = zs_rez($v['v'] ?? '', 150) ?? '?';
            $dimenzije[$dimenzija][$kljuc] = ($dimenzije[$dimenzija][$kljuc] ?? 0) + (int)$v['n'];
        }
    }

    return ['dan' => $povzetek, 'strani' => $strani, 'dimenzije' => $dimenzije];
}

function zs_shrani_povzetek(PDO $pdo, $dan, array $p)
{
    $pdo->beginTransaction();
    try {
        foreach (['zs_povzetek_dan', 'zs_povzetek_strani', 'zs_povzetek_dimenzij'] as $tabela) {
            $pdo->prepare("DELETE FROM $tabela WHERE dan = ?")->execute([$dan]);
        }
        $d = $p['dan'];
        $pdo->prepare('INSERT INTO zs_povzetek_dan (dan, obiskovalci, seje, ogledi, odboji, cas_skupaj) VALUES (?, ?, ?, ?, ?, ?)')
            ->execute([$dan, $d['obiskovalci'], $d['seje'], $d['ogledi'], $d['odboji'], $d['cas_skupaj']]);

        $st = $pdo->prepare('INSERT INTO zs_povzetek_strani (dan, pot, ogledi, obiskovalci, cas_skupaj, pomik_vsota, pomik_n) VALUES (?, ?, ?, ?, ?, ?, ?)');
        foreach ($p['strani'] as $pot => $s) {
            $st->execute([$dan, $pot, $s['ogledi'], $s['obiskovalci'], $s['cas_skupaj'], $s['pomik_vsota'], $s['pomik_n']]);
        }

        $st = $pdo->prepare('INSERT INTO zs_povzetek_dimenzij (dan, dimenzija, vrednost, stevilo) VALUES (?, ?, ?, ?)');
        foreach ($p['dimenzije'] as $dimenzija => $vrednosti) {
            foreach ($vrednosti as $vrednost => $n) {
                $st->execute([$dan, $dimenzija, (string)$vrednost, $n]);
            }
        }
        $pdo->commit();
    } catch (Exception $e) {
        $pdo->rollBack();
        // Gleichzeitige Verarbeitung desselben Tages ist harmlos – Fehler ignorieren
    }
}

// Fasst abgeschlossene Tage zusammen und löscht alte Rohdaten
function zs_vzdrzevanje(PDO $pdo)
{
    $danes = date('Y-m-d');
    $st = $pdo->prepare('SELECT DISTINCT d.dan FROM zs_dogodki d LEFT JOIN zs_povzetek_dan p ON p.dan = d.dan WHERE d.dan < ? AND p.dan IS NULL ORDER BY d.dan');
    $st->execute([$danes]);
    foreach ($st->fetchAll(PDO::FETCH_COLUMN) as $dan) {
        zs_shrani_povzetek($pdo, $dan, zs_izracunaj_dan($pdo, $dan));
    }

    $hramba = max(7, (int)(zs_config()['statistika']['hramba_dni'] ?? 90));
    $meja = date('Y-m-d', strtotime("-$hramba days"));
    $pdo->prepare('DELETE FROM zs_dogodki WHERE dan < ?')->execute([$meja]);
    $pdo->prepare('DELETE FROM zs_sol WHERE dan < ?')->execute([$danes]);
    $pdo->prepare('DELETE FROM zs_omejitve WHERE cas < ?')->execute([time() - 86400]);
}

// Summiert die Zusammenfassungen eines Zeitraums (heute live aus den Rohdaten)
function zs_obdobje(PDO $pdo, $od, $do)
{
    $danes = date('Y-m-d');
    $rezultat = ['dnevno' => [], 'strani' => [], 'dimenzije' => []];

    $st = $pdo->prepare('SELECT * FROM zs_povzetek_dan WHERE dan BETWEEN ? AND ? AND dan < ?');
    $st->execute([$od, $do, $danes]);
    foreach ($st as $v) {
        $dan = $v['dan'];
        unset($v['dan']);
        $rezultat['dnevno'][$dan] = array_map('intval', $v);
    }

    $st = $pdo->prepare('SELECT pot, SUM(ogledi) ogledi, SUM(obiskovalci) obiskovalci, SUM(cas_skupaj) cas_skupaj, SUM(pomik_vsota) pomik_vsota, SUM(pomik_n) pomik_n
                         FROM zs_povzetek_strani WHERE dan BETWEEN ? AND ? AND dan < ? GROUP BY pot');
    $st->execute([$od, $do, $danes]);
    foreach ($st as $v) {
        $pot = $v['pot'];
        unset($v['pot']);
        $rezultat['strani'][$pot] = array_map('intval', $v);
    }

    $st = $pdo->prepare('SELECT dimenzija, vrednost, SUM(stevilo) n FROM zs_povzetek_dimenzij WHERE dan BETWEEN ? AND ? AND dan < ? GROUP BY dimenzija, vrednost');
    $st->execute([$od, $do, $danes]);
    foreach ($st as $v) {
        $rezultat['dimenzije'][$v['dimenzija']][$v['vrednost']] = (int)$v['n'];
    }

    if ($od <= $danes && $danes <= $do) {
        $p = zs_izracunaj_dan($pdo, $danes);
        $rezultat['dnevno'][$danes] = $p['dan'];
        foreach ($p['strani'] as $pot => $s) {
            foreach ($s as $k => $n) {
                $rezultat['strani'][$pot][$k] = ($rezultat['strani'][$pot][$k] ?? 0) + $n;
            }
        }
        foreach ($p['dimenzije'] as $dim => $vrednosti) {
            foreach ($vrednosti as $vr => $n) {
                $rezultat['dimenzije'][$dim][$vr] = ($rezultat['dimenzije'][$dim][$vr] ?? 0) + $n;
            }
        }
    }

    return $rezultat;
}

// ---------------------------------------------------------------------------
// Anmeldung für das Dashboard
// ---------------------------------------------------------------------------

function zs_zacni_sejo()
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    session_name('zs_statistika');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/statistika/',
        'secure' => zs_je_https(),
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();

    if (!empty($_SESSION['uporabnik_id']) && (time() - ($_SESSION['zadnja_aktivnost'] ?? 0)) > ZS_SEJA_POTEK) {
        zs_odjava();
        session_start();
    }
    $_SESSION['zadnja_aktivnost'] = time();
}

function zs_prijavljen()
{
    zs_zacni_sejo();
    return !empty($_SESSION['uporabnik_id']);
}

function zs_zahtevaj_prijavo($json = false)
{
    if (zs_prijavljen()) {
        return;
    }
    if ($json) {
        zs_json(['napaka' => 'Niste prijavljeni.'], 401);
    }
    header('Location: ./');
    exit;
}

function zs_csrf()
{
    zs_zacni_sejo();
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

function zs_preveri_csrf($zeton)
{
    return is_string($zeton) && !empty($_SESSION['csrf']) && hash_equals($_SESSION['csrf'], $zeton);
}

function zs_odjava()
{
    $_SESSION = [];
    if (session_status() === PHP_SESSION_ACTIVE) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', [
            'expires' => time() - 3600,
            'path' => $p['path'],
            'secure' => $p['secure'],
            'httponly' => true,
            'samesite' => 'Strict',
        ]);
        session_destroy();
    }
}

// Markiert das eigene Gerät, damit Besuche von Verein/Admin nicht gezählt werden
function zs_oznaci_skrbnika()
{
    setcookie('zs_brez_statistike', '1', [
        'expires' => time() + 365 * 86400,
        'path' => '/',
        'secure' => zs_je_https(),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

// Gemeinsames Fehlerverhalten: keine Details an Besucher ausgeben
function zs_varno($povratniKlic, $json = true)
{
    try {
        return $povratniKlic();
    } catch (Throwable $e) {
        error_log('[zasrce] ' . $e->getMessage());
        if ($json) {
            zs_json(['napaka' => 'Napaka na strežniku.'], 500);
        }
        http_response_code(500);
        echo 'Napaka na strežniku. Preverite nastavitve v zasebno/config.php.';
        exit;
    }
}
