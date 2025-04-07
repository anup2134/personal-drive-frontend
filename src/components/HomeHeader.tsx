import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Search, User, HelpCircle } from "lucide-react";

export const HomeHeader = () => {
  return (
    <header className="p-4 flex h-max items-center justify-between w-full">
      <div className="flex items-center">
        <Search className="w-4 h-4 relative left-5" />
        <Input className="pl-6" placeholder="Search files and folders..." />
      </div>
      <div className="justify-center items-center gap-x-6 sm:flex hidden">
        <Link to="/tos">
          <HelpCircle className="h-6 w-6" />
        </Link>
        <Link
          to="/profile"
          className="w-9 h-9 rounded-full border border-gray-300 flex justify-center items-center bg-gray-100 hover:cursor-pointer"
        >
          <User />
        </Link>
      </div>
    </header>
  );
};
