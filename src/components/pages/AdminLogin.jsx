import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "owner@gmail.com" && password === "123456") {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Email atau password salah");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-xs"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Login Owner
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 min-h-[48px] mb-3 rounded text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 min-h-[48px] mb-4 rounded text-base"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-brand-primary text-white min-h-[48px] py-3 rounded font-medium"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;