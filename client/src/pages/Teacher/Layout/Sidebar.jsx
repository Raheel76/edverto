import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  FileQuestion,
  BarChart3,
  Video,
  MessageSquare,
  User,
  Wallet,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const TeacherSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pathname, setPathname] = useState("/teacher/dashboard"); // simulate current route

  const menuItems = [
    {
      key: "dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
      path: "",
    },
    {
      key: "courses",
      icon: <BookOpen className="w-5 h-5" />,
      label: "My Courses",
      path: "/teacher/courses",
    },
    {
      key: "quizzes",
      icon: <FileQuestion className="w-5 h-5" />,
      label: "Quizzes & Assignments",
      path: "/teacher/quizzes",
    },
    {
      key: "analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      label: "Student Analytics",
      path: "/teacher/analytics",
    },
    {
      key: "live-classes",
      icon: <Video className="w-5 h-5" />,
      label: "Live Classes",
      path: "/teacher/live-classes",
    },
    {
      key: "communications",
      icon: <MessageSquare className="w-5 h-5" />,
      label: "Communications",
      path: "/teacher/communications",
    },
    {
      key: "profile",
      icon: <User className="w-5 h-5" />,
      label: "My Profile",
      path: "/teacher/profile",
    },
    {
      key: "wallet",
      icon: <Wallet className="w-5 h-5" />,
      label: "Earnings & Wallet",
      path: "/teacher/wallet",
    },
  ];

  const isActive = (path) => pathname === path;

  return (
    <div
      className={`bg-gray-900 text-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } min-h-screen flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-indigo-400" />
              <span className="text-xl font-bold">EduAI Teacher</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2 sidebar-tabs">
          {menuItems.map((item, index) => (
            <li key={item.key}>
              <NavLink
                end
                key={index}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors w-full text-left ${
                  isActive(item.path)
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {item.icon}
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="space-y-2">
          <button className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors w-full text-left">
            <Settings className="w-5 h-5" />
            {!collapsed && <span>Settings</span>}
          </button>
          <button className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors w-full text-left">
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherSidebar;
