import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { GiHamburgerMenu } from "react-icons/gi";
import useRole from "../../Hooks/useRole";
import Swal from "sweetalert2";
import blackLogo from "../../assets/logo/new-black-logo.png";
import darklogo from "../../assets/logo/footer-logo.webp";
const NavBar = () => {
  const { user, logOut } = useAuth();
  const { role, roleLoading } = useRole();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "light" ? "light" : "dark"
  );

  const handleThemeChange = (event) => {
    const newTheme = event.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme);
    document.querySelector("html").setAttribute("data-theme", savedTheme);
  }, [theme]);
  // theme toggle part ends here

  // sticky code statd
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    // handler: set sticky if scrolled more than 50px
    const onScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    // use passive listener for better scroll performance
    window.addEventListener("scroll", onScroll, { passive: true });

    // run once to set initial state (if page opened not at top)
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // sticky code ends

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Log Out Success",

          icon: "success",

          buttonsStyling: false,
          color: "black",
          customClass: {
            popup: "error-gradient-bg",
            confirmButton:
              "bg-gradient-to-r from-yellow-500 text-black  to-amber-600 hover:bg-red-200  text-black font-semibold px-6 py-2 rounded-sm shadow-md  cursor-pointer",
            cancelButton:
              "bg-yellow-600 ml-3 text-xl text-black cursor-pointer hover:bg-yellow-500 font-bold px-6 py-2 rounded-xl",
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allArticles">All Articles</NavLink>
      </li>
      <li>
        <NavLink to="/all-publisher">All Publishers</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/add-article">Add Articles</NavLink>
          </li>
          <li>
            <NavLink to="/subscription">Subscription</NavLink>
          </li>

          <li>
            <NavLink to="/my-articles">My Articles</NavLink>
          </li>
          <li>
            <NavLink to="/premium-articles">Premium Articles</NavLink>
          </li>
        </>
      )}

      {!roleLoading && role === "admin" && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div
      className={`py-2 transition-all duration-300 ${
        isSticky
          ? "fixed top-0 left-0 w-full bg-light-primary/50 dark:bg-dark-primary/50  shadow-md backdrop-blur z-50"
          : "bg-light-accent/5 dark:bg-gradient-to-r dark:bg-dark-primary/30 py-3 lg:py-4 xl:py-5"
      }`}
    >
      
      <div className="container mx-auto ">
        <div className="hidden lg:flex items-center justify-between">
          {/* logo of the site */}
          <div>
            <Link to="/">
              <img
                className="w-[150px] md:max-w-40 dark:hidden"
                src={blackLogo}
                alt=""
              />
            </Link>
            <Link to="/">
              <img
                className="w-[150px] md:max-w-40 hidden dark:block"
                src={darklogo}
                alt=""
              />
            </Link>
          </div>
          {/* nav links */}
          <div className="links">
            <ul className="flex items-center gap-3  text-[17px] font-semibold text-light-text dark:text-dark-text font-primary whitespace-nowrap lg:px-1">
              {links}
            </ul>
          </div>
          {/* profile and logout */}
          <div className="flex items-center gap-2 xl:gap-6 auth ">
            <div className=" ">
              {/* theme toggle start */}

              <label className=" swap swap-rotate ">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  className="theme-controller"
                  value="dark"
                  checked={theme === "dark"}
                  onChange={handleThemeChange}
                />

                {/* sun icon */}
                <svg
                  className="swap-off h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
              {/* theme toggle Ends */}
            </div>
            {user ? (
              <div className="flex items-center md:gap-3 xl:gap-6">
                <NavLink to="/my-profile">
                  <img
                    src={user?.photoURL}
                    className="w-12 xl:w-14 xl::h-14 h-12 rounded-full border-1 border-light-accent"
                    alt=""
                  />
                </NavLink>

                <button
                  onClick={handleLogOut}
                  className="bg-light-accent text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 cursor-pointer hover:scale-95"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <Link
                  to="/auth/login"
                  className="border-2 border-light-accent hover:bg-light-accent/90 transition duration-300 hover:scale-110 text-light-text dark:text-dark-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3"
                >
                  Login
                </Link>

                <Link
                  to="/auth/register"
                  className="bg-light-accent text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 hover:bg-light-accent/60 transition duration-300 hover:scale-110"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER STARTS */}
      <div className="flex items-center justify-between drawer drawer-end lg:hidden z-[9999]  ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button">
            <GiHamburgerMenu size={30} className="mx-3" />
          </label>
        </div>
        <div className="drawer-side  ">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex flex-col justify-between min-h-full w-80 bg-base-200 max-w-[300px] p-4">
            <div>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {links}
              </ul>
            </div>
            <div className="">
              {user ? (
                <div className="flex items-center gap-6">
                  <NavLink to="/my-profile">
                    <img
                      src={user?.photoURL}
                      className="w-12 lg:w-16 lg:h-16 h-12 rounded-full"
                      alt=""
                    />
                  </NavLink>

                  <button
                    onClick={handleLogOut}
                    className="bg-light-accent text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap px-3 py-2 md:py-2 md:px-3 cursor-pointer"
                  >
                    Log Out
                  </button>

                  
        {/* theme toggle start */}

              <label className=" swap swap-rotate ">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  className="theme-controller"
                  value="dark"
                  checked={theme === "dark"}
                  onChange={handleThemeChange}
                />

                {/* sun icon */}
                <svg
                  className="swap-off h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
              {/* theme toggle Ends */}
     
                </div>
              ) : (
                <Link to="/auth/login" className="btn btn-md btn-success">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* logo of the site */}
        <div className="pr-3">
          <Link to="/">
            <img className="w-[150px] dark:hidden" src={blackLogo} alt="" />
          </Link>
          <Link to="/">
            <img
              className="w-[150px] hidden dark:block"
              src={darklogo}
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
