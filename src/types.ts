export type AdCategory = 'Cryptocurrency' | 'Marketing' | 'Technology' | 'E-commerce' | 'Local Services' | 'Real Estate' | 'General';

export interface Advertisement {
  id: string;
  title: string;
  category: AdCategory;
  message: string;
  videoUrl?: string; // e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or embed
  imageUrl?: string;
  authorName: string;
  contactMethod: 'whatsapp' | 'telegram' | 'phone' | 'email';
  contactValue: string;
  createdAt: string;
  isPreseeded?: boolean;
}

export interface CEOProfile {
  name: string;
  title: string;
  address: string;
  phone: string;
  telegram: string;
  whatsapp: string;
  email: string;
  companyName: string;
}
