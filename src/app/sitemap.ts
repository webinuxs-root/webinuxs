import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://webinuxs.com/",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 1,
        },
        {
            url: "https://webinuxs.com/services",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.9,
        },
        {
            url: "https://webinuxs.com/category",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.8,
        },
        {
            url: "https://webinuxs.com/about-us",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.7,
        },
        {
            url: "https://webinuxs.com/terms-and-condition",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.6,
        },
        {
            url: "https://webinuxs.com/privacy-policy",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.6,
        },
        {
            url: "https://webinuxs.com/webinuxs-payment-policy",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.6,
        }
    ]
}