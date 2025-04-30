import { icon } from "./types";
import { FolderOpen, Image, Share2, Users } from "lucide-react";

export const tabs: {
  name: string;
  icon: icon;
}[] = [
  { name: "My Files", icon: FolderOpen },
  { name: "Shared with me", icon: Share2 },
  { name: "Images", icon: Image },
  { name: "Groups", icon: Users },
];
