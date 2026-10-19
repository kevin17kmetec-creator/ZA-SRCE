<?php
// Dashboard für die Besucherstatistik: Anmeldung, Übersicht und Passwortänderung.

require_once __DIR__ . '/../zasebno/jedro.php';

header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');

zs_zacni_sejo();

$napaka = '';
$sporocilo = '';
$stran = $_GET['stran'] ?? 'pregled';

zs_varno(function () use (&$napaka, &$sporocilo, &$stran) {
    $pdo = zs_baza();
    $akcija = $_POST['akcija'] ?? '';

    // Abmeldung
    if ($akcija === 'odjava' && zs_preveri_csrf($_POST['csrf'] ?? '')) {
        zs_odjava();
        header('Location: ./');
        exit;
    }

    // Anmeldung
    if ($akcija === 'prijava') {
        $kljuc = zs_kljuc_ip('prijava');
        if (zs_omejitev_stevilo($pdo, 'prijava', $kljuc, ZS_PRIJAVA_OKNO) >= ZS_PRIJAVA_MAX_POSKUSOV) {
            $napaka = 'Preveč neuspešnih poskusov. Poskusite znova čez 15 minut.';
            return;
        }
        if (!zs_preveri_csrf($_POST['csrf'] ?? '')) {
            $napaka = 'Seja je potekla. Poskusite znova.';
            return;
        }
        $ime = trim((string)($_POST['uporabnisko_ime'] ?? ''));
        $geslo = (string)($_POST['geslo'] ?? '');

        $st = $pdo->prepare('SELECT id, uporabnisko_ime, geslo_hash FROM zs_uporabniki WHERE uporabnisko_ime = ?');
        $st->execute([$ime]);
        $uporabnik = $st->fetch();

        if (!$uporabnik || !password_verify($geslo, $uporabnik['geslo_hash'])) {
            zs_omejitev_zabelezi($pdo, 'prijava', $kljuc);
            $napaka = 'Napačno uporabniško ime ali geslo.';
            return;
        }

        zs_omejitev_pocisti($pdo, 'prijava', $kljuc);
        session_regenerate_id(true);
        $_SESSION['uporabnik_id'] = (int)$uporabnik['id'];
        $_SESSION['uporabnik_ime'] = $uporabnik['uporabnisko_ime'];
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
        $pdo->prepare('UPDATE zs_uporabniki SET zadnja_prijava = NOW() WHERE id = ?')->execute([$uporabnik['id']]);
        if (password_needs_rehash($uporabnik['geslo_hash'], PASSWORD_DEFAULT)) {
            $pdo->prepare('UPDATE zs_uporabniki SET geslo_hash = ? WHERE id = ?')->execute([password_hash($geslo, PASSWORD_DEFAULT), $uporabnik['id']]);
        }
        // Dieses Gerät künftig nicht mehr in der Statistik zählen
        zs_oznaci_skrbnika();
        header('Location: ./');
        exit;
    }

    // Passwort ändern
    if ($akcija === 'geslo' && zs_prijavljen()) {
        $stran = 'geslo';
        if (!zs_preveri_csrf($_POST['csrf'] ?? '')) {
            $napaka = 'Seja je potekla. Poskusite znova.';
            return;
        }
        $staro = (string)($_POST['staro_geslo'] ?? '');
        $novo = (string)($_POST['novo_geslo'] ?? '');
        $potrditev = (string)($_POST['potrditev_gesla'] ?? '');

        $st = $pdo->prepare('SELECT geslo_hash FROM zs_uporabniki WHERE id = ?');
        $st->execute([$_SESSION['uporabnik_id']]);
        $hash = $st->fetchColumn();

        if (!$hash || !password_verify($staro, $hash)) {
            $napaka = 'Trenutno geslo ni pravilno.';
        } elseif (strlen($novo) < 10) {
            $napaka = 'Novo geslo mora imeti vsaj 10 znakov.';
        } elseif (!preg_match('/[A-Za-zčšžČŠŽ]/u', $novo) || !preg_match('/\d/', $novo)) {
            $napaka = 'Novo geslo mora vsebovati vsaj eno črko in eno številko.';
        } elseif ($novo !== $potrditev) {
            $napaka = 'Novo geslo in potrditev se ne ujemata.';
        } elseif ($novo === $staro) {
            $napaka = 'Novo geslo mora biti drugačno od trenutnega.';
        } else {
            $pdo->prepare('UPDATE zs_uporabniki SET geslo_hash = ?, geslo_spremenjeno = NOW() WHERE id = ?')
                ->execute([password_hash($novo, PASSWORD_DEFAULT), $_SESSION['uporabnik_id']]);
            session_regenerate_id(true);
            $sporocilo = 'Geslo je bilo uspešno spremenjeno.';
        }
    }
}, false);

