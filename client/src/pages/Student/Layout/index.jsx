import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import StudentSidebar from "./Sidebar";
import StudentHeader from "./Header";
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
const StudentLayout = () => {
  return (
    <>
      <div className="flex">
        <ScrollToTop />
        <StudentSidebar />
        <div className=" flex-1 overflow-hidden w-full ">
          <StudentHeader />
          <div className="main-container">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLayout;
