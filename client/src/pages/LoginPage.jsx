import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ✅ Import your assets
import bgImage from "@/assets/SDO Background.png";
import LoginForm from "@/components/custom/forms/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/create-ticket"); // Temporary redirect
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left side - 60% */}
      <div className="relative w-[60%] bg-green-800 text-white flex items-end">
        {/* Background image */}
        <img
          src={bgImage}
          alt="SDO Meycauayan"
          className="absolute inset-0 object-cover w-[115%] h-full translate-x- opacity-60"
        />
        {/* Green overlay */}
        <div className="absolute inset-0 bg-green-900/60" />
        {/* Text content */}
        <div className="absolute bottom-10 left-10 z-20">
          <h1 className="font-bold text-8xl leading-none">SDO-ACTS</h1>
          <p className="text-xl lg:text-3xl">
            A Centralized Ticketing System for SDO Meycauayan
          </p>
        </div>
      </div>

      {/* Right side - 40% */}
      <div className="w-[40%] flex items-center justify-center bg-white p-12">
        <Card className="w-full max-w-sm border-none shadow-none">
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
