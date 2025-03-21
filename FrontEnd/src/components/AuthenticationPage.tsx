import { useState } from "react";

interface AuthProps {
  onLoginSuccess: () => void;
}

export function AuthenticationPage({ onLoginSuccess }: AuthProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload

    // Temp login credentials
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      onLoginSuccess();
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Logo */}
      <img className="mb-6 w-40" src="src/components/img/logo.png" alt="Your Company" />
  
      {/* Login Form */}
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <form onSubmit={submit} className="flex flex-col">
          <h1 className="text-xl font-semibold text-center mb-4">Login</h1>
  
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 text-black rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
  
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 text-black rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
  
          <button
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
            type="submit"
          >
            Login
          </button>
  
          <span className="mt-4 text-center text-sm text-gray-600">
            <a href="createAccount.html" className="text-blue-600 hover:underline">
              Create Account
            </a>
          </span>
        </form>
      </div>
    </div>
  );  
}