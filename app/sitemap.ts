import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["", "/pfx-to-pem", "/p12-to-pem", "/extract-crt-from-pfx", "/pricing", "/privacy"];
  return paths.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
  }));
}
