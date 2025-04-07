import { useAppSelector } from "@/store/hooks";
import { useAppDispatch } from "@/store/hooks";
import { fetchUser, selectStatus } from "@/store/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlignJustify, Cloud } from "lucide-react";
import { SidebarNav } from "@/components/SidebarNav";
import { HomeHeader } from "@/components/HomeHeader";

export default function Home() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("My Files");
  const [sideNavbarVisible, setSideNavbarVisible] = useState(false);

  useEffect(() => {
    if (status === "failed") navigate("/login");
    if (status === "idle") dispatch(fetchUser());
  }, [status]);

  return (
    <div className="min-w-screen min-h-screen flex sm:flex-row flex-col">
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

          <HomeHeader />
        </>
      )}
    </div>
  );
}
