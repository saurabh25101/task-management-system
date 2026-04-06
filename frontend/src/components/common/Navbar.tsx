 "use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner"; 

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");

    toast.success("Logged out successfully ");  

    // thoda delay taaki toast dikhe
    setTimeout(() => {
      window.location.href = "/login";
    }, 800);
  };

  return (
    <div className="flex justify-between items-center p-4 border-b bg-white">
      <h1 className="text-lg font-bold">Task Manager</h1>

      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}