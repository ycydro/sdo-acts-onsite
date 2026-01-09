import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const LogoutPage = () => {
  const { logout } = useAuth();
  const [countdown, setCountdown] = useState(30); // ⏱️ Start at 30 seconds

  // Auto logout after 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          logout();
        }
        return prev - 1;
      });
    }, 1000); // 🔁 Runs every second (not 10s)
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <header className="w-full bg-white shadow-sm flex items-center justify-between px-8 py-4 border-b">
        <div className="flex items-center space-x-3">
          <img
            src="/src/assets/SDO logo.png"
            alt="SDO Logo"
            className="h-12 w-12"
          />
          <h1 className="text-2xl font-bold text-green-800">Home</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 justify-center items-center bg-gray-50">
        <Card className="w-[70%] h-[60vh] text-center shadow-xl border border-gray-200 rounded-2xl bg-white flex flex-col justify-center items-center">
          <CardContent className="flex flex-col items-center">
            <Power className="text-red-500 w-20 h-20 mb-6" />
            <h2 className="text-2xl font-bold mb-3">Logging Out</h2>
            <p className="text-xs text-gray-400 mb-8">
              Auto logging out in {countdown}s...
            </p>

            <Button
              onClick={logout}
              className="bg-green-300 hover:bg-green-400 text-black font-semibold w-[250px] text-lg py-5 rounded-full transition-all"
            >
              Log out
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LogoutPage;
