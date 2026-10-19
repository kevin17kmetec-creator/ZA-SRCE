// Dashboard-Logik: lädt die Daten von podatki.php und stellt sie dar.
(function () {
    'use strict';

    // Lesbare Namen für die Seitenpfade der Webseite
    var IMENA_STRANI = {
        '/': 'Prva stran',
        '/clanstvo': 'Članstvo',
        '/o-drustvu': 'O društvu',
        '/posvetovalnica': 'Posvetovalnica',
        '/glezenjski-indeks': 'Gleženjski indeks',
        '/ugodnosti': 'Ugodnosti za člane',
        '/dejavnost': 'Dejavnost',
        '/aritmije': 'Iskanje aritmij',
        '/cenik': 'Cenik',
        '/projekti': 'Projekti',
        '/fundacija': 'Fundacija',
        '/publikacije': 'Publikacije',
        '/publikacija': 'Objave v Večeru',
        '/objave-vecer': 'Objave v Večeru',
        '/minute-za-srce': 'Minute za srce',
        '/video-predvajalnik': 'Video predvajalnik',
        '/galerija': 'Galerija',
        '/novice': 'Novice',
        '/urnik-meritev': 'Urnik meritev',
        '/predavanja': 'Predavanja',
        '/koledar-vadb': 'Koledar vadb',
        '/privacy-policy': 'Politika zasebnosti',
        '/terms-conditions': 'Splošni pogoji',
        '/legal-notice': 'Pravno obvestilo',
        '/accessibility': 'Dostopnost',
        '/kontakt': 'Kontakt'
    };

    var IMENA_VREDNOSTI = {
        sprejeto: 'Sprejeto',
        zavrnjeno: 'Zavrnjeno',
        'vprašanje': 'Zastavljena vprašanja',
        kontakt: 'Kontaktni obrazec',
        'članstvo': 'Pristopna izjava (članstvo)',
        '(neposredno)': 'Neposredno / zaznamek',
        'računalnik': 'Računalnik',
        mobilnik: 'Mobilni telefon',
        tablica: 'Tablica'
    };

    var JEZIKI = { sl: 'slovenščina', en: 'angleščina', de: 'nemščina', hr: 'hrvaščina', it: 'italijanščina', sr: 'srbščina', hu: 'madžarščina', bs: 'bosanščina' };

    var $ = function (id) { return document.getElementById(id); };
    var stevilka = new Intl.NumberFormat('sl-SI');
    var grafDnevno = null;
    var grafUre = null;

    function imeStrani(pot) {
        if (IMENA_STRANI[pot]) return IMENA_STRANI[pot];
        var m = pot.match(/^\/novica\/(\d+)/);
        if (m) return 'Novica #' + m[1];
        if (pot.indexOf('/publikacija/') === 0) return 'Publikacija';
        return pot;
    }

    function trajanje(sekunde) {
        sekunde = Math.round(sekunde || 0);
        if (sekunde < 60) return sekunde + ' s';
        var min = Math.floor(sekunde / 60);
        var s = sekunde % 60;
        return min + ' min ' + (s < 10 ? '0' : '') + s + ' s';
    }

    function datum(d) {
        var p = d.split('-');
        return Number(p[2]) + '. ' + Number(p[1]) + '.';
    }

    function isoDatum(dan) {
        var y = dan.getFullYear();
        var m = String(dan.getMonth() + 1).padStart(2, '0');
        var d = String(dan.getDate()).padStart(2, '0');
        return y + '-' + m + '-' + d;
    }

    function element(oznaka, razred, besedilo) {
        var el = document.createElement(oznaka);
        if (razred) el.className = razred;
        if (besedilo !== undefined) el.textContent = besedilo;
        return el;
    }

    // ---------------------------------------------------------------- Kennzahlen
    function izrisiKpi(p) {
        var s = p.skupaj;
        var pr = p.prej;
        var kartice = [
            { oznaka: 'Obiskovalci', v: s.obiskovalci, prej: pr.obiskovalci, obl: stevilka.format(s.obiskovalci) },
            { oznaka: 'Obiski', v: s.seje, prej: pr.seje, obl: stevilka.format(s.seje) },
            { oznaka: 'Ogledi strani', v: s.ogledi, prej: pr.ogledi, obl: stevilka.format(s.ogledi) },
            {
                oznaka: 'Povp. trajanje obiska',
                v: s.seje ? s.cas_skupaj / s.seje : 0,
                prej: pr.seje ? pr.cas_skupaj / pr.seje : 0,
                obl: trajanje(s.seje ? s.cas_skupaj / s.seje : 0)
            },
            {
                oznaka: 'Strani na obisk',
                v: s.seje ? s.ogledi / s.seje : 0,
                prej: pr.seje ? pr.ogledi / pr.seje : 0,
                obl: (s.seje ? s.ogledi / s.seje : 0).toLocaleString('sl-SI', { maximumFractionDigits: 1 })
            },
            {
                oznaka: 'Stopnja odboja',
                v: s.seje ? s.odboji / s.seje : 0,
                prej: pr.seje ? pr.odboji / pr.seje : 0,
                obl: Math.round(s.seje ? (s.odboji / s.seje) * 100 : 0) + ' %',
                obratno: true
            }
        ];

        var ovoj = $('kpi');
        ovoj.innerHTML = '';
        kartice.forEach(function (k) {
            var kartica = element('div', 'kartica');
            kartica.appendChild(element('div', 'oznaka', k.oznaka));
            kartica.appendChild(element('div', 'vrednost', k.obl));
            var opis = 'brez primerjave';
            var razred = 'sprememba';
            if (k.prej > 0) {
                var odstotek = Math.round(((k.v - k.prej) / k.prej) * 100);
                var boljse = k.obratno ? odstotek < 0 : odstotek > 0;
                razred += odstotek === 0 ? '' : (boljse ? ' gor' : ' dol');
                opis = (odstotek > 0 ? '▲ +' : odstotek < 0 ? '▼ ' : '') + odstotek + ' % glede na prejšnje obdobje';
            }
            kartica.appendChild(element('div', razred, opis));
            ovoj.appendChild(kartica);
        });
    }

    // ---------------------------------------------------------------- Diagramme
    function osnovneMoznosti() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0f172a',
                    padding: 10,
                    cornerRadius: 8,
                    titleFont: { weight: '600' },
                    boxPadding: 4
                }
            },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#64748b', maxRotation: 0, autoSkip: true, maxTicksLimit: 10 }, border: { color: '#d6d3cd' } },
                y: { beginAtZero: true, grid: { color: '#eeece8' }, ticks: { color: '#64748b', precision: 0 }, border: { display: false } }
            }
        };
    }

    function izrisiDnevno(p) {
        var oznake = p.dnevno.map(function (d) { return datum(d.dan); });
        var podatki = {
            labels: oznake,
            datasets: [
                { label: 'Obiskovalci', data: p.dnevno.map(function (d) { return d.obiskovalci; }), borderColor: '#c14141', backgroundColor: '#c14141', borderWidth: 2, pointRadius: p.dnevno.length > 45 ? 0 : 3, pointHoverRadius: 5, tension: 0.25 },
                { label: 'Ogledi strani', data: p.dnevno.map(function (d) { return d.ogledi; }), borderColor: '#2f6db5', backgroundColor: '#2f6db5', borderWidth: 2, pointRadius: p.dnevno.length > 45 ? 0 : 3, pointHoverRadius: 5, tension: 0.25 }
            ]
        };
        if (grafDnevno) grafDnevno.destroy();
        grafDnevno = new Chart($('graf-dnevno'), { type: 'line', data: podatki, options: osnovneMoznosti() });
    }

    function izrisiUre(p) {
        var ure = new Array(24).fill(0);
        (p.dimenzije.ura || []).forEach(function (u) { ure[parseInt(u.vrednost, 10)] = u.stevilo; });
        var moznosti = osnovneMoznosti();
        moznosti.scales.x.ticks.maxTicksLimit = 12;
        if (grafUre) grafUre.destroy();
        grafUre = new Chart($('graf-ure'), {
            type: 'bar',
            data: {
                labels: ure.map(function (_, i) { return i + ':00'; }),
                datasets: [{ label: 'Ogledi', data: ure, backgroundColor: '#c14141', borderRadius: 4, borderSkipped: 'bottom', maxBarThickness: 18 }]
            },
            options: moznosti
        });
    }

    // ---------------------------------------------------------------- Listen
    function izrisiSeznam(id, seznam, preimenuj) {
        var ovoj = $(id);
        if (!ovoj) return;
        ovoj.innerHTML = '';
        if (!seznam || !seznam.length) {
            ovoj.appendChild(element('div', 'prazno', 'Ni podatkov za izbrano obdobje.'));
            return;
        }
        var skupaj = seznam.reduce(function (a, b) { return a + b.stevilo; }, 0);
        var najvec = seznam[0].stevilo || 1;
        seznam.slice(0, 12).forEach(function (vr) {
            var vrstica = element('div', 'vrstica');
            var trak = element('span', 'trak');
            trak.style.width = Math.max(2, (vr.stevilo / najvec) * 100) + '%';
            var ime = preimenuj ? preimenuj(vr.vrednost) : vr.vrednost;
            var imeEl = element('span', 'ime', ime);
            imeEl.title = vr.vrednost;
            var st = element('span', 'st', stevilka.format(vr.stevilo));
            st.appendChild(element('small', '', Math.round((vr.stevilo / skupaj) * 100) + ' %'));
            vrstica.appendChild(trak);
            vrstica.appendChild(imeEl);
            vrstica.appendChild(st);
            ovoj.appendChild(vrstica);
        });
    }

    function izrisiStrani(strani) {
        var t = $('t-strani');
        t.innerHTML = '';
        var glava = element('tr');
        [['Stran', ''], ['Ogledi', 'st'], ['Povp. čas', 'st'], ['Prebrano', 'st']].forEach(function (s) {
            glava.appendChild(element('th', s[1], s[0]));
        });
        var thead = element('thead');
        thead.appendChild(glava);
        t.appendChild(thead);
        var telo = element('tbody');
        if (!strani.length) {
            var tr = element('tr');
            var td = element('td', 'prazno', 'Ni podatkov za izbrano obdobje.');
            td.colSpan = 4;
            tr.appendChild(td);
            telo.appendChild(tr);
        }
        strani.slice(0, 20).forEach(function (s) {
            var tr = element('tr');
            var ime = element('td');
            ime.appendChild(document.createTextNode(imeStrani(s.pot)));
            ime.appendChild(element('span', 'pot', s.pot));
            tr.appendChild(ime);
            tr.appendChild(element('td', 'st', stevilka.format(s.ogledi)));
            tr.appendChild(element('td', 'st', trajanje(s.povp_cas)));
            tr.appendChild(element('td', 'st', s.povp_pomik === null ? '–' : s.povp_pomik + ' %'));
            telo.appendChild(tr);
        });
        t.appendChild(telo);
    }

    // ---------------------------------------------------------------- Laden
    var trenutno = { od: null, do: null };

    function nalozi(od, doDatum) {
        trenutno = { od: od, do: doDatum };
        $('od').value = od;
        $('do').value = doDatum;
        $('izvoz').href = 'podatki.php?izvoz=csv&od=' + od + '&do=' + doDatum;
        $('stanje').textContent = 'Nalaganje …';

        fetch('podatki.php?od=' + od + '&do=' + doDatum, { credentials: 'same-origin' })
            .then(function (r) {
                if (r.status === 401) { window.location.href = './'; throw new Error('prijava'); }
                if (!r.ok) throw new Error('Napaka ' + r.status);
                return r.json();
            })
            .then(function (p) {
                izrisiKpi(p);
                izrisiDnevno(p);
                izrisiUre(p);
                izrisiStrani(p.strani);
                var d = p.dimenzije;
                izrisiSeznam('d-vir', d.vir, function (v) { return IMENA_VREDNOSTI[v] || v; });
                izrisiSeznam('d-vstop', d.vstop, imeStrani);
                izrisiSeznam('d-naprava', d.naprava, function (v) { return IMENA_VREDNOSTI[v] || v; });
                izrisiSeznam('d-brskalnik', d.brskalnik);
                izrisiSeznam('d-os', d.os);
                izrisiSeznam('d-klik', d.klik);
                izrisiSeznam('d-klik_cilj', d.klik_cilj);
                izrisiSeznam('d-obrazec', d.obrazec, function (v) { return IMENA_VREDNOSTI[v] || v; });
                izrisiSeznam('d-asistent', d.asistent, function (v) { return IMENA_VREDNOSTI[v] || v; });
                izrisiSeznam('d-soglasje', d.soglasje, function (v) { return IMENA_VREDNOSTI[v] || v; });
                izrisiSeznam('d-jezik', d.jezik, function (v) { return JEZIKI[v] ? JEZIKI[v] + ' (' + v + ')' : v; });
                izrisiSeznam('d-utm', d.utm);
                $('stanje').textContent = 'Obdobje: ' + datum(p.od) + p.od.slice(0, 4) + ' – ' + datum(p.do) + p.do.slice(0, 4)
                    + ' (' + p.dni + (p.dni === 1 ? ' dan' : p.dni === 2 ? ' dneva' : (p.dni === 3 || p.dni === 4) ? ' dnevi' : ' dni') + ')';
            })
            .catch(function (e) {
                if (e.message !== 'prijava') $('stanje').textContent = 'Podatkov ni bilo mogoče naložiti. Osvežite stran.';
            });
    }

    function izberiZadnjihDni(dni) {
        var danes = new Date();
        var od = new Date();
        od.setDate(danes.getDate() - Math.max(0, dni - 1));
        nalozi(isoDatum(od), isoDatum(danes));
    }

    document.querySelectorAll('.obdobja button').forEach(function (gumb) {
        gumb.addEventListener('click', function () {
            document.querySelectorAll('.obdobja button').forEach(function (b) { b.classList.remove('aktivno'); });
            gumb.classList.add('aktivno');
            izberiZadnjihDni(parseInt(gumb.getAttribute('data-dni'), 10));
        });
    });

    $('uporabi').addEventListener('click', function () {
        if (!$('od').value || !$('do').value) return;
        document.querySelectorAll('.obdobja button').forEach(function (b) { b.classList.remove('aktivno'); });
        nalozi($('od').value, $('do').value);
    });

    izberiZadnjihDni(30);
})();
