// Dashboard.tsx
import { useAuth } from "../context/AuthContext";
import Layout from "../App/Layout";

function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="card">
        <h2>Welcome, {user}!</h2>
        <p>This is your dashboard. You can view your tickets, analytics, and more.</p>
        <p>Select different roles from the top right to see role-specific menu items.</p>
      </div>
      
      <div className="card">
        <h2>Recent Activity</h2>
        <p>No recent activity to display.</p>
      </div>
      
      <div className="card">
        <h2>Quick Stats</h2>
        <p>Open Tickets: 0</p>
        <p>Resolved Tickets: 0</p>
        <p>Pending Tickets: 0</p>
      </div>
    </Layout>
  );
}

export default Dashboard;