import { Metadata } from "next";
import { AR_One_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

//Query Client
import TenstackProvider from "@/Tenstack/TenstackProvider";

//Authorizer
import { Authorizer } from "@/Components/Ui";

//MetaData
export const metadata: Metadata = {
  title: {
    template: "%s | We make your next web application",
    default: "Webinuxs"
  },
  description: "Trustworthy, dedicated and experience web developers with over 6 years of experience and a track record or completing 70 projects for satisfied clients, we bring a wealth of expertise to your web application development needs.",
  keywords: ["web development", "website development", "front end developer", "website developers near me", "website development company", "website developers", "web development company", "web developers near me", "website design services", "website creation services", "web application development", "web development services", "back end developer", "web design and development", "front end web developer", "fullstack developer", "web dev", "best website developers", "find a web developer", "website development near me", "webdeveloper", "web app developers", "web development near me", "ecommerce web developer", "best web developers", "web development website", "react front end developer", "web and app development", "front end web developer", "front end", "front end developer near me", "front end web design", "front end and back end", "backend developer", "back end", "node js web development", "web development service", "website creation services"],
  generator: "Siam Ahnaf",
  authors: [{
    name: "Siam Ahnaf",
    url: "https://www.siamahnaf.com/"
  }, {
    name: "Webinuxs",
    url: "https://webinuxs.com/"
  }],
  creator: "Webinuxs",
  publisher: "Webinuxs",
  formatDetection: {
    email: true,
    address: false,
    telephone: true
  },
  metadataBase: new URL("https://webinuxs.com/"),
  openGraph: {
    title: {
      template: "%s | We make your next web application",
      default: "Webinuxs"
    },
    description: "Trustworthy, dedicated and experience web developers with over 6 years of experience and a track record or completing 70 projects for satisfied clients, we bring a wealth of expertise to your web application development needs.",
    url: "https://webinuxs.com/",
    siteName: "Webinuxs",
    images: [
      {
        url: "https://webinuxs.com/webinuxs.png",
        width: 880,
        height: 460
      }
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "standard",
      "max-video-preview": -1,
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s | We make your next web application",
      default: "Webinuxs"
    },
    description: "Trustworthy, dedicated and experience web developers with over 6 years of experience and a track record or completing 70 projects for satisfied clients, we bring a wealth of expertise to your web application development needs.",
    siteId: "siamahnaf",
    creator: "Siam Ahnaf",
    creatorId: "siamahnaf",
    images: ["https://webinuxs.com"]
  },
  alternates: {
    canonical: "https://webinuxs.com"
  }
}

//Fonts
const arOneSans = AR_One_Sans({
  subsets: ["latin"],
  display: "block",
  variable: "--font-ar-one-sans",
  adjustFontFallback: false
});

//Header and Footer
import Header from "@/Layout/Header";
import Footer from "@/Layout/Footer";

//Chat Head
import Whatsapp from "@/Components/Chat/Whatsapp";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className={arOneSans.className}>
      <body className="bg-white text-primary">
        <TenstackProvider>
          <Toaster
            containerStyle={{
              zIndex: 9999999
            }}
          />
          <Authorizer />
          <Header />
          <div>
            {children}
          </div>
          <Footer />
          <Whatsapp />
        </TenstackProvider>
      </body>
    </html>
  );
};

export default RootLayout;