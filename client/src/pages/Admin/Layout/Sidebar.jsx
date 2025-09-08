import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart3,
  CreditCard,
  User,
  Brain,
  Settings,
  LogOut,
} from "lucide-react";

const AdminSidebar = () => {
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "" },
    {
      key: "users",
      label: "User Management",
      icon: Users,
      path: "/admin/users",
    },
    {
      key: "courses",
      label: "Course Management",
      icon: BookOpen,
      path: "/admin/courses",
    },
    {
      key: "analytics",
      label: "Analytics",
      icon: BarChart3,
      path: "/admin/analytics",
    },
    {
      key: "payments",
      label: "Payment Management",
      icon: CreditCard,
      path: "/admin/payments",
    },
    {
      key: "ai-features",
      label: "AI Features",
      icon: Brain,
      path: "/admin/ai-features",
    },
    {
      key: "profile",
      label: "Admin Profile",
      icon: User,
      path: "/admin/profile",
    },
  ];

  return (
    <div className="min-h-100vh flex flex-col w-64 bg-gray-900 border-r border-gray-800 z-50">
      {/* Logo Section */}
      <div className="flex items-center p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg">Edverto Admin</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-3 sidebar-tabs space-y-1">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              end
              to={item.path}
              className={`
                w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
              `}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 p-4 space-y-2">
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-red-400 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
