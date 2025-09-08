import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router";
import Footer from "./Footer";
import { AIChatbot } from "../Chats";
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
const UserLayout = () => {
  return (
    <>
      <div className="home-container">
        <ScrollToTop />
        <Header />
        <div className=" pt-20">
          <Outlet />
        </div>
        <Footer />
        <AIChatbot />
      </div>
    </>
  );
};

export default UserLayout;
