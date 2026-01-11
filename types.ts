
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  tools: string[];
  benefits: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string[]; // Array of paragraphs for simplicity
  date: string;
  image: string;
  category: string;
  author: string;
}

export enum Page {
  Home = 'home',
  About = 'about',
  Services = 'services',
  Contact = 'contact',
  Blog = 'blog',
  BlogPost = 'blog-post'
}
