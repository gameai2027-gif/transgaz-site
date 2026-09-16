import type { Metadata, Viewport } from "next";
import { Unbounded, Onest, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { UiProvider } from "@/components/site/ui-context";
import { company } from "@/config/company";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-onest",
  display: "swap",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${company.domain}`),
  title: "Оптовые поставки газа (СУГ) в Уфе и Башкортостане — ООО «ТРАНСГАЗ»",
  description:
    "Оптовые поставки СУГ, природного газа, газового конденсата и ПНГ для предприятий Уфы и Республики Башкортостан. Партии от одной автоцистерны, паспорт качества на каждую отгрузку, КП за 2 рабочих часа.",
  keywords: [
    "СУГ оптом Уфа",
    "пропан-бутан опт",
    "оптовые поставки газа Башкортостан",
    "газовый конденсат оптом",
    "поставщик сжиженного газа",
    "ПНГ опт",
  ],
  openGraph: {
    title: "ООО «ТРАНСГАЗ» — оптовые поставки газа для предприятий",
    description:
      "СУГ, природный газ, конденсат и ПНГ. Отгрузка от одной автоцистерны по Уфе и Республике Башкортостан. КП в течение 2 рабочих часов.",
    url: `https://${company.domain}`,
    siteName: company.legalName,
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/images/plant-dusk.jpg", width: 1600, height: 1067, alt: "Газоперерабатывающее производство в сумерках" }],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0c0f12",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WholesaleStore",
  name: company.legalName,
  description:
    "Оптовые поставки СУГ, природного газа, газового конденсата и ПНГ для предприятий Республики Башкортостан.",
  url: `https://${company.domain}`,
  telephone: company.phone,
  email: company.emailSales,
  image: `https://${company.domain}/images/plant-dusk.jpg`,
  priceRange: "по запросу",
  foundingDate: String(company.foundedYear),
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Трамвайная, д. 2г, помещ. 203",
    addressLocality: "Уфа",
    addressRegion: "Республика Башкортостан",
    postalCode: "450027",
    addressCountry: "RU",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${unbounded.variable} ${onest.variable} ${jbmono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <UiProvider>{children}</UiProvider>
      </body>
    </html>
  );
}
