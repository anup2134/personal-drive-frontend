import { useAppSelector } from "@/store/hooks";
import { useAppDispatch } from "@/store/hooks";
import { fetchUser, selectStatus } from "@/store/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarNav } from "@/components/SidebarNav";
import { HomeHeader } from "@/components/HomeHeader";
import { ActiveTab } from "@/components/ActiveTab";
import {
  Cloud,
  FolderOpen,
  Image,
  Share2,
  Users,
  AlignJustify,
  type LucideProps,
} from "lucide-react";

export default function Home() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const navigate = useNavigate();
  const tabs: {
    name: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  }[] = [
    { name: "My Files", icon: FolderOpen },
    { name: "Shared with me", icon: Share2 },
    { name: "Photos", icon: Image },
    { name: "Groups", icon: Users },
  ];
  const [activeTab, setActiveTab] = useState<{
    name: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  }>(tabs[0]);
  const [sideNavbarVisible, setSideNavbarVisible] = useState(false);

  useEffect(() => {
    if (status === "failed") navigate("/login");
    if (status === "idle") dispatch(fetchUser());
  }, [status]);

  return (
    <div className="flex sm:flex-row flex-col w-screen h-screen">
      {status === "pending" && <div>Loading...</div>}
      {status === "success" && (
        <>
          <SidebarNav
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sideNavbarVisible={sideNavbarVisible}
            setSideNavbarVisible={setSideNavbarVisible}
          />
          <div className="h-max items-center gap-2 flex sm:hidden mt-4 ml-3">
            <button
              className="hover:cursor-pointer"
              onClick={() => {
                setSideNavbarVisible(true);
              }}
            >
              <AlignJustify />
            </button>
            <h1 className="text-xl font-bold">PersonalDrive</h1>
            <Cloud />
          </div>
          <div className="w-full max-h-screen overflow-hidden">
            <HomeHeader />
            <ActiveTab tab={activeTab} type="main" />
          </div>
        </>
      )}
    </div>
  );
}
