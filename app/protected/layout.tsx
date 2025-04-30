export const metadata = {
  title: "SnapMsg",
  description: "Integrate your business with professional ai assisted response",
};
import "../_styles/globals.css";
import Provider from "@/utils/Providers";
import { ToastContainer } from "react-toastify";
import SideBarLarge from "../_components/sidebars/sidebar_large";
import SidebarSmall from "../_components/sidebars/sidebar_small";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <main className="w-screen flex  md:grid md:grid-cols-6 min-h-screen overflow-hidden">
          <div className="  hidden  md:col-span-2 lg:col-span-1 md:flex flex-col  bg-[var(--secondary-color)] items-center">
            <SideBarLarge />
          </div>

          <div className="  flex  flex-col  md:hidden   bg-[var(--secondary-color)] items-center p-2">
            <SidebarSmall />
          </div>

          <div className="h-screen flex flex-col col-span-4 lg:col-span-5 ">
            <Provider> {children}</Provider>
          </div>
        </main>
      </body>
    </html>
  );
}
