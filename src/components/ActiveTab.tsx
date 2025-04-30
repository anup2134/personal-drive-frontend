import { Toaster } from "@/components/ui/sonner";
import { tabs } from "@/utils";
import { toast } from "sonner";
import FileItem from "./FileItem";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  selectStatus,
  selectError,
  selectFiles,
  selectFolders,
  folderData,
  mainActiveTab,
} from "@/store/storageSlice";
import { Folder, ChevronRight } from "lucide-react";
import { selectRootFolderId } from "@/store/userSlice";
import { selectTabStack } from "@/store/storageSlice";
import { Fragment } from "react";

export const ActiveTab = ({ tab, main }: { tab: string; main: boolean }) => {
  const rootFolderId = useAppSelector(selectRootFolderId);
  // const TabIcon = tabs.find((t) => t.name === tab)?.icon ?? Folder;
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const files = useAppSelector(selectFiles);
  const folders = useAppSelector(selectFolders);
  const [selected, setSelected] = useState<string>("files");
  const tabStack = useAppSelector(selectTabStack);

  useEffect(() => {
    setSelected("files");
  }, [tab, main]);

  useEffect(() => {
    if (error) toast(error);
  }, [error]);

  useEffect(() => {
    dispatch(mainActiveTab({ name: tab, main, id: rootFolderId }));
    dispatch(folderData(rootFolderId));
  }, []);

  return (
    <section className="px-4 flex flex-col geist-500 w-full h-full">
      <header className="flex items-center gap-x-4 mb-2 text-lg w-full overflow-x-scroll hide-scrollbar h-15">
        {tabStack.map((tab, i) => {
          const TabIcon = tab.main
            ? tabs.find((t) => t.name === tab.name)?.icon ?? Folder
            : Folder;
          return (
            <Fragment key={`${tab.id}${tab.name}`}>
              <button className="flex items-center gap-x-2 hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md transition-colors duration-300">
                <TabIcon size={20} />
                <p className="whitespace-nowrap">{tab.name}</p>
              </button>
              {i !== tabStack.length - 1 && <ChevronRight size={16} />}
            </Fragment>
          );
        })}
      </header>
      {((main && tab === "My Files") || !main) && (
        <div className="flex mb-4 gap-x-2 border border-gray-300 rounded-md p-1 w-fit">
          <button
            className={`${
              selected === "files" ? "bg-gray-200" : ""
            } px-2 py-0.5 rounded-md hover:cursor-pointer transition-colors duration-300`}
            onClick={() => {
              setSelected("files");
            }}
          >
            Files
          </button>
          <button
            className={`${
              selected === "folders" ? "bg-gray-200" : ""
            } px-2 py-0.5 rounded-md hover:cursor-pointer transition-colors duration-300`}
            onClick={() => {
              setSelected("folders");
            }}
          >
            Folders
          </button>
        </div>
      )}

      <main className="w-full h-full overflow-y-scroll mb-20 flex flex-wrap gap-4 hide-scrollbar">
        {status === "pending" && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        )}
        {status === "success" && (
          <>
            {selected === "files" &&
              (files.length > 0 ? (
                files.map((file) => (
                  <FileItem
                    key={file.id}
                    id={file.id}
                    name={file.name}
                    size="1.2"
                  />
                ))
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-lg font-semibold">No files found</p>
                </div>
              ))}
            {selected === "folders" &&
              (folders.length > 0 ? (
                folders.map((folder) => (
                  <FileItem
                    key={folder.id}
                    id={folder.id}
                    name={folder.name}
                    isFolder
                  />
                ))
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-lg font-semibold">No folders found</p>
                </div>
              ))}
          </>
        )}
      </main>
      <Toaster />
    </section>
  );
};
