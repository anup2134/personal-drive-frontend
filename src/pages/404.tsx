import { SearchX } from "lucide-react";
export default function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center text-2xl gap-2">
      <SearchX size={30} />
      Page not found.
    </div>
  );
}
