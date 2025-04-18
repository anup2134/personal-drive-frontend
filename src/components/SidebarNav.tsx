import {
  Cloud,
  FolderOpen,
  Image,
  Share2,
  Star,
  Upload,
  Users,
  CircleX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReactElement } from "react";
import { selectLimit } from "@/store/userSlice";
import { useAppSelector } from "@/store/hooks";

export const SidebarNav = ({
  activeTab,
  setActiveTab,
  setSideNavbarVisible,
  sideNavbarVisible,
}: {
  activeTab?: { name: string; icon: ReactElement };
  setActiveTab: (tab: { name: string; icon: ReactElement }) => void;
  setSideNavbarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  sideNavbarVisible: boolean;
}) => {
  const tabs: { name: string; icon: ReactElement }[] = [
    { name: "My Files", icon: <FolderOpen className="mr-2 h-4 w-4" /> },
    { name: "Shared with me", icon: <Share2 className="mr-2 h-4 w-4" /> },
    { name: "Starred", icon: <Star className="mr-2 h-4 w-4" /> },
    { name: "Photos", icon: <Image className="mr-2 h-4 w-4" /> },
    { name: "Shared with others", icon: <Users className="mr-2 h-4 w-4" /> },
  ];
  const storageUsed = useAppSelector(selectLimit);

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
      <Button className="h-11 mb-6">
        <Upload className="w-5 h-5" />
        Upload
      </Button>
      <nav className="flex flex-col gap-y-2">
        {tabs.map((tab) => {
          return (
            <button
              key={tab.name}
              className={`flex items-center hover:cursor-pointer py-2 pl-2 rounded-md ${
                activeTab?.name === tab.name ? "bg-[#efefef] font-medium" : ""
              }`}
              onClick={() => {
                setActiveTab(tab);
              }}
            >
              {tab.icon}
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
    </aside>
  );
};
