import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center mt-20">Loading...</div>;
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
