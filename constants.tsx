
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
  { label: 'Novice', href: '/#news' },
  { label: 'Kontakt', href: '/#contact' },
];

export const LATEST_NEWS: NewsArticle[] = [
  {
    id: 1,
    title: "Brezplačne meritve krvnega tlaka v Mariboru",
    date: "15. Oktober 2023",
    summary: "Vabljeni na brezplačne meritve, ki bodo potekale to soboto na Glavnem trgu. Poskrbite za svoje zdravje!",
    image: "https://picsum.photos/800/600?random=1",
    category: "Dogodki"
  },
  {
    id: 2,
    title: "Nov urnik svetovalne pisarne",
    date: "10. Oktober 2023",
    summary: "Svetovalna pisarna bo v mesecu novembru odprta tudi ob sredah popoldan. Preverite nove termine.",
    image: "https://picsum.photos/800/600?random=2",
    category: "Novice"
  },
  {
    id: 3,
    title: "Pohod na Pohorje - Pridružite se nam!",
    date: "05. Oktober 2023",
    summary: "To nedeljo organiziramo tradicionalni jesenski pohod. Zbor ob 8.00 pri spodnji postaji vzpenjače.",
    image: "https://picsum.photos/800/600?random=3",
    category: "Rekreacija"
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
