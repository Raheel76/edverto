import { Menu, Bell, Search, User, ChevronDown, MessageSquare, Trophy, Zap } from "lucide-react";

const StudentHeader = () => {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Assignment Graded",
      message: "Your React Fundamentals assignment received 95/100",
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      type: "info",
      title: "New Course Available",
      message: "Advanced JavaScript Patterns is now available",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "warning",
      title: "Assignment Due Soon",
      message: "Machine Learning Quiz due in 2 days",
      time: "3 hours ago",
      unread: false,
    },
    {
      id: 4,
      type: "success",
      title: "Achievement Unlocked",
      message: "You earned the 'Quick Learner' badge!",
      time: "1 day ago",
      unread: true,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button className="p-2 rounded-lg hover:bg-gray-800 lg:hidden">
            <Menu className="w-5 h-5 text-white" />
          </button>

          {/* Page Title */}
          <div>
            <p className="text-sm text-gray-300">Welcome back, Student</p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, assignments, notes..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-300">Level: </span>
              <span className="text-yellow-400 font-medium">Advanced</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="text-gray-300">Streak: </span>
              <span className="text-purple-400 font-medium">7 days</span>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors">
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
              <Bell className="w-5 h-5 text-gray-300" />
            </button>
          </div>

          {/* Messages */}
          <button className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
            <MessageSquare className="w-5 h-5 text-gray-300" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-gray-400">Premium Student</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;