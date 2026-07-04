import { Advertisement, CEOProfile } from './types';

export const companyCEOProfile: CEOProfile = {
  name: "Gavin Edwards",
  title: "Owner, Founder & C.E.O",
  address: "Westmoreland, Jamaica",
  phone: "+18762376194",
  telegram: "Drgnba1mba1",
  whatsapp: "+18762376194",
  email: "chesendonetwork@gmail.com",
  companyName: "Chesendo Network"
};

export const preseededAds: Advertisement[] = [
  {
    id: "preseeded-knew-project",
    title: "Knew Project Partner Registration - Worldwide Global Digital Network",
    category: "Cryptocurrency",
    message: "Become part of a growing worldwide digital network using blockchain technology and USDT transactions for fast global payments and opportunities. Start your journey today by registering through our official partner link below. This connects you directly to a trusted blockchain community that allows instant remittances and decentralized ledger participation. Join us world wide!",
    videoUrl: "https://www.youtube.com/watch?v=2TveHIn0xY0", // Standard informative blockchain video URL
    authorName: "Gavin Edwards (C.E.O)",
    contactMethod: "whatsapp",
    contactValue: "+18762376194",
    createdAt: "2026-07-01T12:00:00Z",
    isPreseeded: true
  },
  {
    id: "preseeded-ai-mentor",
    title: "The Official Knew Project AI Mentor is Now Live!",
    category: "Technology",
    message: "Community announcement: The official AI Mentor of Knew Project is now live and accessible to everyone as an advanced marketing and educational tool!\n\nWe encourage everyone to start using it creatively across different social media platforms such as Facebook, Instagram Reels, TikTok, YouTube Shorts, and Live demonstrations. Record yourself interacting with the AI Mentor, asking questions, showing how it works, and sharing the experience with your audience. This creates massive curiosity and helps people discover the global blockchain vision behind Knew Project in a unique, interactive way.\n\nNow let's get creative and put this tool to work! Click the button or go to: https://kp-ai-mentor.vercel.app/",
    authorName: "Gavin Edwards (C.E.O)",
    contactMethod: "whatsapp",
    contactValue: "+18762376194",
    createdAt: "2026-07-03T14:00:00Z",
    isPreseeded: true
  },
  {
    id: "preseeded-joel-prophecy",
    title: "Prophecy & Mathematics: The Calculated Structure of the Year 2026",
    category: "Technology",
    message: "As a Calculated Mathematical Engineer, I structure the systems of 2026 with a profound truth: a significant portion of the prophetic knowledge inside the biblical Book of Joel has already been fulfilled. Joel 2 speaks of an era of unprecedented light breaking through darkness, where technical streams of knowledge pour out upon the earth. Cryptography, decentralized ledgers, and secure mathematical structures are the practical execution of this global alignment. Connect with us to study how mathematical logic and theological timeline sync perfectly in 2026.",
    authorName: "Gavin Edwards (C.E.O)",
    contactMethod: "telegram",
    contactValue: "Drgnba1mba1",
    createdAt: "2026-07-02T10:00:00Z",
    isPreseeded: true
  },
  {
    id: "preseeded-chesendo-marketing",
    title: "Chesendo Network Global Advertising & Consulting Solutions",
    category: "Marketing",
    message: "We empower other businesses to fully understand what products, services, and digital advertisements are available across the globe. Through our consultative programs, you will learn how to leverage decentralized USDT payments, target specific advertising markets, or become an active stakeholder in high-performance digital projects. Let Chesendo Network craft your promotional campaigns for the year 2026.",
    videoUrl: "https://youtu.be/YmPJ82V9Ut4?si=oPftJvJeJgeNJ6cf", // Blockchain digital marketing overview video
    authorName: "Gavin Edwards (C.E.O)",
    contactMethod: "email",
    contactValue: "chesendonetwork@gmail.com",
    createdAt: "2026-06-30T15:30:00Z",
    isPreseeded: true
  }
];

export const categoriesList = [
  "Cryptocurrency",
  "Marketing",
  "Technology",
  "E-commerce",
  "Local Services",
  "Real Estate",
  "General"
] as const;
