import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import AdminHeader from "./Header";
import AdminSidebar from "./Sidebar";
function ScrollToTop() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState({
    component: "AdminDashboard",
    section: "dashboard",
    title: "Dashboard",
  });
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
const AdminLayout = () => {
  return (
    <>
      <div className="flex">
        <ScrollToTop />
        <AdminSidebar />
        <div className=" flex-1 overflow-hidden w-full ">
          <AdminHeader />
          <div className="main-container">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
