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
} from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { folderData, mainActiveTab } from "@/store/storageSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  isFolder = false,
  id,
}: {
  name: string;
  size?: string;
  isFolder?: boolean;
  id: number;
}) {
  const extension = name.split(".").pop()?.toLowerCase() || "";
  const FileIcon = getFileIcon(extension);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`h-48 ${
        !isFolder ? "border border-gray-300" : "hover:bg-gray-100"
      } rounded-md flex flex-col w-[45%] xsm:w-[30%] lg:w-[20%] max-w-40 hover:cursor-pointer`}
      onClick={() => {
        if (isFolder) {
          dispatch(mainActiveTab({ name, main: false, id }));
          dispatch(folderData(id));
        } else {
        }
      }}
    >
      <div className={`h-full w-full ${!isFolder ? "p-2" : ""}`}>
        {!isFolder ? (
          <div className="bg-gray-200 w-full h-full rounded-md"></div>
        ) : (
          <Folder className="w-full h-full" />
        )}
      </div>
      {!isFolder ? (
        <div className="border-t border-gray-200 px-2 py-1">
          <div className="flex items-center gap-x-1">
            <FileIcon className="w-4 h-4" />
            <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-medium text-sm">
              {name}
            </p>
          </div>
          <div className="flex items-center">
            <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap geist-500 text-gray-500 text-xs">
              {size} MB
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical
                  size={20}
                  className="rounded-full hover:bg-gray-200"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Download />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Info />
                  File Information
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <div className="px-2 py-1 text-center">{name}</div>
      )}
    </div>
  );
}
