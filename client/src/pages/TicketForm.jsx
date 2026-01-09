import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Check,
  Building2,
  ClipboardList,
  BookText,
  FileText,
  AlertCircle,
  Send,
  ArrowLeft,
} from "lucide-react";
import AppHeader from "@/components/custom/AppHeader";
import RequestTicketForm from "./RequestTicketForm";

export default function TicketForm() {
  const navigate = useNavigate();

  const [department, setDepartment] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [priority, setPriority] = useState("-");
  const [subject, setSubject] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // Handle Department change
  const handleDepartmentChange = (e) => {
    const selectedDept = e.target.value;
    setDepartment(selectedDept);
    setServiceCategory("");
    setPriority("-");
  };

  // Handle Service Category change
  const handleServiceCategoryChange = (e) => {
    const selected = e.target.value;
    setServiceCategory(selected);

    if (selected === "Repair") {
      setPriority("High Priority");
    } else if (selected === "") {
      setPriority("-");
    } else {
      setPriority("Low");
    }
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent submit if any field is empty
    if (!department || !serviceCategory || !subject.trim()) {
      return;
    }

    setSubmitted(true);
  };

  // Auto redirect after 10 seconds
  useEffect(() => {
    if (submitted) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            navigate("/logout"); // 🔁 Changed route to LogoutPage.jsx
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [submitted, navigate]);

  // ✅ Success Screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Card className="w-[50%] text-center p-10 shadow-lg rounded-3xl">
          <div className="flex justify-center mb-6">
            <div className="bg-yellow-100 p-8 rounded-full">
              <Check className="text-black w-12 h-12" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-6">
            Your ticket has been placed!
          </h2>
          <Button
            onClick={() => navigate("/logout")} // 🔁 Changed route to LogoutPage.jsx
            className="bg-green-300 hover:bg-green-400 text-black text-lg font-semibold px-8 py-4 rounded-full"
          >
            Thank you
          </Button>
          <p className="text-gray-500 text-sm mt-4">
            Redirecting in {countdown} seconds...
          </p>
        </Card>
      </div>
    );
  }

  // 🧾 Ticket Form (default)
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <AppHeader />
      {/* Form Section */}
      <main className="flex flex-1 justify-center items-center">
        <Card className="w-[70%] max-w-4xl p-6 shadow-lg border border-gray-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Ticket Form</CardTitle>
          </CardHeader>

          <CardContent>
            <RequestTicketForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
