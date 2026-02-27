
import React from 'react';
import { NavItem, NewsArticle, ProgramService } from './types';
import { Activity, Heart, Calendar, Users, FileText, Phone } from 'lucide-react';

// Flattened navigation structure
export const NAVIGATION_ITEMS: NavItem[] = [
  { label: 'Domov', href: '/' },
  { label: 'O društvu', href: '/o-drustvu' },
  { label: 'Dejavnost', href: '/dejavnost' },
  { label: 'Članstvo', href: '/clanstvo' },
  { label: 'Projekti', href: '/projekti' },
  { label: 'Fundacija', href: '/fundacija' },
  { label: 'Publikacije', href: '/publikacije' },
  { label: 'Minute za srce', href: '/minute-za-srce' },
  { label: 'Galerija', href: '/galerija' },
  { label: 'Novice', href: '/novice' },
  { label: 'Kontakt', href: '/#contact' },
];

export const LATEST_NEWS: NewsArticle[] = [
  {
    id: 1,
    title: "Brezplačne meritve krvnega tlaka v Mariboru",
    date: "15. Oktober 2023",
    summary: "Vabljeni na brezplačne meritve, ki bodo potekale to soboto na Glavnem trgu. Poskrbite za svoje zdravje in se nam pridružite! Na voljo bodo tudi strokovnjaki za posvet o vaših izvidih in splošnem počutju. Ne zamudite priložnosti za brezplačen pregled.",
    content: "Vabljeni na brezplačne meritve, ki bodo potekale to soboto na Glavnem trgu. Poskrbite za svoje zdravje in se nam pridružite! Na voljo bodo tudi strokovnjaki za posvet o vaših izvidih in splošnem počutju. Ne zamudite priložnosti za brezplačen pregled. \n\nMeritve bodo potekale od 8.00 do 12.00 ure. Merili bomo krvni tlak, krvni sladkor in holesterol. Zaželeno je, da pridete na tešče za bolj točne rezultate meritev sladkorja in holesterola. S seboj prinesite kartico zdravstvenega zavarovanja. \n\nPoleg meritev bomo delili tudi preventivno gradivo o zdravem načinu življenja, pravilni prehrani in pomenu gibanja. Naši prostovoljci vam bodo z veseljem odgovorili na vsa vprašanja.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Dogodki"
  },
  {
    id: 2,
    title: "Nov urnik svetovalne pisarne",
    date: "10. Oktober 2023",
    summary: "Svetovalna pisarna bo v mesecu novembru odprta tudi ob sredah popoldan. Preverite nove termine in se naročite na posvet. Zaradi povečanega zanimanja smo se odločili razširiti naše uradne ure, da bomo lažje dosegljivi za vse vas.",
    content: "Svetovalna pisarna bo v mesecu novembru odprta tudi ob sredah popoldan. Preverite nove termine in se naročite na posvet. Zaradi povečanega zanimanja smo se odločili razširiti naše uradne ure, da bomo lažje dosegljivi za vse vas. \n\nNovi urnik:\n- Ponedeljek: 9:00 - 12:00\n- Sreda: 14:00 - 17:00\n- Petek: 9:00 - 12:00\n\nZa obisk se je potrebno predhodno naročiti po telefonu 02 228 22 63 ali preko e-pošte. Svetovanje je za člane društva brezplačno, za nečlane pa je na voljo po simbolični ceni.",
    image: "https://images.unsplash.com/photo-1454165833767-13143895604a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Novice"
  },
  {
    id: 3,
    title: "Pohod na Pohorje - Pridružite se nam!",
    date: "05. Oktober 2023",
    summary: "To nedeljo organiziramo tradicionalni jesenski pohod. Zbor ob 8.00 pri spodnji postaji vzpenjače. Primerno za vse stopnje pripravljenosti. Pot nas bo vodila po senčnih poteh do Bellevueja, kjer bo krajši postanek za osvežitev in druženje.",
    content: "To nedeljo organiziramo tradicionalni jesenski pohod. Zbor ob 8.00 pri spodnji postaji vzpenjače. Primerno za vse stopnje pripravljenosti. Pot nas bo vodila po senčnih poteh do Bellevueja, kjer bo krajši postanek za osvežitev in druženje. \n\nHodili bomo v zmernem tempu, prilagojenem skupini. Priporočamo pohodno obutev in palice. V primeru zelo slabega vremena pohod odpade, o čemer vas bomo obvestili na naši Facebook strani in spletni strani. \n\nUdeležba je na lastno odgovornost. Vabljeni vsi ljubitelji narave in gibanja!",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Rekreacija"
  },
  {
    id: 4,
    title: "Predavanje: Zdrava prehrana za zdravo srce",
    date: "28. September 2023",
    summary: "Dr. Blanka Vombergar bo v prostorih MF UM predavala o pomenu lokalne in sezonske prehrane pri preprečevanju srčno-žilnih bolezni. Izvedeli boste, katera živila so najboljša za vaše srce in kako jih vključiti v vsakodnevni jedilnik.",
    content: "Dr. Blanka Vombergar bo v prostorih MF UM predavala o pomenu lokalne in sezonske prehrane pri preprečevanju srčno-žilnih bolezni. Izvedeli boste, katera živila so najboljša za vaše srce in kako jih vključiti v vsakodnevni jedilnik. \n\nPredavanje bo zajemalo teme:\n- Maščobe: katere so dobre in katere slabe?\n- Pomen vlaknin in antioksidantov\n- Kako zmanjšati vnos soli\n- Praktični primeri zdravih obrokov\n\nVstop je prost. Vabljeni!",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Dogodki"
  },
  {
    id: 5,
    title: "Svetovni dan oživljanja: Tečaji TPO",
    date: "15. September 2023",
    summary: "Ali bi znali pomagati v nujnem primeru? Pridružite se nam na brezplačnem tečaju temeljnih postopkov oživljanja z uporabo AED. Naučili se boste pravilnega pristopa k ponesrečencu, masaže srca in uporabe defibrilatorja.",
    content: "Ali bi znali pomagati v nujnem primeru? Pridružite se nam na brezplačnem tečaju temeljnih postopkov oživljanja z uporabo AED. Naučili se boste pravilnega pristopa k ponesrečencu, masaže srca in uporabe defibrilatorja. \n\nZnanje oživljanja rešuje življenja. Srčni zastoj se lahko zgodi kjerkoli in kadarkoli. Prve minute so ključne. Na tečaju boste vadili na lutkah in se seznanili z delovanjem avtomatskega eksternega defibrilatorja (AED). \n\nTečaj je primeren za vse starosti. Prijave zbiramo do zapolnitve mest.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Novice"
  },
  {
    id: 6,
    title: "Nove ugodnosti za člane društva",
    date: "01. September 2023",
    summary: "V sodelovanju z lokalnimi partnerji smo pripravili nove popuste za naše člane. Preverite posodobljen seznam ugodnosti. Med novostmi so popusti pri nakupu športne opreme, vstopnice za bazene in ugodnosti v izbranih lekarnah.",
    content: "V sodelovanju z lokalnimi partnerji smo pripravili nove popuste za naše člane. Preverite posodobljen seznam ugodnosti. Med novostmi so popusti pri nakupu športne opreme, vstopnice za bazene in ugodnosti v izbranih lekarnah. \n\nCeloten seznam ugodnosti si lahko ogledate na naši spletni strani v zavihku 'Ugodnosti' ali pa ga prevzamete v naši pisarni. Za koriščenje popustov je potrebno predložiti veljavno člansko izkaznico za tekoče leto. \n\nČe še niste član, vas vabimo k včlanitvi!",
    image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Nasveti"
  }
];

export const PROGRAMS: ProgramService[] = [
  {
    title: "Preventivne Meritve",
    description: "Redno merjenje krvnega tlaka, holesterola in sladkorja v krvi je ključno za zgodnje odkrivanje bolezni.",
    icon: "Activity",
    action: "Urnik meritev"
  },
  {
    title: "Svetovalna Pisarna",
    description: "Individualni posveti s strokovnjaki o zdravem življenjskem slogu in obvladovanju tveganj.",
    icon: "Heart",
    action: "Naročite se"
  },
  {
    title: "Organizirana Rekreacija",
    description: "Tedenski pohodi in vadbe pod strokovnim vodstvom za krepitev srca in ožilja.",
    icon: "Users",
    action: "Koledar vadb"
  }
];

export const CONTACT_INFO = {
  address: "Pobreška cesta 8, 2000 Maribor",
  phone: "02 228 22 63",
  fax: "02 228 22 64",
  email: "tajnistvo@zasrce-mb.si",
  hours: "Ponedeljek: 9:00 - 12:00, Sreda: 9:00 - 14:00"
};
