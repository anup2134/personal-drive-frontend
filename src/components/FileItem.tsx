import { Folder } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { folderData, mainActiveTab } from "@/store/storageSlice";
import FileDropDown from "./FileDropDown";

import {
  DeleteFileDialogBox,
  PublicLinkDialogBox,
  ShareFileDialogBox,
} from "./DialogBoxes";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShowImg from "./ShowImg";
import { getFileIcon } from "@/utils";

export default function FileItem({
  name,
  size,
  id,
  url,
  type,
}: {
  name: string;
  size?: number;
  id: number;
  url: string;
  type: string;
}) {
  const navigate = useNavigate();
  const extension = name.split(".").pop()?.toLowerCase() || "";
  const FileIcon = getFileIcon(extension);
  const dispatch = useAppDispatch();
  function downloadFile() {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  const [showDelete, setShowDelete] = useState(false);
  const [showPublic, setShowPublic] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const TextTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];
  const [showFile, setShowFile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(touch);
  }, []);

  return (
    <div
      className={`h-48 ${
        type !== "Folder" ? "border border-gray-300" : "hover:bg-gray-100"
      } rounded-md flex flex-col w-[45%] xsm:w-[30%] lg:w-[20%] max-w-40 min-w-36 hover:cursor-pointer select-none`}
      onDoubleClick={() => {
        if (isTouch) return;
        if (type === "Folder") {
          dispatch(mainActiveTab({ name, main: false, id }));
          dispatch(folderData(id));
        } else if (url && TextTypes.includes(type)) {
          navigate("/query_file", { state: { name, url, id } });
        } else if (url && type.startsWith("image")) {
          setShowFile(true);
        }
      }}
      onClick={() => {
        if (!isTouch) return;

        if (type === "Folder") {
          dispatch(mainActiveTab({ name, main: false, id }));
          dispatch(folderData(id));
        } else if (url && TextTypes.includes(type)) {
          navigate("/query_file", { state: { name, url, id } });
        } else if (url && type.startsWith("image")) {
          setShowFile(true);
        }
      }}
    >
      {showFile && <ShowImg setShowFile={setShowFile} url={url} name={name} />}
      <div className={`h-36 w-full ${type !== "Folder" ? "p-2" : ""}`}>
        {type !== "Folder" ? (
          <div className="bg-gray-200 w-full h-full rounded-md flex justify-center items-center p-1">
            {type?.startsWith("image") ? (
              <img
                src={url}
                alt="img"
                className={`${fullWidth ? "w-full" : "h-full"}`}
                onLoad={(e: any) => {
                  const { naturalWidth, naturalHeight } = e.target;
                  if (naturalWidth > naturalHeight) setFullWidth(true);
                  else setFullWidth(false);
                }}
              />
            ) : (
              <FileIcon size={40} />
            )}
          </div>
        ) : (
          <Folder className="w-full h-full" />
        )}
      </div>
      {type !== "Folder" ? (
        <div className="border-t border-gray-200 px-2 py-1">
          <div className="flex items-center gap-x-1">
            <FileIcon className="w-4 h-4" />
            <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-medium text-sm">
              {name}
            </p>
          </div>
          <div className="flex items-center">
            <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap geist-500 text-gray-500 text-xs">
              {size?.toPrecision(2)} MB
            </p>

            <FileDropDown
              setShowDelete={setShowDelete}
              setShowPublic={setShowPublic}
              downloadFile={downloadFile}
              setShowShare={setShowShare}
            />
          </div>
        </div>
      ) : (
        <div className="px-2 py-1 text-center">{name}</div>
      )}
      <DeleteFileDialogBox
        showBox={showDelete}
        setShowBox={setShowDelete}
        id={id}
      />
      <PublicLinkDialogBox
        showBox={showPublic}
        setShowBox={setShowPublic}
        id={id}
      />
      <ShareFileDialogBox
        showBox={showShare}
        setShowBox={setShowShare}
        id={id}
      />
    </div>
  );
}
