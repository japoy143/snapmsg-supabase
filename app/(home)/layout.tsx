import "../_styles/globals.css";
import Navigation from "../_components/navigation";
import Footer from "../_components/home_components/footer";
import { ToastContainer } from "react-toastify";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "SnapMsg",
  description: "Integrate your business with professional ai assisted response",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
