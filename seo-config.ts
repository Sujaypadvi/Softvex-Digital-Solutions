// SEO Configuration
export const SEO_CONFIG = {
  // Site Information
  siteName: 'Softvex – Digital Tech Solutions',
  siteUrl: 'https://www.softvex.in', // Production URL
  defaultTitle: 'Softvex – Digital Tech Solutions | Web & App Development Company',
  defaultDescription: 'Softvex is a leading digital tech solutions company specializing in web development, mobile app development, CRM/ERP systems, and digital marketing. Transform your business with Softvex technology solutions.',
  defaultKeywords: 'Softvex, Softvex digital solutions, Softvex tech company, Softvex IT company, Softvex web development, Softvex app development, Softvex software company, Softvex technology, web development, app development, CRM solutions, ERP software, digital marketing, React, Next.js, Flutter, mobile apps, software development, tech solutions, custom software, IT solutions',

  // Social Media
  twitterHandle: '@softvex',

  // Company Information for Structured Data
  company: {
    name: 'Softvex Digital Solutions',
    alternateName: 'Softvex',
    legalName: 'Softvex Digital Tech Solutions',
    foundingDate: '2026',
    email: 'info@softvex.in',
    supportEmail: 'support@softvex.in',
    telephone: '+91-1234567890', // Update with actual phone
    address: {
      streetAddress: 'Your Street Address',
      addressLocality: 'Your City',
      addressRegion: 'Your State',
      postalCode: '123456',
      addressCountry: 'IN'
    },
    sameAs: [
      'https://www.linkedin.com/company/softvex-digital-solutions',
      'https://www.instagram.com/softvex.in?igsh=MWpheGQzbzRhaGVjOQ==',
      'https://www.facebook.com/profile.php?id=61588017277581'
    ]
  },

  // Default OpenGraph Image
  defaultImage: '/assets/og-image.png', // Create this image: 1200x630px

  // Author Information
  author: {
    name: 'Softvex Team',
    url: 'https://www.softvex.in/about'
  }
};

// Page-specific SEO data
export const PAGE_SEO = {
  home: {
    title: 'Softvex – Digital Tech Solutions | Web & App Development Company',
    description: 'Softvex is a leading digital tech solutions company. Expert web development, mobile apps, CRM/ERP systems, and digital marketing services. Transform your business with Softvex technology solutions.',
    keywords: 'Softvex, Softvex digital solutions, Softvex tech company, Softvex IT solutions, Softvex web development, Softvex app development, Softvex software, web development company, app development, digital solutions, software company, React, Next.js, Flutter, custom software development, IT company',
    image: '/assets/og-home.png'
  },
  about: {
    title: 'About Softvex – Leading Digital Tech Solutions Company',
    description: 'Learn about Softvex, a leading tech company with passionate engineers and designers building scalable digital solutions. Softvex bridges imagination and reality through innovative technology.',
    keywords: 'about Softvex, Softvex company, Softvex tech team, Softvex digital agency, Softvex IT company, who is Softvex, Softvex software company, software company, tech team, digital agency',
    image: '/assets/og-about.png'
  },
  services: {
    title: 'Softvex Services – Web Development, App Development & Digital Marketing',
    description: 'Explore Softvex comprehensive services: Web Development, Mobile App Development, CRM/ERP Solutions, and Digital Marketing. Softvex delivers custom technology solutions tailored to your business needs.',
    keywords: 'Softvex services, Softvex web development, Softvex app development, Softvex digital marketing, Softvex CRM, Softvex ERP, Softvex IT services, web development services, app development services, CRM solutions, ERP software, digital marketing services, custom software development',
    image: '/assets/og-services.png'
  },
  projects: {
    title: 'Softvex Portfolio – Our Work & Case Studies',
    description: 'Explore Softvex portfolio of successful projects. From tourism platforms to luxury resorts, see how Softvex helps businesses transform their digital presence with innovative tech solutions.',
    keywords: 'Softvex portfolio, Softvex projects, Softvex work, Softvex case studies, Softvex clients, portfolio, case studies, web projects, app projects, client work, Pravasya, Azure Paradise, successful projects',
    image: '/assets/og-projects.png'
  },
  blog: {
    title: 'Softvex Blog – Tech Insights, Tutorials & Industry News',
    description: 'Stay updated with the latest from Softvex on tech, digital marketing, and software development. Expert Softvex insights on cloud computing, AI, MVP development, and emerging technologies.',
    keywords: 'Softvex blog, Softvex tech insights, Softvex tutorials, Softvex news, tech blog, software development blog, digital marketing insights, cloud computing, AI, startup tips, technology articles',
    image: '/assets/og-blog.png'
  },
  contact: {
    title: 'Contact Softvex – Get in Touch with Our Tech Team',
    description: 'Ready to build your next digital product? Contact Softvex for a free consultation. Get in touch with Softvex experts to discuss your project and turn your ideas into reality.',
    keywords: 'contact Softvex, Softvex contact, get in touch with Softvex, Softvex consultation, Softvex inquiry, hire Softvex, reach Softvex, Softvex support, software consultation, project inquiry, hire developers, contact tech company',
    image: '/assets/og-contact.png'
  }
};
