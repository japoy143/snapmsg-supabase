export const metadata = {
  title: "SnapMsg",
  description: "Integrate your business with professional ai assisted response",
};
import "../../_styles/globals.css";
import Provider from "@/utils/Providers";
import { ToastContainer } from "react-toastify";
import SideBarLinksAdmin from "@/app/_components/sidebars/sidebar_links_admin";
import { signOutAdmin } from "@/utils/supabase/admin/auth";

export default async function RootLayout({
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
            <SideBarLinksAdmin />
            <div className=" flex-1 flex flex-col justify-end text-white p-8 w-full space-y-4 text-center">
              <form action={signOutAdmin}>
                <button
                  type="submit"
                  className="w-full py-2 bg-white rounded text-center text-[var(--secondary-color)]"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>

          <div className="h-screen flex flex-col col-span-4 lg:col-span-5 ">
            <Provider> {children}</Provider>
          </div>
        </main>
      </body>
    </html>
  );
}
