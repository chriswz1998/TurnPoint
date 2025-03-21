import { fetch } from "@tauri-apps/plugin-http";
//import { log } from console;
import { useState } from "react";
//import mysql from "mysql2";

export function CreateAccountPage() {

 /* const db = mysql.createConnection({
    host: "192.18.146.70",
    port: 3306,
    user: "root",
    password: "scissorwz@.1",
    database: "basic",
  });
  db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err.message);
      return;
    }
    console.log("Connected to the database!");
  });*/
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const submit = async (
    event?:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    if (event) event.preventDefault(); // Prevent form refresh

    try {
      const response = await fetch("http://192.18.146.70:3000/", {
        method: "POST",
        body: JSON.stringify({ user: username, password, email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.error("Invalid username or password.");
        } else if (response.status === 403) {
          console.error("Access forbidden. Contact support.");
        } else if (response.status === 404) {
          console.error("Server not found. Check if the API is running.");
        } else if (response.status === 500) {
          console.error("Server error. Try again later.");
        } else {
          console.error(
            `Unexpected error: ${response.status} ${response.statusText}`
          );
        }
        return;
      }

      const data = await response.json();
      console.log("Response:", data);
      localStorage.setItem("token", data.token);
      console.log("Stored token:", data.token);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };


  return (
    <div>
      <img className="logo" src="turningpoint_logo.png" alt="Your Company" />
      <div className="container">
        <form onSubmit={submit}>
          <h1>Create Account</h1>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button className="login" type="submit">
            Login
          </button>
          <br />
          <span className="create">
            <a href="AutheitcationPage.tsx">Create Account</a>
          </span>
        </form>
      </div>
    </div>
  );
}
