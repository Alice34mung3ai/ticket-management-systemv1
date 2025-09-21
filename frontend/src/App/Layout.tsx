// components/Layout.tsx
import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";

function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState('user');

  useEffect(() => {
    // Apply dark mode class to body
    if (isDarkMode) {
      document.body.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <button className="nav-toggle" aria-label="Toggle navigation" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        
        <div className="logo">
          <i className="fas fa-cube"></i>
          <span>AppDashboard</span>
        </div>
        
        <nav className="header-nav">
          <ul className="header-menu">
            <li>
              <a href="#">
                <i className="fas fa-bell"></i>
                <span>Notifications</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-envelope"></i>
                <span>Messages</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-user"></i>
                <span>{user}</span>
              </a>
            </li>
          </ul>
          
          <button className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme}>
            <i className={isDarkMode ? "fas fa-sun" : "fas fa-moon"}></i>
          </button>
        </nav>
      </header>

      {/* Role Selector */}
      <div className="role-selector-container">
        <label htmlFor="roleSelector">Select your role:</label>
        <select className="role-selector" id="roleSelector" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User Role</option>
          <option value="admin">Admin Role</option>
          <option value="manager">Manager Role</option>
        </select>
      </div>

      {/* Main Container */}
      <div className="main-container">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <ul className="sidebar-menu">
            <div className="menu-section">Main</div>
            <li>
              <a href="#" className="active">
                <i className="fas fa-home"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-chart-line"></i>
                <span>Analytics</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-shopping-cart"></i>
                <span>Orders</span>
              </a>
            </li>
            
            <div className="menu-section" id="adminSection">Administration</div>
            
            <li className="admin-item" style={{ display: role === 'admin' ? 'block' : 'none' }}>
              <a href="#">
                <i className="fas fa-users-cog"></i>
                <span>User Management</span>
              </a>
            </li>
            <li className="admin-item" style={{ display: role === 'admin' ? 'block' : 'none' }}>
              <a href="#">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </a>
            </li>
            
            <div className="menu-section" id="managerSection">Management</div>
            <li className="manager-item" style={{ display: role === 'manager' ? 'block' : 'none' }}>
              <a href="#">
                <i className="fas fa-tasks"></i>
                <span>Projects</span>
              </a>
            </li>
            <li className="manager-item" style={{ display: role === 'manager' ? 'block' : 'none' }}>
              <a href="#">
                <i className="fas fa-chart-pie"></i>
                <span>Reports</span>
              </a>
            </li>
            
            <div className="menu-section">General</div>
            <li>
              <a href="#">
                <i className="fas fa-calendar"></i>
                <span>Calendar</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-file"></i>
                <span>Documents</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-question-circle"></i>
                <span>Help</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </aside>

        {/* Overlay for mobile */}
        <div className={`overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)}></div>

        {/* Content Area */}
        <main className="content">
          <div className="breadcrumb">
            <a href="#">Home</a>
            <i className="fas fa-chevron-right"></i>
            <a href="#">Dashboard</a>
            <i className="fas fa-chevron-right"></i>
            <span>Overview</span>
          </div>
          
          <h1 className="page-title">Dashboard</h1>
          
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div>© 2023 Ticket System. All rights reserved.</div>
        <ul className="footer-links">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </footer>

      <style >{`
        :root {
          --primary-color: #667eea;
          --primary-dark: #5a6fd8;
          --secondary-color: #764ba2;
          --accent-color: #f093fb;
          --text-primary: #2d3748;
          --text-secondary: #718096;
          --text-muted: #a0aec0;
          --bg-primary: #ffffff;
          --bg-secondary: #f7fafc;
          --bg-tertiary: #edf2f7;
          --border-color: #e2e8f0;
          --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          --header-height: 64px;
          --sidebar-width: 280px;
          --sidebar-collapsed: 60px;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dark {
          --text-primary: #f7fafc;
          --text-secondary: #e2e8f0;
          --text-muted: #a0aec0;
          --bg-primary: #1a202c;
          --bg-secondary: #2d3748;
          --bg-tertiary: #4a5568;
          --border-color: #4a5568;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background-color: var(--bg-primary);
          transition: var(--transition);
        }

        /* Header Styles */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--header-height);
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          box-shadow: var(--shadow-lg);
          z-index: 1000;
        }

        .nav-toggle {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: var(--transition);
        }

        .nav-toggle:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .logo i {
          font-size: 2rem;
          background: linear-gradient(45deg, var(--accent-color), #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-menu {
          display: flex;
          list-style: none;
          gap: 0.5rem;
        }

        .header-menu a {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          transition: var(--transition);
          font-size: 0.9rem;
        }

        .header-menu a:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .theme-toggle {
          background: none;
          border: none;
          color: white;
          font-size: 1.1rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: var(--transition);
        }

        .theme-toggle:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .role-selector {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          color: var(--text-primary);
          cursor: pointer;
          transition: var(--transition);
        }

        /* Main Container */
        .main-container {
          display: flex;
          margin-top: var(--header-height);
          min-height: calc(100vh - var(--header-height));
        }

        /* Sidebar Styles */
        .sidebar {
          width: var(--sidebar-width);
          background-color: var(--bg-secondary);
          border-right: 1px solid var(--border-color);
          padding: 1.5rem 0;
          overflow-y: auto;
          transition: var(--transition);
          position: fixed;
          height: calc(100vh - var(--header-height));
          left: 0;
          top: var(--header-height);
          z-index: 900;
        }

        .sidebar-menu {
          list-style: none;
          padding: 0;
        }

        .menu-section {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: 1rem 1.5rem 0.5rem;
          letter-spacing: 0.05em;
        }

        .sidebar-menu li {
          margin: 0.25rem 0;
        }

        .sidebar-menu a {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-secondary);
          text-decoration: none;
          padding: 0.75rem 1.5rem;
          transition: var(--transition);
          border-radius: 0;
          position: relative;
        }

        .sidebar-menu a:hover,
        .sidebar-menu a.active {
          background-color: var(--bg-tertiary);
          color: var(--primary-color);
        }

        .sidebar-menu a.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        }

        .sidebar-menu i {
          font-size: 1.1rem;
          width: 1.25rem;
          text-align: center;
        }

        /* Content Area */
        .content {
          flex: 1;
          margin-left: var(--sidebar-width);
          padding: 2rem;
          background-color: var(--bg-primary);
          min-height: calc(100vh - var(--header-height) - 60px);
          transition: var(--transition);
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .breadcrumb a {
          color: var(--text-muted);
          text-decoration: none;
          transition: var(--transition);
        }

        .breadcrumb a:hover {
          color: var(--primary-color);
        }

        .breadcrumb i {
          font-size: 0.75rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 1.5rem;
          box-shadow: var(--shadow);
          transition: var(--transition);
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .card h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .card p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 0.5rem;
        }

        /* Footer */
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          margin-left: var(--sidebar-width);
          transition: var(--transition);
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .footer-links {
          display: flex;
          list-style: none;
          gap: 1.5rem;
        }

        .footer-links a {
          color: var(--text-muted);
          text-decoration: none;
          transition: var(--transition);
        }

        .footer-links a:hover {
          color: var(--primary-color);
        }

        /* Overlay */
        .overlay {
          display: none;
          position: fixed;
          top: var(--header-height);
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 850;
          opacity: 0;
          transition: var(--transition);
        }

        .overlay.open {
          display: block;
          opacity: 1;
        }

        /* Role selector styling */
        .role-selector-container {
          margin-top: var(--header-height);
          padding: 1rem 2rem;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 0.5rem;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .nav-toggle {
            display: block;
          }

          .header-menu span {
            display: none;
          }

          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .content {
            margin-left: 0;
            padding: 1rem;
          }

          .footer {
            margin-left: 0;
            padding: 1rem;
            flex-direction: column;
            gap: 1rem;
          }

          .footer-links {
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .header {
            padding: 0 1rem;
          }

          .logo span {
            display: none;
          }

          .content {
            padding: 0.75rem;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Layout;