$prijavljen = zs_prijavljen();
$csrf = zs_csrf();
if ($stran !== 'geslo') {
    $stran = 'pregled';
}
?><!DOCTYPE html>
<html lang="sl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Statistika obiska · Društvo ZA SRCE</title>
    <link rel="stylesheet" href="slog.css?v=1">
</head>
<body>
<?php if (!$prijavljen): ?>
    <main class="prijava">
        <form method="post" class="kartica prijava-obrazec" autocomplete="on">
            <div class="znak" aria-hidden="true">♥</div>
            <h1>Statistika obiska</h1>
            <p class="podnaslov">Društvo za zdravje srca in ožilja Maribor</p>
            <?php if ($napaka): ?><p class="obvestilo napaka" role="alert"><?= zs_h($napaka) ?></p><?php endif; ?>
            <input type="hidden" name="akcija" value="prijava">
            <input type="hidden" name="csrf" value="<?= zs_h($csrf) ?>">
            <label>Uporabniško ime
                <input type="text" name="uporabnisko_ime" autocomplete="username" required autofocus>
            </label>
            <label>Geslo
                <input type="password" name="geslo" autocomplete="current-password" required>
            </label>
            <button type="submit" class="gumb glavni">Prijava</button>
        </form>
    </main>
<?php else: ?>
    <header class="glava">
        <div class="glava-notranja">
            <div class="blagovna">
                <span class="znak majhen" aria-hidden="true">♥</span>
                <div>
                    <strong>Statistika obiska</strong>
                    <span>Društvo ZA SRCE Maribor</span>
                </div>
            </div>
            <nav class="meni">
                <a href="./" class="<?= $stran === 'pregled' ? 'aktivno' : '' ?>">Pregled</a>
                <a href="?stran=geslo" class="<?= $stran === 'geslo' ? 'aktivno' : '' ?>">Spremeni geslo</a>
                <form method="post" class="odjava">
                    <input type="hidden" name="akcija" value="odjava">
                    <input type="hidden" name="csrf" value="<?= zs_h($csrf) ?>">
                    <button type="submit" class="povezava">Odjava (<?= zs_h($_SESSION['uporabnik_ime'] ?? '') ?>)</button>
                </form>
            </nav>
        </div>
    </header>

    <?php if ($stran === 'geslo'): ?>
    <main class="vsebina ozka">
        <form method="post" class="kartica" autocomplete="off">
            <h1>Spremeni geslo</h1>
            <p class="podnaslov">Geslo mora imeti vsaj 10 znakov ter vsebovati vsaj eno črko in eno številko.</p>
            <?php if ($napaka): ?><p class="obvestilo napaka" role="alert"><?= zs_h($napaka) ?></p><?php endif; ?>
            <?php if ($sporocilo): ?><p class="obvestilo uspeh" role="status"><?= zs_h($sporocilo) ?></p><?php endif; ?>
            <input type="hidden" name="akcija" value="geslo">
            <input type="hidden" name="csrf" value="<?= zs_h($csrf) ?>">
            <input type="text" name="uporabnisko_ime" value="<?= zs_h($_SESSION['uporabnik_ime'] ?? '') ?>" autocomplete="username" hidden>
            <label>Trenutno geslo
                <input type="password" name="staro_geslo" autocomplete="current-password" required>
            </label>
            <label>Novo geslo
                <input type="password" name="novo_geslo" autocomplete="new-password" minlength="10" required>
            </label>
            <label>Potrdi novo geslo
                <input type="password" name="potrditev_gesla" autocomplete="new-password" minlength="10" required>
            </label>
            <button type="submit" class="gumb glavni">Shrani novo geslo</button>
        </form>
    </main>
    <?php else: ?>
    <main class="vsebina" id="nadzorna">
        <section class="orodja" aria-label="Izbira obdobja">
            <div class="obdobja" role="group">
                <button type="button" data-dni="0">Danes</button>
                <button type="button" data-dni="7">7 dni</button>
                <button type="button" data-dni="30" class="aktivno">30 dni</button>
                <button type="button" data-dni="90">90 dni</button>
                <button type="button" data-dni="365">Leto</button>
            </div>
            <div class="poljubno">
                <label>Od <input type="date" id="od"></label>
                <label>Do <input type="date" id="do"></label>
                <button type="button" id="uporabi" class="gumb">Prikaži</button>
                <a id="izvoz" class="gumb" href="#">Izvozi CSV</a>
            </div>
        </section>

        <p id="stanje" class="stanje" role="status">Nalaganje …</p>

        <section class="kpi" id="kpi" aria-label="Ključni podatki"></section>

        <section class="kartica">
            <div class="naslov-vrstica">
                <h2>Obisk po dnevih</h2>
                <div class="legenda">
                    <span><i style="background:#c14141"></i>Obiskovalci</span>
                    <span><i style="background:#2f6db5"></i>Ogledi strani</span>
                </div>
            </div>
            <div class="graf"><canvas id="graf-dnevno" aria-label="Graf obiska po dnevih" role="img"></canvas></div>
        </section>

        <div class="mreza dve">
            <section class="kartica">
                <h2>Najbolj gledane strani</h2>
                <div class="tabela-ovoj"><table id="t-strani"></table></div>
            </section>
            <section class="kartica">
                <h2>Od kod pridejo obiskovalci</h2>
                <div id="d-vir" class="seznam"></div>
                <h3>Vstopne strani</h3>
                <div id="d-vstop" class="seznam"></div>
            </section>
        </div>

        <div class="mreza tri">
            <section class="kartica">
                <h2>Naprave</h2>
                <div id="d-naprava" class="seznam"></div>
            </section>
            <section class="kartica">
                <h2>Brskalniki</h2>
                <div id="d-brskalnik" class="seznam"></div>
            </section>
            <section class="kartica">
                <h2>Operacijski sistemi</h2>
                <div id="d-os" class="seznam"></div>
            </section>
        </div>

        <div class="mreza dve">
            <section class="kartica">
                <h2>Kliki</h2>
                <p class="opis">Telefon, e-pošta, dokumenti, Facebook, zemljevid in zunanje povezave.</p>
                <div id="d-klik" class="seznam"></div>
                <h3>Podrobno</h3>
                <div id="d-klik_cilj" class="seznam"></div>
            </section>
            <section class="kartica">
                <h2>Dejanja</h2>
                <h3>Oddani obrazci</h3>
                <div id="d-obrazec" class="seznam"></div>
                <h3>Vprašanja AI asistentu</h3>
                <div id="d-asistent" class="seznam"></div>
                <h3>Odziv na pasico piškotkov</h3>
                <div id="d-soglasje" class="seznam"></div>
            </section>
        </div>

        <div class="mreza dve">
            <section class="kartica">
                <h2>Ogledi po urah dneva</h2>
                <div class="graf nizek"><canvas id="graf-ure" aria-label="Graf ogledov po urah" role="img"></canvas></div>
            </section>
            <section class="kartica">
                <h2>Jezik brskalnika</h2>
                <div id="d-jezik" class="seznam"></div>
                <h3>Kampanje (UTM)</h3>
                <div id="d-utm" class="seznam"></div>
            </section>
        </div>

        <p class="noga">Statistika je anonimna: brez piškotkov in brez shranjevanja IP naslovov. »Obiskovalci« so šteti po dnevih – ista oseba, ki pride v dveh različnih dneh, je šteta dvakrat. Obiski s tega računalnika se po prijavi ne štejejo.</p>
    </main>
    <script src="chart.umd.min.js?v=4.5.1"></script>
    <script src="nadzorna.js?v=1"></script>
    <?php endif; ?>
<?php endif; ?>
</body>
</html>
