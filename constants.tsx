
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
    summary: "Vabljeni na brezplačne meritve, ki bodo potekale to soboto na Glavnem trgu. Poskrbite za svoje zdravje in se nam pridružite!",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Dogodki"
  },
  {
    id: 2,
    title: "Nov urnik svetovalne pisarne",
    date: "10. Oktober 2023",
    summary: "Svetovalna pisarna bo v mesecu novembru odprta tudi ob sredah popoldan. Preverite nove termine in se naročite na posvet.",
    image: "https://images.unsplash.com/photo-1454165833767-13143895604a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Novice"
  },
  {
    id: 3,
    title: "Pohod na Pohorje - Pridružite se nam!",
    date: "05. Oktober 2023",
    summary: "To nedeljo organiziramo tradicionalni jesenski pohod. Zbor ob 8.00 pri spodnji postaji vzpenjače. Primerno za vse stopnje pripravljenosti.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Rekreacija"
  },
  {
    id: 4,
    title: "Predavanje: Zdrava prehrana za zdravo srce",
    date: "28. September 2023",
    summary: "Dr. Blanka Vombergar bo v prostorih MF UM predavala o pomenu lokalne in sezonske prehrane pri preprečevanju srčno-žilnih bolezni.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Dogodki"
  },
  {
    id: 5,
    title: "Svetovni dan oživljanja: Tečaji TPO",
    date: "15. September 2023",
    summary: "Ali bi znali pomagati v nujnem primeru? Pridružite se nam na brezplačnem tečaju temeljnih postopkov oživljanja z uporabo AED.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Novice"
  },
  {
    id: 6,
    title: "Nove ugodnosti za člane društva",
    date: "01. September 2023",
    summary: "V sodelovanju z lokalnimi partnerji smo pripravili nove popuste za naše člane. Preverite posodobljen seznam ugodnosti.",
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
