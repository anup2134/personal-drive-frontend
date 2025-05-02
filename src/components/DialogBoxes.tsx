import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "./ui/card";
import { fileDelete, fileShare, folderCreate } from "@/store/storageSlice";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { useState } from "react";

export function DeleteFileDialogBox({
  showBox,
  setShowBox,
  id,
}: {
  showBox: boolean;
  setShowBox: (showBox: boolean) => void;
  id: number;
}) {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`absolute max-w-[400px] w-4/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:cursor-default ${
        showBox ? "" : "hidden"
      }`}
    >
      <Card>
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete your data
            from our servers.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end flex-wrap gap-2">
          <Button
            className="hover:cursor-pointer"
            onClick={() => {
              setShowBox(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className="hover:cursor-pointer"
            onClick={() => {
              dispatch(fileDelete(id));
              setShowBox(false);
            }}
          >
            Delete
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function PublicLinkDialogBox({
  showBox,
  setShowBox,
  id,
}: {
  showBox: boolean;
  setShowBox: (showBox: boolean) => void;
  id: number;
}) {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`absolute max-w-[400px] w-4/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:cursor-default ${
        showBox ? "" : "hidden"
      }`}
    >
      <Card>
        <CardHeader>
          <CardTitle>Share Link:</CardTitle>
          <CardDescription>
            <div>
              {`http://localhost:5173/share_file/${btoa(id.toString())}`}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end flex-wrap gap-2">
          <Button
            className="hover:cursor-pointer"
            onClick={() => {
              dispatch(fileShare({ file_id: id, anyone: true, email: "" }));
              navigator.clipboard.writeText(
                `http://localhost:5173/share_file/${btoa(id.toString())}`
              );
              toast("Link copied!");
            }}
          >
            Copy
          </Button>
          <Button
            className="hover:cursor-pointer"
            onClick={() => {
              setShowBox(false);
            }}
          >
            Close
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
export function ShareFileDialogBox({
  showBox,
  setShowBox,
  id,
}: {
  showBox: boolean;
  setShowBox: (showBox: boolean) => void;
  id: number;
}) {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  return (
    <div
      className={`absolute max-w-[400px] w-4/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:cursor-default ${
        showBox ? "" : "hidden"
      }`}
    >
      <Card>
        <CardHeader>
          <CardTitle>Enter email:</CardTitle>
          <CardDescription>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end flex-wrap gap-2">
          <Button
            className="hover:cursor-pointer"
            onClick={() => {
              dispatch(fileShare({ file_id: id, anyone: false, email }));
            }}
          >
            Share
          </Button>
          <Button
            className="hover:cursor-pointer"
            onClick={() => {
              setShowBox(false);
            }}
          >
            Close
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
export function FolderNameDialogBox({
  showBox,
  setShowBox,
  id,
}: {
  showBox: boolean;
  setShowBox: (showBox: boolean) => void;
  id: number;
}) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  return (
    <div
      className={`absolute max-w-[400px] w-4/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:cursor-default ${
        showBox ? "" : "hidden"
      }`}
    >
      <Card>
        <CardHeader>
          <CardTitle>Enter folder name:</CardTitle>
          <CardDescription>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end flex-wrap gap-2">
          <Button
            className="hover:cursor-pointer"
            onClick={() => {
              dispatch(
                folderCreate({
                  folder_name: name,
                  parent_folder_id: id,
                })
              );
              setShowBox(false);
            }}
          >
            Create
          </Button>
          <Button
            className="hover:cursor-pointer"
            onClick={() => {
              setShowBox(false);
            }}
          >
            Close
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
