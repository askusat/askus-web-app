import { MetadataRoute } from 'next'
// import { PUBLIC_URL } from './config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/chat',
    },
    sitemap: `/sitemap.xml`,
  }
}
