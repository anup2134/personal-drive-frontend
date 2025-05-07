import { icon } from "./types";
import { Folder, FolderOpen, Image, Share2, Users } from "lucide-react";
import {
  FileText,
  FileImage,
  FileIcon as FilePdf,
  FileCode,
  FileArchive,
  FileAudio,
  FileVideo,
  File,
} from "lucide-react";

export const tabs: {
  name: string;
  icon: icon;
}[] = [
  { name: "My Files", icon: FolderOpen },
  { name: "Shared with me", icon: Share2 },
  { name: "Images", icon: Image },
  { name: "Groups", icon: Users },
];

export function getFileIcon(extension: string, loc?: boolean) {
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
    case "Folder":
      return Folder;
    default:
      return loc ? Folder : File;
  }
}
