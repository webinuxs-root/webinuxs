import { AR_One_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

//Query Client
import TenstackProvider from "@/Tenstack/TenstackProvider";

//Authorizer
import { Authorizer } from "@/Components/Ui";

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
        </TenstackProvider>
      </body>
    </html>
  );
};

export default RootLayout;