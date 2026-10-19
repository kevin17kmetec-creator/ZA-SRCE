# Statistika obiska in popravki – navodila za namestitev na A1

## Kaj je novo

| Datoteka | Namen |
|---|---|
| `services/analyticsService.ts` | Anonimno beleženje ogledov, časa na strani, pomika in klikov (brez piškotkov) |
| `services/consentService.ts`, `components/ZunanjaVsebina.tsx` | Pasica piškotkov zdaj res blokira Google zemljevid in RTV video do soglasja |
| `services/geminiService.ts` | AI asistent ne vsebuje več API ključa v brskalniku |
| `public/api/collect.php` | Sprejema statistične dogodke |
| `public/api/gemini.php` | Strežniški posrednik za Gemini (ključ ostane na strežniku) |
| `public/api/pdf.php` | PDF-ji iz Google Drive (stari `/api/pdf` na A1 ni deloval, ker je bil Node.js) |
| `public/statistika/` | Nadzorna plošča s prijavo in menjavo gesla |
| `public/zasebno/` | Skupna koda in predloga nastavitev – zaklenjeno z `.htaccess` (`config.php` se naloži ročno) |
| `public/.htaccess` | Usmerjanje za React stran + zaščita mape `zasebno` |

`poslji_podatke.php` ni spremenjen in **ni** del builda – na strežniku ostane tvoja obstoječa verzija (z Brevo ključem).

## 1. Pripravi ključ in config.php (samo enkrat)

Baze ni treba ustvarjati: statistika uporablja **SQLite** (ena datoteka), ki jo PHP sam ustvari v zaščiteni mapi `zasebno/podatki/` ob prvem obisku.

1. V [Google AI Studio](https://aistudio.google.com/apikey) ustvari **nov** Gemini API ključ in **izbriši starega** (stari je bil viden v JavaScript datoteki na spletni strani).
2. `config.php` **ni v repozitoriju** (repozitorij je javen). Vzemi datoteko, ki ti jo je poslal razvijalec, ali kopijo `public/zasebno/config.primer.php`, vpiši Gemini ključ in jo s FileZillo naloži na strežnik v mapo **`zasebno/`** (poleg `jedro.php`). Ker je ni v buildu, je kasnejši prenosi nikoli ne prepišejo.

## 2. Build v Cursorju

Prenesi ZIP z GitHuba, razširi ga, odpri mapo v Cursorju in v terminalu zaženi:

```bash
npm install
npm run build:a1
```

Rezultat je v mapi `dist/`.

## 3. Prenos s FileZillo

1. V FileZilli vklopi prikaz skritih datotek: **Strežnik → Vsili prikaz skritih datotek**.
2. Na strežniku **izbriši vsebino mape `assets/`** (stara JS datoteka vsebuje stari Gemini ključ in bi ostala dosegljiva).
3. Prenesi **celotno vsebino** mape `dist/` (tudi `.htaccess`, `api/`, `statistika/`, `zasebno/`, `assets/`) v korensko mapo strežnika, kjer je `index.html`. Ob vprašanju izberi »Prepiši«.
4. `poslji_podatke.php` in `favicon.ico` ostaneta na strežniku nespremenjena (nista del builda). Strežniške verzije `poslji_podatke.php` **nikoli ne dodaj v repozitorij**, ker vsebuje Brevo ključ.
5. Novi `.htaccess` že vsebuje vsa pravila starega, zato ga lahko brez skrbi prepišeš.

## 4. Namestitev in prijava

1. Odpri `https://www.zasrce-mb.si/statistika/namestitev.php` – vse vrstice morajo imeti ✓.
2. Nadzorna plošča: `https://www.zasrce-mb.si/statistika/`

Uporabnika sta `ZASRCE` (društvo) in `Admin`. Začetnih gesel namenoma ni v tej datoteki, ker je repozitorij javen.

Gesli spremenite v nadzorni plošči pod **Spremeni geslo**.

## 5. Preizkus

- Po prijavi se obiski z **tega brskalnika** ne štejejo več (da društvo ne šteje samega sebe). Za test odpri stran na telefonu ali v drugem brskalniku, nato v nadzorni plošči izberi **Danes**.
- AI asistent: zastavi vprašanje na spletni strani.
- Kontakt: zemljevid mora biti skrit, dokler ne klikneš »Prikaži vsebino« ali v pasici »Sprejmi«.

## Varnost in varnostna kopija

- Vsi statistični podatki in uporabniki so v datoteki `zasebno/podatki/statistika.sqlite` na strežniku. Mape `zasebno/podatki/` **nikoli ne briši** pri nalaganju nove verzije. Za varnostno kopijo jo občasno prenesi s FileZillo na računalnik.

- `public/zasebno/config.php` je v `.gitignore` – nikoli ga ne objavi na GitHub (repozitorij je javen).
- Mapa `zasebno` je s strežnika nedostopna (vrne 403).
- Prijava: po 5 napačnih poskusih zaklep za 15 minut; odjava po 2 urah neaktivnosti.
- Podrobni zapisi se hranijo 90 dni (nastavljivo v `config.php`), zbirni dnevni podatki trajno.
