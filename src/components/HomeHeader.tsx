import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Search, User, HelpCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/userSlice";

export const HomeHeader = () => {
  const dispatch = useAppDispatch();

  return (
    <header className="py-4 flex h-max items-center justify-between w-full">
      <div className="flex items-center">
        <Search className="w-4 h-4 relative left-5" />
        <Input
          className="pl-6 md:w-96 sm:w-80"
          placeholder="Search files and folders..."
        />
      </div>
      <div className="justify-center items-center gap-x-6 sm:flex hidden">
        <Link to="/tos">
          <HelpCircle className="h-6 w-6" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="w-9 h-9 rounded-full border border-gray-300 flex justify-center items-center bg-gray-100 hover:cursor-pointer mr-4">
              <User />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>
              <button
                onClick={() => {
                  dispatch(logoutUser());
                }}
              >
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
