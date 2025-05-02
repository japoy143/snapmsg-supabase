import SearchBar from "../_components/search-bar";
import ShowModal from "../_components/showmodal";
import { getAuthUser } from "@/utils/supabase/users";
import StatsDashboard from "../_components/dashboard/stats_dashboard";

export default async function ProtectedPage() {
  const user = await getAuthUser();

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[var(--dashboard-background-color)] z-0  relative ">
      {/* Custom Modal */}
      <ShowModal />
      <SearchBar name=" Dashboard" isSearchVisible="hidden" />
      <StatsDashboard />
    </div>
  );
}
