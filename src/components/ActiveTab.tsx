import { type LucideProps } from "lucide-react";
import FileItem from "./FileItem";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  selectStatus,
  selectError,
  selectFiles,
  selectFolders,
  myFiles,
} from "@/store/storageSlice";

export const ActiveTab = ({
  tab,
  type,
  id,
}: {
  tab: {
    name: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  };
  type: "folder" | "main";
  id?: number | null;
}) => {
  const TabIcon = tab.icon;
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const files = useAppSelector(selectFiles);
  const folders = useAppSelector(selectFolders);

  useEffect(() => {
    dispatch(myFiles());
  }, [tab, type, id]);

  return (
    <section className="px-4 flex flex-col geist-500 w-full h-full">
      <header className="flex items-center mb-4 text-lg ">
        <TabIcon className="mr-2 h-5 w-5" />
        {tab.name}
      </header>
      <main className="w-full h-full overflow-y-scroll mb-20 flex flex-wrap gap-4">
        {status === "pending" && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        )}
        {status === "failed" && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-lg font-semibold text-red-500">
              {error || "Something went wrong"}
            </p>
          </div>
        )}
        {status === "success" && (
          <>
            {files.map((file) => (
              <FileItem key={file.id} name={file.name} />
            ))}
          </>
        )}
      </main>
    </section>
  );
};
