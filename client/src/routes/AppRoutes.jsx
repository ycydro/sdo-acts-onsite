import CreateTicket from "@/pages/CreateTicket";
import LoginPage from "@/pages/LoginPage";
import LogoutPage from "@/pages/LogoutPage";
import TicketForm from "@/pages/TicketForm";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RequestTicketForm from "@/pages/RequestTicketForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/create-ticket"
        element={
          <ProtectedRoute>
            <CreateTicket />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ticket-form"
        element={
          <ProtectedRoute>
            <TicketForm />
          </ProtectedRoute>
        }
      />
      <Route path="/logout" element={<LogoutPage />} />
    </Routes>
  );
};

export default AppRoutes;
