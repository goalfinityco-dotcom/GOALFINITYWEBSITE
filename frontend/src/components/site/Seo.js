import { useEffect } from "react";

const SITE = "https://www.goalfinity.co";

const upsert = (selector, tag, attrs) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(tag);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
};

const meta = (key, value, attr = "property") => upsert(`meta[${attr}="${key}"]`, "meta", { [attr]: key, content: value });

export const Seo = ({ title, description, path = "/", image = "/og/og-home.jpg", imageAlt = "Goalfinity Group", noindex = false, jsonLd }) => {
  const ld = jsonLd ? JSON.stringify(jsonLd) : "";
  useEffect(() => {
    const url = `${SITE}${path}`;
    const img = `${SITE}${image}`;
    document.title = title;
    meta("description", description, "name");
    meta("robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1", "name");
    const canon = upsert('link[rel="canonical"]', "link", { rel: "canonical", href: url });
    if (noindex) canon.remove();
    meta("og:title", title);
    meta("og:description", description);
    meta("og:url", url);
    meta("og:image", img);
    meta("og:image:alt", imageAlt);
    meta("twitter:title", title, "name");
    meta("twitter:description", description, "name");
    meta("twitter:image", img, "name");
    const old = document.getElementById("route-jsonld");
    if (old) old.remove();
    if (ld) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.id = "route-jsonld";
      s.textContent = ld;
      document.head.appendChild(s);
    }
  }, [title, description, path, image, imageAlt, noindex, ld]);
  return null;
};

export const faqJsonLd = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
