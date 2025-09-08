

import { useState } from "react"
import { Menu, Bell, Search, User, Settings, LogOut, ChevronDown, MessageSquare, Shield, Activity } from "lucide-react"
import { Badge, Dropdown, Input, Avatar, Button } from "antd"

const AdminHeader = () => {

  const notifications = [
    {
      id: 1,
      type: "warning",
      title: "Course Approval Pending",
      message: "5 courses waiting for approval",
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      type: "info",
      title: "New Teacher Registration",
      message: "John Smith applied as a teacher",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "success",
      title: "Payment Received",
      message: "$2,450 subscription payment processed",
      time: "3 hours ago",
      unread: false,
    },
    {
      id: 4,
      type: "error",
      title: "Fraud Alert",
      message: "Suspicious activity detected on account #1234",
      time: "5 hours ago",
      unread: true,
    },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  const profileMenuItems = [
    {
      key: "profile",
      label: (
        <div className="flex items-center space-x-2 px-2 py-1">
          <User className="w-4 h-4" />
          <span>My Profile</span>
        </div>
      ),
    },
    {
      key: "settings",
      label: (
        <div className="flex items-center space-x-2 px-2 py-1">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <div className="flex items-center space-x-2 px-2 py-1 text-red-500">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </div>
      ),
    },
  ]

  const notificationMenuItems = [
    {
      key: "notifications",
      label: (
        <div className="w-80 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <Button type="link" size="small" className="text-purple-600">
              Mark all as read
            </Button>
          </div>
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 hover:bg-gray-50 cursor-pointer ${notification.unread ? "bg-blue-50" : ""}`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`
                    w-2 h-2 rounded-full mt-2 flex-shrink-0
                    ${notification.type === "warning" ? "bg-yellow-500" : ""}
                    ${notification.type === "info" ? "bg-blue-500" : ""}
                    ${notification.type === "success" ? "bg-green-500" : ""}
                    ${notification.type === "error" ? "bg-red-500" : ""}
                  `}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{notification?.title}</p>
                    <p className="text-sm text-white mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                  {notification.unread && <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2" />}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-200">
            <Button type="link" className="w-full text-center text-purple-600">
              View all notifications
            </Button>
          </div>
        </div>
      ),
    },
  ]

  return (
    <header className="bg-gray-900 border-b border-gray-500 px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button className="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
            <Menu className="w-5 h-5 text-white" />
          </button>

          {/* Page Title */}
          <div>
            {/* <h1 className="text-xl font-semibold text-gray-900">{activeSection.title || "Dashboard"}</h1> */}
            <p className="text-sm text-white">Welcome back, Admin</p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <Input
            placeholder="Search users, courses, transactions..."
            prefix={<Search className="w-4 h-4 text-gray-400" />}
            className="w-full"
            size="large"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-green-500" />
              <span className="text-white">System Status: </span>
              <span className="text-green-600 font-medium">Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-purple-500" />
              <span className="text-white">Security: </span>
              <span className="text-purple-600 font-medium">Protected</span>
            </div>
          </div>

          {/* Notifications */}
          <Dropdown
            menu={{ items: notificationMenuItems }}
            trigger={["click"]}
            placement="bottomRight"
            overlayClassName="notification-dropdown"
          >
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Badge count={unreadCount} size="small">
                <Bell className="w-5 h-5 text-white" />
              </Badge>
            </button>
          </Dropdown>

          {/* Messages */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Badge count={3} size="small">
              <MessageSquare className="w-5 h-5 text-white" />
            </Badge>
          </button>

          {/* Profile Dropdown */}
          <Dropdown menu={{ items: profileMenuItems }} trigger={["click"]} placement="bottomRight">
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Avatar size={32} src="/api/placeholder/32/32" className="border-2 border-purple-200" />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-white">Super Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </Dropdown>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-3">
        <Input placeholder="Search..." prefix={<Search className="w-4 h-4 text-gray-400" />} size="large" />
      </div>
    </header>
  )
}

export default AdminHeader


