import { Cloud, Upload, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { selectLimit, selectRootFolderId } from "@/store/userSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  folderData,
  Images,
  mainActiveTab,
  sharedFiles,
  selectActiveTab,
  fileUpload,
} from "@/store/storageSlice";
import { icon } from "@/types";
import { useRef } from "react";
import { Toaster } from "@/components/ui/sonner";

export const SidebarNav = ({
  activeTab,
  setSideNavbarVisible,
  sideNavbarVisible,
  tabs,
}: {
  activeTab: string;
  setSideNavbarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  sideNavbarVisible: boolean;
  tabs: {
    name: string;
    icon: icon;
  }[];
}) => {
  const storageUsed = useAppSelector(selectLimit);
  const rootFolderId = useAppSelector(selectRootFolderId);
  const dispatch = useAppDispatch();
  const uploadRef = useRef<HTMLInputElement>(null);
  const activeTabInfo = useAppSelector(selectActiveTab);

  const handleUploadClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "folder_id",
        activeTabInfo.main
          ? rootFolderId.toString()
          : activeTabInfo.id?.toString() ?? rootFolderId.toString()
      );
      dispatch(fileUpload(formData));
    }
  };

  return (
    <aside
      className="w-[300px] flex flex-col border-r bg-[#FAFAFA] border-r-gray-200 gap-y-5 pt-4 px-3 h-screen sm:static absolute"
      style={{
        left: sideNavbarVisible ? 0 : -300,
        transition: "left 0.3s ease",
      }}
    >
      <header className="flex items-center gap-2 relative">
        <Cloud className="w-6 h-6" />
        <h1 className="text-xl font-bold">PersonalDrive</h1>
        <button
          className="block sm:hidden"
          onClick={() => {
            setSideNavbarVisible((sideNavbarVisible) => !sideNavbarVisible);
          }}
        >
          <CircleX className="w-4 h-4 absolute right-0 -top-1" />
        </button>
      </header>
      <Button
        className="h-11 mb-6 hover:cursor-pointer"
        onClick={handleUploadClick}
      >
        <Upload className="w-5 h-5" />
        Upload
      </Button>
      <input
        type="file"
        className="hidden"
        ref={uploadRef}
        onChange={handleUpload}
      />
      <nav className="flex flex-col gap-y-2">
        {tabs.map((tab) => {
          const Tab = tab.icon;
          return (
            <button
              key={tab.name}
              className={`flex items-center hover:cursor-pointer py-2 pl-2 rounded-md ${
                activeTab === tab.name ? "bg-[#efefef] font-medium" : ""
              }`}
              onClick={() => {
                dispatch(
                  mainActiveTab({
                    name: tab.name,
                    id: tab.name === "My Files" ? rootFolderId : -1,
                    main: true,
                  })
                );
                if (tab.name === "Shared with me") {
                  dispatch(sharedFiles());
                } else if (tab.name === "My Files") {
                  dispatch(folderData(rootFolderId));
                } else if (tab.name === "Images") {
                  dispatch(Images());
                } else {
                }
              }}
            >
              <Tab className="mr-2 h-4 w-4" />
              {tab.name}
            </button>
          );
        })}
      </nav>
      <footer className="mt-auto py-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Storage</p>
          <div className="h-2 w-full rounded-full bg-[#efefef]">
            <div
              className="h-2 rounded-full bg-primary"
              style={{ width: `${(storageUsed / 200) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {storageUsed.toPrecision(2)} MB of 200 MB used
          </p>
        </div>
      </footer>
      <Toaster />
    </aside>
  );
};
