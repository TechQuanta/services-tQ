// Note: This uses the MetadataRoute type internally, but you don't need TypeScript syntax

export default function robots() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Rules for production
  const productionRules = [
    {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/temp/'],
    },
  ];

  // Rules for all other environments (staging, development)
  const nonProductionRules = [
    {
      userAgent: '*',
      disallow: '/', // Block all crawling on non-production sites
    },
  ];

  return {
    rules: isProduction ? productionRules : nonProductionRules,
    sitemap: 'https://services.techquanta.tech/sitemap.xml',
  }
}