
import React from 'react';
import {
  Layout,
  Smartphone,
  Settings,
  TrendingUp,
  Code2,
  Layers,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Service } from './types';
import cloudServerImage from './assets/cloud_server_bg.png';


export const SERVICES_DATA: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Bespoke high-performance web applications built with the latest modern frameworks.',
    icon: 'Layout',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    features: ['Responsive Design', 'SEO Optimization', 'E-commerce Integration', 'Progressive Web Apps'],
    tools: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
    benefits: ['Fast load speeds', 'Mobile-first experience', 'Easy content management']
  },
  {
    id: 'app-dev',
    title: 'App Development',
    description: 'Cross-platform mobile solutions that provide native performance and stunning UX.',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
    features: ['iOS & Android', 'Cloud Sync', 'Push Notifications', 'Offline Support'],
    tools: ['Flutter', 'React Native', 'Firebase', 'Supabase'],
    benefits: ['Wider market reach', 'Improved user engagement', 'Consistent performance']
  },
  {
    id: 'crm-erp',
    title: 'CRM / ERP Solutions',
    description: 'Streamline your business operations with custom-built internal management systems.',
    icon: 'Settings',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    features: ['Workflow Automation', 'Inventory Tracking', 'Customer Analytics', 'Role-based Access'],
    tools: ['Python', 'Django', 'PostgreSQL', 'GCP'],
    benefits: ['Operational efficiency', 'Data-driven decisions', 'Scalable growth']
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Grow your online presence with data-backed strategies and creative campaigns.',
    icon: 'TrendingUp',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    features: ['Social Media Management', 'PPC Campaigns', 'Content Strategy', 'Brand Identity'],
    tools: ['Google Ads', 'Meta Business', 'HubSpot', 'Ahrefs'],
    benefits: ['Higher conversion rates', 'Increased brand awareness', 'Transparent ROI']
  }
];

