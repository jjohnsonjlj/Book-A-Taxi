import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (!email) return alert("Enter email");

    localStorage.setItem("user", JSON.stringify({ email }));

    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-yellow-400 p-3 rounded-lg font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}