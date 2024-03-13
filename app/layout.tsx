import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "./components/layout/footer";
import CreateChat from "./components/chat/createChat";
// import { Notifications } from "react-push-notification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import PopUp from "./components/PopUp";

const inter = Inter({ subsets: ["latin"] });
const APP_NAME = "ASKUS";
const APP_DEFAULT_TITLE = "Askus Anytime";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION = "";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  // robots: "all",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  // formatDetection: {
  //   telephone: false,
  // },
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
  other: {
    "facebook-domain-verification": "794mkkv0g1djy10teis3fuf98fqqna",
    canonical: "https://askusat.co.uk",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const { slug} = params;
//   const siteURL = 'https://askusat.co.uk';

//   return {
//     title: `Askus Anytime`,
//     description: `Askus Anytime`,
//     alternates: {
//       canonical: `${siteURL}/${slug}`,
//     },
//   };
// }

// GTM-T9GXXQG6
// GTM-TTTXJ7HH

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '905236264437291');
fbq('track', 'PageView');
`,
        }}
      />

      <Script
        id="google-tag-manager"
        dangerouslySetInnerHTML={{
          __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T9GXXQG6');
        `,
        }}
      />

      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-T9GXXQG6"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      <body
        className={`${inter.className} font-MontserratRegular bg-white text-black`}
      >
        <ToastContainer />
        <Providers>
          <SpeedInsights />
          <PopUp />
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
