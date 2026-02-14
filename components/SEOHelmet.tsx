import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG } from '../seo-config';

interface SEOHelmetProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    type?: 'website' | 'article';
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    article?: boolean;
    structuredData?: object;
}

const SEOHelmet: React.FC<SEOHelmetProps> = ({
    title,
    description,
    keywords,
    image,
    type = 'website',
    author,
    publishedTime,
    modifiedTime,
    structuredData
}) => {
    const location = useLocation();

    // Construct full URL for canonical and og:url
    const canonicalUrl = `${SEO_CONFIG.siteUrl}${location.pathname}`;

    // Use provided values or fall back to defaults
    const pageTitle = title || SEO_CONFIG.defaultTitle;
    const pageDescription = description || SEO_CONFIG.defaultDescription;
    const pageKeywords = keywords || SEO_CONFIG.defaultKeywords;
    const pageImage = image ? `${SEO_CONFIG.siteUrl}${image}` : `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultImage}`;

    useEffect(() => {
        // Update document title
        document.title = pageTitle;

        // Helper function to set or update meta tags
        const setMetaTag = (attribute: string, value: string, content: string) => {
            let element = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement;

            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, value);
                document.head.appendChild(element);
            }

            element.content = content;
        };

        // Helper function to set or update link tags
        const setLinkTag = (rel: string, href: string) => {
            let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

            if (!element) {
                element = document.createElement('link');
                element.rel = rel;
                document.head.appendChild(element);
            }

            element.href = href;
        };

        // Basic Meta Tags
        setMetaTag('name', 'description', pageDescription);
        setMetaTag('name', 'keywords', pageKeywords);
        setMetaTag('name', 'author', author || SEO_CONFIG.author.name);
        setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

        // Canonical URL
        setLinkTag('canonical', canonicalUrl);

        // OpenGraph Tags
        setMetaTag('property', 'og:title', pageTitle);
        setMetaTag('property', 'og:description', pageDescription);
        setMetaTag('property', 'og:image', pageImage);
        setMetaTag('property', 'og:image:width', '1200');
        setMetaTag('property', 'og:image:height', '630');
        setMetaTag('property', 'og:image:alt', pageTitle);
        setMetaTag('property', 'og:url', canonicalUrl);
        setMetaTag('property', 'og:type', type);
        setMetaTag('property', 'og:site_name', SEO_CONFIG.siteName);
        setMetaTag('property', 'og:locale', 'en_US');

        // Article-specific OpenGraph tags
        if (type === 'article') {
            if (publishedTime) {
                setMetaTag('property', 'article:published_time', publishedTime);
            }
            if (modifiedTime) {
                setMetaTag('property', 'article:modified_time', modifiedTime);
            }
            if (author) {
                setMetaTag('property', 'article:author', author);
            }
        }

        // Twitter Card Tags
        setMetaTag('name', 'twitter:card', 'summary_large_image');
        setMetaTag('name', 'twitter:site', SEO_CONFIG.twitterHandle);
        setMetaTag('name', 'twitter:creator', SEO_CONFIG.twitterHandle);
        setMetaTag('name', 'twitter:title', pageTitle);
        setMetaTag('name', 'twitter:description', pageDescription);
        setMetaTag('name', 'twitter:image', pageImage);
        setMetaTag('name', 'twitter:image:alt', pageTitle);

        // Structured Data (JSON-LD)
        if (structuredData) {
            let scriptTag = document.querySelector('script[data-type="structured-data"]') as HTMLScriptElement;

            if (!scriptTag) {
                scriptTag = document.createElement('script');
                scriptTag.type = 'application/ld+json';
                scriptTag.setAttribute('data-type', 'structured-data');
                document.head.appendChild(scriptTag);
            }

            scriptTag.textContent = JSON.stringify(structuredData);
        }
    }, [pageTitle, pageDescription, pageKeywords, pageImage, canonicalUrl, type, author, publishedTime, modifiedTime, structuredData]);

    return null; // This component doesn't render anything
};

export default SEOHelmet;
