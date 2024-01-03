import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "./components/layout/footer";
import CreateChat from "./components/chat/createChat";
// import { Notifications } from "react-push-notification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });
const APP_NAME = "ASKUS";
const APP_DEFAULT_TITLE = "Askus Anytime";
const APP_TITLE_TEMPLATE = "%s - ASKUS";
const APP_DESCRIPTION = "We are ready to answer your questions, day or night.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    // telephone: false,
  },
  description: APP_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} font-MontserratRegular bg-white text-black`}
      >
      <ToastContainer />
        <Providers>
          <CreateChat />
          <div className="bg-[#f9f9f9]">
            {/* <Notifications /> */}
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
