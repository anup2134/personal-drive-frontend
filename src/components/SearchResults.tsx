import { getSearchResults } from "@/apis/strorageApis";
import { File, Folder } from "@/types";
import { useEffect, useState, Fragment } from "react";
import { Separator } from "./ui/separator";
import { getFileIcon } from "@/utils";
import { useNavigate } from "react-router-dom";
import ShowImg from "./ShowImg";
import { useAppDispatch } from "@/store/hooks";
import { mainActiveTab, folderData } from "@/store/storageSlice";
import FileDropDown from "./FileDropDown";
import {
  DeleteFileDialogBox,
  PublicLinkDialogBox,
  ShareFileDialogBox,
} from "./DialogBoxes";

export default function SearchResults({
  name,
  width,
  setName,
}: {
  name: string;
  width?: number;
  setName: (name: string) => void;
}) {
  const [files, setFiles] = useState<(File | Folder)[]>([]);
  const [url, setURL] = useState("");
  const [fname, setFname] = useState("");
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    if (name === "") return;
    setLoading(1);
    const debounce = setTimeout(async () => {
      const res = await getSearchResults(name);
      setLoading(2);
      setFiles([...res.files, ...res.folders]);
    }, 700);

    return () => {
      clearTimeout(debounce);
    };
  }, [name]);
  const dispatch = useAppDispatch();
  const [showFile, setShowFile] = useState(false);
  const navigate = useNavigate();
  function handleDoubleClick(file: File | Folder) {
    const TextTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!("type" in file)) {
      dispatch(mainActiveTab({ name: file.name, main: false, id: file.id }));
      dispatch(folderData(file.id));
    } else if (TextTypes.includes(file.type)) {
      navigate("/query_file", {
        state: { name: file.name, url: file.url, id: file.id },
      });
      return;
    } else if (file.type.startsWith("image")) {
      setURL(file.url);
      setFname(file.name);
      setShowFile(true);
    }
    setName("");
    return;
  }
  const [showDelete, setShowDelete] = useState(false);
  const [showPublic, setShowPublic] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [id, setID] = useState<number>(0);

  return (
    <>
      <div
        className="ml-4 mt-[3px] absolute bg-white border border-gray-200 rounded-md max-h-[50vh] overflow-y-scroll text-center hide-scrollbar"
        style={{ width }}
      >
        {files.length > 0 ? (
          files.map((file, i) => {
            const Icon = getFileIcon(
              file.name.split(".").pop()?.toLowerCase() || "",
              true
            );
            function downloadFile() {
              if (!("url" in file)) return;
              const link = document.createElement("a");
              link.href = file.url;
              link.setAttribute("download", file.name);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }

            return (
              <Fragment key={`${file.id}${i}`}>
                <div
                  className="px-2 py-2 flex gap-x-2 items-center justify-between w-full overflow-hidden hover:bg-gray-100"
                  onDoubleClick={() => {
                    handleDoubleClick(file);
                  }}
                >
                  <div className="flex items-center gap-x-2 w-[calc(100%-32px)]">
                    <Icon size={20} />
                    <p className="text-ellipsis whitespace-nowrap overflow-hidden text-start w-[calc(100%-20px)]">
                      {file.name}
                    </p>
                  </div>
                  {"url" in file && (
                    <div
                      className="flex justify-center items-center"
                      onClick={() => {
                        setID(file.id);
                      }}
                    >
                      <FileDropDown
                        downloadFile={downloadFile}
                        setShowPublic={setShowPublic}
                        setShowDelete={setShowDelete}
                        setShowShare={setShowShare}
                      />
                    </div>
                  )}
                </div>
                {i + 1 < files.length && <Separator />}
              </Fragment>
            );
          })
        ) : loading === 1 ? (
          <p className="font-medium py-2">Searching...</p>
        ) : (
          <p className="font-medium py-2">No files or folders found.</p>
        )}
      </div>
      {showFile && <ShowImg setShowFile={setShowFile} url={url} name={fname} />}
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
    </>
  );
}
