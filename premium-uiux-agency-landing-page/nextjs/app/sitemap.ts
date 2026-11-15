import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fieldwork.studio";
  const lastModified = new Date();
  const sections = ["", "#services", "#work", "#process", "#pricing", "#faq", "#contact"];
  return sections.map((s) => ({
    url: `${base}/${s}`,
    lastModified,
    changeFrequency: "monthly",
    priority: s === "" ? 1 : 0.7,
  }));
}
