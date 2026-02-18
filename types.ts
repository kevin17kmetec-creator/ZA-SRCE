
export type PageType = 'home' | 'clanstvo' | 'o-drustvu' | 'posvetovalnica' | 'glezenjski-indeks' | 'ugodnosti' | 'dejavnost' | 'aritmije' | 'cenik' | 'projekti' | 'fundacija' | 'publikacije' | 'objave-vecer' | 'minute-za-srce' | 'galerija';

export interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  summary: string;
  image: string;
  category: 'Novice' | 'Dogodki' | 'Nasveti' | 'Rekreacija';
}

export interface ProgramService {
  title: string;
  description: string;
  icon: string;
  action: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
