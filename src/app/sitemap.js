export default function sitemap() {
  const baseUrl = 'https://services.techquanta.tech';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1, // Highest priority for the homepage
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      priority: 0.8,
    },
    // Add any other key pages here
  ]
}