import { X } from "lucide-react";
export default function ShowImg({
  name,
  setShowFile,
  url,
}: {
  name: string;
  setShowFile: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
}) {
  return (
    <section className="w-screen h-screen flex flex-col absolute top-0 left-0 bg-black/80">
      <nav className="px-4 py-3 flex items-center gap-x-3 h-14 w-full">
        <X
          className="opacity-100 rounded-full top-4 left-4 hover:bg-gray-500 p-1"
          color="#C4C7C5"
          size={30}
          onClick={(e) => {
            e.stopPropagation();
            setShowFile(false);
          }}
        />
        <h1 className="opacity-100 text-[#C4C7C5] text-xl overflow-hidden">
          {name}
        </h1>
      </nav>
      <div className="p-4 flex justify-center items-center w-full h-full overflow-hidden">
        <img src={url} className="object-contain max-w-full max-h-full" />
      </div>
    </section>
  );
}
