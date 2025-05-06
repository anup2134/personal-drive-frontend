import { Toaster } from "@/components/ui/sonner";
import { tabs } from "@/utils";
import FileItem from "./FileItem";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  selectStatus,
  selectFiles,
  selectFolders,
  folderData,
  mainActiveTab,
  Images,
  sharedFiles,
} from "@/store/storageSlice";
import { Folder, ChevronRight } from "lucide-react";
import { selectRootFolderId } from "@/store/userSlice";
import { selectTabStack, selectActiveTab } from "@/store/storageSlice";
import { Fragment } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { FolderNameDialogBox } from "./DialogBoxes";

export const ActiveTab = ({ tab, main }: { tab: string; main: boolean }) => {
  const rootFolderId = useAppSelector(selectRootFolderId);
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const files = useAppSelector(selectFiles);
  const folders = useAppSelector(selectFolders);
  const [selected, setSelected] = useState<"files" | "folders">("files");
  const tabStack = useAppSelector(selectTabStack);
  const active = useAppSelector(selectActiveTab);
  const [showBox, setShowBox] = useState(false);

  useEffect(() => {
    setSelected("files");
  }, [tab, main]);

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
              <button
                className="flex items-center gap-x-2 hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md transition-colors duration-300"
                onClick={() => {
                  dispatch(
                    mainActiveTab({
                      name: tab.name,
                      main: tab.main,
                      id: tab.id ? tab.id : rootFolderId,
                    })
                  );
                  if (tab.name === "Shared with me" && tab.main)
                    dispatch(sharedFiles());
                  else if (tab.name === "My Files" && tab.main)
                    dispatch(folderData(rootFolderId));
                  else if (tab.name === "Images" && tab.main)
                    dispatch(Images());
                  else if (tab.name === "Groups" && tab.main) {
                  } else if (tab.id) dispatch(folderData(tab.id));
                }}
              >
                <TabIcon size={20} />
                <p className="whitespace-nowrap">{tab.name}</p>
              </button>
              {i !== tabStack.length - 1 && <ChevronRight size={16} />}
            </Fragment>
          );
        })}
      </header>
      {((main && tab === "My Files") || !main) && (
        <div className="flex gap-x-2">
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
          {selected === "folders" && (
            <Button
              className="hover:cursor-pointer"
              onClick={() => {
                setShowBox(true);
              }}
            >
              <Plus />
              Add folder
            </Button>
          )}
        </div>
      )}

      <main className="w-full h-full overflow-y-scroll mb-20 flex flex-wrap gap-4 content-start hide-scrollbar">
        {status === "pending" && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        )}
        {status === "success" && (
          <>
            {selected === "files" &&
              (files.length > 0 ? (
                files.map((file) => {
                  return (
                    <FileItem
                      key={file.id}
                      id={file.id}
                      name={file.name}
                      size={file.size}
                      // url={file.url}
                      url="/Untitled.png"
                      type={file.type}
                    />
                  );
                })
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
                    type="Folder"
                    url=""
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
      <FolderNameDialogBox
        showBox={showBox}
        setShowBox={setShowBox}
        id={active.id}
      />
    </section>
  );
};

//https://personaldrivebucket-4acc8ad1-670b-4c50-ba9d-ab6a283ec23a.s3.amazonaws.com/uploads/33?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXZEFHZRDCR47XJSM%2F20250502%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250502T132105Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=2c1257ba8e578c7c34b8eeb2b45df7716f1f927758bb52ab1ec06e0a5e076337
