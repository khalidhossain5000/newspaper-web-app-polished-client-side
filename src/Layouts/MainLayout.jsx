import React, { useEffect, useState } from "react";
import NavBar from "../Pages/Shared/NavBar";
import { Outlet, useNavigation } from "react-router";
import Loading from "../Pages/Shared/Loading/Loading";
import { PropagateLoader } from "react-spinners";
import Footer from "../Pages/Shared/Footer/Footer";
import BreakingNews from "../Pages/Home/BreakingNews/BreakingNews";

const MainLayout = () => {
  const { state } = useNavigation();
  //INTIAL WELCOME SPINNER START
  const [welcomeLoader, setWelcomeLoader] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeLoader(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  if (welcomeLoader) {
    return (
      <div className="flex items-center justify-center fixed inset-0 bg-white z-50">
        <PropagateLoader color="#0088cb" height={55} speedMultiplier={1} />
      </div>
    );
  }
  return (
    <div>
      <header>

        {/* <BreakingNews/> */}
        <NavBar></NavBar>
      </header>
      <main className="overflow-x-hidden">{state === "loading" ? <Loading /> : <Outlet />}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
