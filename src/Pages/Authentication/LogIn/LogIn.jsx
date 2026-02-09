import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

import bgImg from "../../../assets/authBg/bg-img.jpg";
import toast from "react-hot-toast";

const LogIn = () => {
  const { logInUser, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
const [wrongPassword, setWrongPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logInUser(email, password)
      .then(() => {
        
        toast.success(`Log In SuccessFull`, {
          className: "w-[300px] h-[100px] text-xl font-bold ",
          removeDelay: 1000,
          iconTheme: {
            primary: "#16061e",
            secondary: "#ef54e2",
          },
          style: {
            border: "1px solid #08086c",
            color: "white",
            backgroundImage: "linear-gradient(to bottom right, #040017,#100136 )"
          },
        });
        navigate(from);
      })
      .catch((error) => {
        setWrongPassword("Opps-Wrong password or email--Try again");
        const errorCode = error.code;
        toast.success(`Opps--${errorCode}`, {
          className: "w-[300px] h-[100px] text-xl font-bold ",
          removeDelay: 1000,
          iconTheme: {
            primary: "#f7856c",
            secondary: "#d70309",
          },
          style: {
            border: "1px solid blue",
            color: "white",
            backgroundImage:
              "linear-gradient(to bottom right,#6c0000,#c8040c, #a00006)",
          },
        });

        console.log(error);
      });
  };
  //google sign in
const handleLoginAdmin=()=>{
  const email="newspaper@admin.com"
  const password=123456
   logInUser(email, password)
      .then(() => {
        
        toast.success(`Log In SuccessFull`, {
          className: "w-[300px] h-[100px] text-xl font-bold ",
          removeDelay: 1000,
          iconTheme: {
            primary: "#16061e",
            secondary: "#ef54e2",
          },
          style: {
            border: "1px solid #08086c",
            color: "white",
            backgroundImage: "linear-gradient(to bottom right, #040017,#100136 )"
          },
        });
        navigate(from);
      })
      .catch((error) => {
        setWrongPassword("Opps-Wrong password or email--Try again");
        const errorCode = error.code;
        toast.success(`Opps--${errorCode}`, {
          className: "w-[300px] h-[100px] text-xl font-bold ",
          removeDelay: 1000,
          iconTheme: {
            primary: "#f7856c",
            secondary: "#d70309",
          },
          style: {
            border: "1px solid blue",
            color: "white",
            backgroundImage:
              "linear-gradient(to bottom right,#6c0000,#c8040c, #a00006)",
          },
        });

        console.log(error);
      });
}
  return (
    <div
      style={{ backgroundImage: `url(${bgImg})` }}
      className="bg-cover bg-no-repeat py-14 lg:py-36 min-h-screen px-2 lg:px-0"
    >
      
      {/* Login form card */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-auto overflow-hidden">
        {/* top accent bar */}
        <div className="bg-[#0f1e3d] h-2"></div>

        <div className="p-6 lg:p-8">
          
          <div className="flex items-center flex-col lg:flex-row justify-between mb-6 lg:mb-12">
{/* Title */}
          <h1 className="text-2xl text-center lg:text-left lg:text-5xl font-bold text-[#0f1e3d]  ">
            Login
          </h1>
          <button onClick={handleLoginAdmin} className="bg-light-accent text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 hover:bg-light-accent/60 transition duration-300 hover:scale-110">
            Login As Admin
          </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Enter Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full mb-5 border border-gray-200 rounded-lg px-4 py-3
                   focus:outline-none focus:ring-2 focus:ring-[#031934]"
            />

            {/* Password */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mb-5">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className=" w-full border border-gray-200 rounded-lg px-4 py-3
                     focus:outline-none focus:ring-2 focus:ring-[#031934]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-xl"
              >
                {showPassword ? "🙉" : "🙈"}
              </button>
            </div>

            {/* Remember + Forgot
            <div className="flex items-center justify-between mb-6 text-sm">
              <label className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-[#16b7cc] mr-2"
                />
                Remember me
              </label>
              <a href="#" className="text-[#0f1e3d] hover:underline">
                Lost your password?
              </a>
            </div> */}

            {/* Submit */}

            <div>
              {/* wrong pass */}
                <div>
                  {wrongPassword && (
                    <h2 className="text-xl text-red-600">{wrongPassword}</h2>
                  )}
                </div>
              <button
                type="submit"
                className="w-full bg-[#0f1e3d] text-white py-3 rounded-lg
                   hover:bg-red-600 cursor-pointer transition-colors duration-500"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          {/* social logi componnet */}
          <h2 className="border-y border-y-[#031934] mt-5 w-full text-center border[#fce7f350] py-2 text-2xl font-bold text-gray-900">
            Or
          </h2>
          <SocialLogin />

          <div className="text-center">
            <h5 className="w-full mx-auto text-xl font-bold text-gray-900">
              Don't have an account?
              <Link
                state={{ from: from || "/" }}
                to="/auth/register"
                className="text-green-600 mx-2 font-bold"
              >
                Register
              </Link>
              Here
            </h5>
          </div>
        </div>
      </div>
    </div>

    
  );
};

export default LogIn;
