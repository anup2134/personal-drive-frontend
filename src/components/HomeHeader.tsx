import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Search, User, HelpCircle, XCircle } from "lucide-react";
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
import SearchResults from "./SearchResults";
import { useRef, useState } from "react";

export const HomeHeader = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");

  return (
    <header className="py-4 flex h-max items-center justify-between w-full ">
      <div>
        <div className="flex items-center">
          <Search className="w-4 h-4 relative left-5" />
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            ref={inputRef}
            className="pl-6 md:w-96 sm:w-80 pr-6"
            placeholder="Search files and folders..."
          />
          {name !== "" && (
            <XCircle
              className="w-4 h-4 relative right-5 hover:cursor-pointer"
              onClick={() => {
                setName("");
              }}
            />
          )}
        </div>
        {name !== "" && (
          <SearchResults
            name={name}
            width={inputRef.current?.offsetWidth}
            setName={setName}
          />
        )}
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
            <DropdownMenuItem>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
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
