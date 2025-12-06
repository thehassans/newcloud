import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Magnetic Clouds - Premium Hosting Provider Bangladesh',
  description = 'Enterprise-grade VPS, Cloud, and Dedicated Servers with 99.9% uptime. Professional hosting solutions in Bangladesh with 24/7 support.',
  keywords = 'hosting, bangladesh, vps, cloud, dedicated server, domain, ssl, professional email',
  image = '/og-image.jpg',
  url,
  type = 'website'
}) => {
  const siteUrl = 'https://magneticclouds.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Magnetic Clouds" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Additional SEO */}
      <link rel="canonical" href={fullUrl} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Magnetic Clouds",
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "description": description,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "BD",
            "addressLocality": "Dhaka"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+880-1XXX-XXXXXX",
            "contactType": "Customer Support",
            "availableLanguage": ["en", "bn"]
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
