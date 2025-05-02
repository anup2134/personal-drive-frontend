import {
  FileText,
  FileImage,
  FileIcon as FilePdf,
  FileCode,
  FileArchive,
  FileAudio,
  FileVideo,
  File,
  Folder,
  EllipsisVertical,
  Download,
  Share2,
  Info,
  Trash2,
} from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { folderData, mainActiveTab } from "@/store/storageSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuSub,
} from "@/components/ui/dropdown-menu";
import {
  DeleteFileDialogBox,
  PublicLinkDialogBox,
  ShareFileDialogBox,
} from "./DialogBoxes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function getFileIcon(extension: string) {
  switch (extension) {
    case "pdf":
      return FilePdf;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
      return FileImage;
    case "mp3":
    case "wav":
    case "ogg":
      return FileAudio;
    case "mp4":
    case "mov":
    case "avi":
      return FileVideo;
    case "zip":
    case "rar":
    case "7z":
      return FileArchive;
    case "js":
    case "ts":
    case "jsx":
    case "tsx":
    case "html":
    case "css":
    case "py":
    case "cpp":
    case "java":
    case "c":
    case "go":
    case "php":
    case "rb":
    case "swift":
    case "json":
    case "xml":
    case "yaml":
    case "yml":
      return FileCode;
    case "txt":
    case "doc":
    case "docx":
      return FileText;
    default:
      return File;
  }
}

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
  url?: string;
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

  return (
    <div
      className={`h-48 ${
        type !== "Folder" ? "border border-gray-300" : "hover:bg-gray-100"
      } rounded-md flex flex-col w-[45%] xsm:w-[30%] lg:w-[20%] max-w-40 min-w-36 hover:cursor-pointer`}
      onDoubleClick={() => {
        if (type === "Folder") {
          dispatch(mainActiveTab({ name, main: false, id }));
          dispatch(folderData(id));
        } else if (url && TextTypes.includes(type)) {
          navigate("/view_file", { state: { name, url, type } });
        }
      }}
    >
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

            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical
                  size={20}
                  className="rounded-full hover:bg-gray-200"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <DropdownMenuItem onClick={downloadFile}>
                  <Download />
                  Download
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <div className="flex gap-x-2 items-center">
                      <Share2 size={14} />
                      Share
                    </div>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPublic(true);
                        }}
                      >
                        Public link (anyone with link)
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setShowShare(true);
                        }}
                      >
                        Sharing Options
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <Info />
                  File Information
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setShowDelete(true);
                  }}
                >
                  <Trash2 />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
