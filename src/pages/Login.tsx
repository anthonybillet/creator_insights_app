import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validUsers: Record<string, { creator_id: string }> = {
      "creator1_456": { creator_id: "1" },
      "creator2_456": { creator_id: "2" },
      "studio1_456": { creator_id: "1,2" },
    };

    if (validUsers[username] && password === username) {
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("creator_id", validUsers[username].creator_id);
      navigate("/analytics");
    } else {
      setError("Invalid credentials. Please use one of the demo accounts.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <div className="flex justify-center">
            <div className="bg-orange-500 text-white font-bold p-2 text-xl rounded">CB</div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Demo credentials required (username & password match):<br/>
            <span className="font-mono bg-gray-100 px-1 rounded inline-block mt-1">creator1_456</span> |{" "}
            <span className="font-mono bg-gray-100 px-1 rounded inline-block mt-1">creator2_456</span> |{" "}
            <span className="font-mono bg-gray-100 px-1 rounded inline-block mt-1">studio1_456</span>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Username (e.g. creator1_456)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Password (matches username)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-orange-500 group-hover:text-orange-400 transition-colors" aria-hidden="true" />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
