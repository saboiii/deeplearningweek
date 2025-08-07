export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/private/'],
        },
        sitemap: 'https://dlweek.com/sitemap.xml',
    }
}
