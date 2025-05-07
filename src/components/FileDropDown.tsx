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
import { EllipsisVertical, Download, Share2, Info, Trash2 } from "lucide-react";

export default function FileDropDown({
  downloadFile,
  setShowPublic,
  setShowDelete,
  setShowShare,
}: {
  downloadFile(): void;
  setShowPublic: (showPublic: boolean) => void;
  setShowShare: (share: boolean) => void;
  setShowDelete: (delet: boolean) => void;
}) {
  return (
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
  );
}
