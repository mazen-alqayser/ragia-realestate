import type { Metadata } from "next";
import { Cairo, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RAGIA Real Estate | راقية للعقارات - الأفضل في السودان ومصر والإمارات والسعودية",
  description:
    "راقية للعقارات (RAGIA Real Estate) - خبرة تتجاوز 20 عاماً في التسويق العقاري الفاخر. بيع وشراء الفلل والشقق والأراضي والمزارع والأبراج في السودان، الخرطوم، أم درمان، بورتسودان، نيالا، الأبيض، واد مدني، عطبرة وكافة المدن السودانية. استشارات عقارية، إدارة أملاك، واستثمارات في مصر والإمارات والسعودية. أسعار العقارات والاراضي في السودان.",
  keywords: [
    "عقار",
    "رقيه",
    "راقية للعقارات",
    "RAGIA Real Estate",
    "اسعار العقارات والاراضي في السودان",
    "عقارات السودان",
    "عقارات الخرطوم",
    "شقق تمليك السودان",
    "فلل فاخرة السودان",
    "بيع منازل السودان",
    "شراء اراضي السودان",
    "مزارع للبيع السودان",
    "عقارات ام درمان",
    "عقارات الخرطوم بحري",
    "عقارات بورتسودان",
    "عقارات نيالا",
    "عقارات الابيض",
    "عقارات واد مدني",
    "عقارات عطبرة",
    "عقارات كسلا",
    "عقارات كوستي",
    "عقارات القضارف",
    "عقارات الفاشر",
    "استشارات عقارية السودان",
    "استثمار عقاري السودان",
    "شقق للبيع السودان",
    "اراضي للبيع السودان",
    "فلل للبيع السودان",
    "ابراج سكنية السودان",
    "عمائر للبيع السودان",
    "عقارات مصر",
    "عقارات الامارات",
    "عقارات السعودية",
    "عقارات دبي",
    "عقارات الرياض",
    "عقارات القاهرة",
    "تسويق عقاري",
    "تثمين عقارات",
    "ادارة عقارات",
    "Real Estate Sudan",
    "Property Sudan",
    "Khartoum Real Estate",
    "Sudan Properties",
    "Villa Khartoum",
    "Apartment Omdurman",
    "Land Sudan",
    "Farm Sudan",
  ],
  authors: [{ name: "RAGIA Real Estate" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏛️</text></svg>",
  },
  openGraph: {
    title: "RAGIA Real Estate | راقية للعقارات - فخامة التسويق العقاري",
    description:
      "20+ عاماً من التميز في التسويق العقاري الفاخر بالسودان، مصر، الإمارات، والسعودية. فلل، شقق، أراضي، مزارع، وأبراج.",
    url: "https://ragiarealestate.com",
    siteName: "RAGIA Real Estate | راقية للعقارات",
    type: "website",
    locale: "ar_SD",
    alternateLocale: "en_US",
    images: [
      {
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2070",
        width: 2070,
        height: 1380,
        alt: "RAGIA Real Estate - Luxury Properties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RAGIA Real Estate | راقية للعقارات",
    description:
      "الأولى في التسويق العقاري الفاخر بالسودان - 20+ سنة خبرة",
    images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2070"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ragiarealestate.com",
  },
  category: "Real Estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Schema.org Structured Data - Real Estate Agent */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Ragia Real Estate - راقية للعقارات",
              alternateName: "RAGIA Real Estate",
              foundingDate: "2003",
              telephone: "+249912339585",
              url: "https://ragiarealestate.com",
              logo: "https://ragiarealestate.com/logo.png",
              areaServed: [
                { "@type": "Country", name: "Sudan" },
                { "@type": "Country", name: "Egypt" },
                { "@type": "Country", name: "United Arab Emirates" },
                { "@type": "Country", name: "Saudi Arabia" },
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Khartoum",
                addressRegion: "Khartoum State",
                addressCountry: "SD",
              },
              sameAs: [
                "https://facebook.com/ragiarealestate",
                "https://instagram.com/ragiarealestate",
                "https://linkedin.com/company/ragiarealestate",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "500",
                bestRating: "5",
              },
            }),
          }}
        />
        {/* Schema.org - WebSite with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "راقية للعقارات",
              alternateName: "RAGIA Real Estate",
              url: "https://ragiarealestate.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://ragiarealestate.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {/* Schema.org - LocalBusiness for each city */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "عقارات راقية للعقارات في السودان",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "عقارات الخرطوم", url: "https://ragiarealestate.com#properties" },
                { "@type": "ListItem", position: 2, name: "عقارات ام درمان", url: "https://ragiarealestate.com#properties" },
                { "@type": "ListItem", position: 3, name: "عقارات الخرطوم بحري", url: "https://ragiarealestate.com#properties" },
                { "@type": "ListItem", position: 4, name: "عقارات بورتسودان", url: "https://ragiarealestate.com#properties" },
                { "@type": "ListItem", position: 5, name: "عقارات واد مدني", url: "https://ragiarealestate.com#properties" },
                { "@type": "ListItem", position: 6, name: "عقارات نيالا", url: "https://ragiarealestate.com#properties" },
                { "@type": "ListItem", position: 7, name: "عقارات الابيض", url: "https://ragiarealestate.com#properties" },
                { "@type": "ListItem", position: 8, name: "عقارات عطبرة", url: "https://ragiarealestate.com#properties" },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${cairo.variable} ${playfair.variable} ${poppins.variable} antialiased`}
        style={{ fontFamily: "var(--font-cairo), sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
