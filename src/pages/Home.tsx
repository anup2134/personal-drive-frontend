import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SidebarNav } from "@/components/SidebarNav";
import { HomeHeader } from "@/components/HomeHeader";
import { ActiveTab } from "@/components/ActiveTab";

import { useAppSelector } from "@/store/hooks";
import { useAppDispatch } from "@/store/hooks";
import { fetchUser, selectStatus } from "@/store/userSlice";
import {
  selectActiveTab,
  selectError,
  selectToast,
} from "@/store/storageSlice";
import { tabs } from "@/utils";

import { Cloud, AlignJustify } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function Home() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const navigate = useNavigate();

  const activeTab = useAppSelector(selectActiveTab);
  const [sideNavbarVisible, setSideNavbarVisible] = useState(false);
  const error = useAppSelector(selectError);
  const toastMessage = useAppSelector(selectToast);

  useEffect(() => {
    if (status === "failed") navigate("/login");
    if (status === "idle") dispatch(fetchUser());
    if (error != "") toast(error);
    if (toastMessage !== "") toast(toastMessage);
  }, [status, error, toastMessage]);

  return (
    <div className="flex sm:flex-row flex-col w-screen h-screen">
      {status === "pending" && <div>Loading...</div>}
      {status === "success" && (
        <>
          <SidebarNav
            tabs={tabs}
            activeTab={activeTab.name}
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
            <ActiveTab tab={activeTab.name} main={activeTab.main} />
          </div>
          <Toaster />
        </>
      )}
    </div>
  );
}
