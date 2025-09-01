import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token"); // from reset email link

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      // 🔗 Replace with your backend endpoint
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (res.ok) {
        setMessage("Password reset successful. Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("Invalid or expired reset link.");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default ResetPassword;
