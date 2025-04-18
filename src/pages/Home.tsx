import { useAppSelector } from "@/store/hooks";
import { useAppDispatch } from "@/store/hooks";
import { fetchUser, selectStatus } from "@/store/userSlice";
import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { AlignJustify, Cloud } from "lucide-react";
import { SidebarNav } from "@/components/SidebarNav";
import { HomeHeader } from "@/components/HomeHeader";
import { ActiveTab } from "@/components/ActiveTab";

export default function Home() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<{
    name: string;
    icon: ReactElement;
  }>();
  const [sideNavbarVisible, setSideNavbarVisible] = useState(false);
  // console.log(activeTab);
  useEffect(() => {
    if (status === "failed") navigate("/login");
    if (status === "idle") dispatch(fetchUser());
  }, [status]);

  return (
    <div className="flex sm:flex-row flex-col">
      {status === "pending" && <div>Loading...</div>}
      {status === "success" && (
        <>
          <SidebarNav
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
          <div className="w-full">
            <HomeHeader />
            {activeTab && <ActiveTab tab={activeTab} />}
          </div>
        </>
      )}
    </div>
  );
}
