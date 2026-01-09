import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AppHeader = () => {
  const { logout } = useAuth();
  return (
    <header className="w-full bg-white shadow-sm flex items-center justify-between px-8 py-4 border-b">
      <div className="flex items-center space-x-3">
        <img
          src="/src/assets/SDO logo.png"
          alt="SDO Logo"
          className="h-12 w-12"
        />
        <h1 className="text-2xl font-bold text-green-800">Home</h1>
      </div>

      {/* Avatar Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded-full border hover:bg-gray-100">
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="User Icon"
              className="w-8 h-8"
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem
            onClick={logout}
            className="cursor-pointer text-red-600"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default AppHeader;
