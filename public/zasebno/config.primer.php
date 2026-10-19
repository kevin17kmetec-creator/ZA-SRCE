<?php
// VORLAGE – diese Datei nach "config.php" (im selben Ordner) kopieren und ausfüllen.
// config.php ist in .gitignore eingetragen und darf NIE ins öffentliche Repository.

defined('ZS_JEDRO') || exit;

return [
    // MySQL-Datenbank (in der A1-Hosting-Verwaltung anlegen)
    'baza' => [
        'gostitelj' => 'localhost',
        'vrata'     => 3306,
        'ime'       => 'IME_BAZE',
        'uporabnik' => 'UPORABNIK_BAZE',
        'geslo'     => 'GESLO_BAZE',
    ],

    // Google Gemini (Schlüssel aus Google AI Studio)
    'gemini' => [
        'kljuc'           => 'TVOJ_GEMINI_API_KLJUC',
        'model'           => 'gemini-3-flash-preview',
        'omejitev_na_uro' => 20,   // max. Fragen pro Besucher und Stunde
        'omejitev_na_dan' => 500,  // max. Fragen insgesamt pro Tag (Kostenschutz)
    ],

    // Statistik
    'statistika' => [
        'hramba_dni' => 90, // Rohdaten so viele Tage behalten, danach nur noch Tageszusammenfassungen
    ],

    // Startbenutzer für das Dashboard (nur Passwort-Hashes, nie Klartext!).
    // Werden von namestitev.php einmalig angelegt, falls der Benutzer noch nicht existiert.
    // Hash erzeugen: php -r 'echo password_hash("NovoGeslo", PASSWORD_DEFAULT);'
    'zacetni_uporabniki' => [
        // 'UporabniskoIme' => '$2y$10$...',
    ],
];