export const TECHNOLOGIES = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Custom Solutions',
    desc: 'We don\'t believe in one-size-fits-all. Every project is uniquely crafted.',
    icon: <Code2 className="text-green-500" />
  },
  {
    title: 'Scalable Architecture',
    desc: 'Systems that grow with you. We build for today and tomorrow.',
    icon: <Layers className="text-blue-500" />
  },
  {
    title: 'Secure & Reliable',
    desc: 'Enterprise-grade security and 99.9% uptime guaranteed.',
    icon: <ShieldCheck className="text-green-600" />
  }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: 'Scaling Your Startup with Cloud Native Tech',
    excerpt: 'Why adopting a cloud-native approach early can save you thousands in technical debt and infrastructure costs down the line.',
    content: [
      "In the fast-paced world of startups, speed is everything. But speed without stability is a recipe for disaster. That's where cloud-native technologies come in. By leveraging containerization, microservices, and serverless architectures from day one, startups can build systems that are not only resilient but also infinitely scalable.",
      "Traditional monolithic architectures often become bottlenecks as teams grow. A slight change in one part of the code can break the entire application. Cloud-native development decouples these components, allowing different teams to work on different features simultaneously without stepping on each other's toes.",
      "Moreover, cloud providers like AWS, Google Cloud, and Azure offer managed services that handle the heavy lifting of infrastructure. This means your engineering team can focus on what really matters: building features that delight your customers. The initial learning curve might be steeper, but the long-term payoff in reduced technical debt and operational capability is immense.",
      "Another critical advantage is cost optimization. With serverless computing and auto-scaling groups, you only pay for the resources you actually use. For a cash-strapped startup, this moves infrastructure costs from a fixed capital expenditure to a variable operating expense that scales with your user base.",
      "Finally, cloud-native tech enables continuous integration and continuous delivery (CI/CD). This automation allows you to deploy updates multiple times a day with confidence. In an era where user feedback loops need to be tight, the ability to iterate rapidly is a massive competitive advantage."
    ],
    date: 'Oct 15, 2025',
    image: cloudServerImage,
    category: 'Cloud Computing',
    author: 'Sarah Jenkins, CTO'
  },
  {
    id: 2,
    title: 'The Future of AI in Digital Marketing',
    excerpt: 'Artificial Intelligence isn\'t just a buzzword—it\'s rewriting the rules of customer engagement and content personalization.',
    content: [
      "Artificial Intelligence is no longer just a futuristic concept; it's the engine driving modern digital marketing. From predictive analytics to hyper-personalized content generation, AI is enabling brands to understand their customers on a level previously thought impossible.",
      "One of the most significant shifts is in customer segmentation. Instead of broad demographic buckets, AI algorithms can analyze user behavior in real-time to create dynamic segments. This allows for marketing messages that are timely, relevant, and highly effective.",
      "But it's not just about data. Generative AI is revolutionizing content creation. Tools that can write copy, generate images, and even produce video are empowering marketing teams to produce high-quality assets at scale. However, the human touch remains crucial. The future belongs to those who can blend the efficiency of AI with the empathy and creativity of human storytelling.",
      "We are also seeing a rise in conversational marketing powered by AI chatbots. These aren't the clunky, script-based bots of the past. Modern LLM-powered assistants can handle complex customer queries, recommend products, and facilitate transactions 24/7, effectively acting as an always-on sales team.",
      "Privacy, of course, remains a concern. As AI systems become more hungry for data, maintaining user trust is paramount. Future-forward companies are investing in privacy-preserving AI technologies that can deliver personalization without compromising individual user anonymity."
    ],
    date: 'Nov 02, 2025',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80',
    category: 'Artificial Intelligence',
    author: 'David Chen, Lead Data Scientist'
  },
  {
    id: 3,
    title: 'Why MVP Speed Matters for Funding',
    excerpt: 'Investors love traction. Learn how to build a Minimum Viable Product in weeks, not months, to secure your next round.',
    content: [
      "In the venture capital world, ideas are cheap. Execution is what counts. This is why getting to a Minimum Viable Product (MVP) quickly is often the difference between securing funding and fading into obscurity.",
      "An MVP isn't about shipping a buggy, incomplete product. It's about stripping away everything that isn't essential to the core value proposition. It's the smallest thing you can build that delivers value to the customer and proves your hypothesis.",
      "Speed matters because it buys you learning cycles. The faster you get your product into the hands of real users, the faster you get feedback. This feedback loop allows you to iterate and pivot before you run out of runway. Investors want to see that you can learn and adapt quickly. A functional MVP demonstrates that ability better than any pitch deck ever could.",
      "Furthermore, building an MVP forces you to prioritize. You have to make hard decisions about what features are truly necessary. This discipline is exactly what investors are looking for in a founding team—the ability to focus on the signal and ignore the noise.",
      "Remember, Reid Hoffman famously said, 'If you are not embarrassed by the first version of your product, you've launched too late.' The goal is not perfection; the goal is validation. Build fast, measure everything, and learn faster than your competition."
    ],
    date: 'Dec 10, 2025',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    category: 'Startup Growth',
    author: 'Michael Ross, Founder'
  }
];

import pravasyaImage from './assets/pravasya.png';
import azureParadiseImage from './assets/azure-paradise.png';
import luxNestImage from './assets/lux-nest.png';

export const DEMO_PROJECTS = [
  {
    title: 'Pravasya - Maharashtra Tourism',
    desc: 'Discover the beauty of Maharashtra with Pravasya. From Konkan beaches to Sahyadri forts – plan your perfect Maharashtra journey.',
    image: pravasyaImage,
    link: 'https://pravasya.vercel.app/'
  },
  {
    title: 'Azure Paradise Resort',
    desc: 'Experience the ultimate beachfront luxury at Azure Paradise Resort. World-class amenities, stunning ocean views, and unforgettable experiences await.',
    image: azureParadiseImage,
    link: 'https://azure-paradise-rkfa.vercel.app/'
  },
  {
    title: 'Rishabh Instruments',
    desc: 'Corporate website showcasing innovative instrumentation solutions and products.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    link: 'https://rishabh-instruments.netlify.app'
  },
  {
    title: 'LuxNest Realty',
    desc: 'Discover architectural masterpieces and luxury properties curated for the discerning few.',
    image: luxNestImage,
    link: 'https://lux-nest.vercel.app/'
  }
];
