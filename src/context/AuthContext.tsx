// AuthContext.tsx
// The AuthContext manages the authentication state of the application.
// It provides functionality to authenticate a user on app load by checking for a saved token,
// stores user information in context, and offers hooks for accessing the current user and loading state.
// The AuthProvider wraps the app and provides the authentication context to all child components.

import React, { createContext, useState, ReactNode, useEffect } from "react";
import useHttp from "@/lib/use-http.ts";
import { useNavigate } from "react-router-dom";

// Enum for user roles
// If you need to add new roles, update this enum
enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

// User object structure
export interface UserProps {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: Role;
  createdAt: Date;
}

// Context structure that will be provided
interface AuthContextType {
  user: UserProps | null;
  loading: boolean;
  setUser: (user: UserProps) => void;
}

// Create the context (undefined by default)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider wraps the app and manages authentication state
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null); // Holds the current authenticated user
  const [loading, setLoading] = useState(false); // Loading state during re-login

  const navigate = useNavigate(); // Used to redirect to login if necessary
  const { fetchData } = useHttp(); // Custom HTTP hook

  // On first render, attempt to re-authenticate using saved token
  useEffect(() => {
    reLogin();
  }, []);

  // Attempts to fetch user info based on existing token
  const reLogin = async () => {
    setLoading(true); // Start loading while authenticating
    const token = localStorage.getItem("access_token");

    if (token) {
      // Fetch user info from server
      try {
        const payload = (await fetchData("auth/userinfo")) as UserProps;
        setUser(payload); // Set user if token is valid
      } catch (e) {
        console.warn("Invalid token, forcing logout");
        localStorage.removeItem("access_token"); // Remove invalid token
        setUser(null); // Clear user data
      } 
    } else {
      // No token found, navigate to login page
      navigate("/login");
    }
    setLoading(false); // Stop loading after attempt
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access AuthContext
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
