import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import TeacherHeader from "./Header";
import TeacherSidebar from "./Sidebar";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
const TeacherLayout = () => {
  return (
    <>
      <div className="flex">
        <ScrollToTop />
        <TeacherSidebar />
        <div className=" flex-1 overflow-hidden w-full ">
          <TeacherHeader />
          <div className="main-container">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherLayout;
