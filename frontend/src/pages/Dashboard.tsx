import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user} 🎉</h1>
        <p className="mb-6 text-gray-600">
          This is your dashboard. You are now logged in.
        </p>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
