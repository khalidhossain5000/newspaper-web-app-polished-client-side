import React from "react";

import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";

import { bgImages } from "./Data/BgImg";

import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import useAxios from "../../../Hooks/useAxios";
import { FaGripfire } from "react-icons/fa";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const TrendingArticlesSlider = () => {
  const { user } = useAuth();
  const axionsInstance = useAxios();

  const badgeRefs = useRef([]);

  const { data: trendingArticles = [], isPending } = useQuery({
    queryKey: ["trendingArticles", user?.email],
    queryFn: async () => {
      const res = await axionsInstance.get("/articles/trending");
      return res.data;
    },
  });

  useEffect(() => {
    badgeRefs.current.forEach((badge) => {
      if (!badge) return;
      gsap.to(badge, {
        scale: 1.08,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });
  }, [trendingArticles]);

  if (isPending) return <Loading />;

  //attaching bg images to the data
  const sliderData = trendingArticles.map((article, i) => ({
    ...article,
    bgImage: bgImages[i],
  }));
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      loop={true}
      autoplay={{ delay: 5000 }}
    >
      {sliderData.map((item, i) => (
        <SwiperSlide key={i}>
          <div
            className="z-0 relative h-[100vh] lg:h-[calc(100vh-90px)] bg-cover bg-center p-4 md:p-9 lg:px-24 pb-24 flex flex-col justify-center "
            style={{ backgroundImage: `url(${item.bgImage})` }}
          >
            <div className="rounded-lg  bg-light-primary px-3 py-9 md:p-6 lg:p-9 xl:px-12 xl:py-16 xl:w-[850px]">
              {/* trending badge */}
              <div
                ref={(el) => (badgeRefs.current[i] = el)}
                className="w-22 badge bg-light-accent shadow-2xl rounded-md  p-1 lg:px-3 lg:py-4 lg:w-36 text-center relative overflow-hidden"
              >
                <h2 className="lg:text-xl font-medium inter md:font-bold text-light-text z-10 relative">
                  Trending
                </h2>
              </div>
              {/* article author and date */}
              <div className="mt-3 author-info text-light-text flex justify-between md:justify-between gap-3 py-2 md:py-3 font-secondary ">
                <p className="md:text-xl font-medium  md:font-bold">
                  {item?.createdAt.split("T")[0]}
                </p>
                <h3 className="text-light-text flex items-center font-secondary font-bold text-[13px] md:text-sm lg:text-xl">
                  <FaGripfire className="text-xl text-light-accent" />
                  {item?.views}Views
                </h3>
              </div>
              {/* article content */}
              <div className="text-center md:text-left">
                <h1 className=" text-xl lg:text-xl xl:text-2xl 2xl:text-[45px] font-bold text-light-text py-2">
                  {item?.articleTitle?.split(" ").slice(0, 50).join(" ")}
                </h1>

                <p className="text-light-text/70 text-sm font-primary md:font-medium xl:text-xl  lg:py-2">
                   {item?.descriptions?.split(" ").slice(0, 50).join(" ") + "..."}
                </p>
              </div>
              {/* read more button */}
              <div className="mx-auto text-center pt-5 xl:mt-6">
                <button className="bg-light-accent text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap py-2 px-3  hover:bg-light-accent/60 transition duration-300 hover:scale-110 cursor-pointer font-bold">
                  <Link to={`/article/${item?._id}`}>Read More</Link>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TrendingArticlesSlider;

//
// <div className="crd">
//   {/* author div */}
//   <div className="author-info text-gray-600 flex justify-between md:justify-between gap-3 py-2 md:py-3">
//     <p className="md:text-xl font-medium md:font-bold">
//       {item?.createdAt.split("T")[0]}
//     </p>
//     <div className="flex items-center gap-3 py-1">
//       <h3 className="xl:hidden text-light-text font-bold flex items-center font-secondary text-[13px] md:text-[17px] ">
//         <FaGripfire className="text-xl text-light-accent font-bold" />
//         {item?.views}Views
//       </h3>
//       {/* author name */}
//       <h2 className="text-light-text md:text-xl font-medium md:font-bold">
//       By {item?.authorName}
//     </h2>

//     </div>
//   </div>
//   {/* author div end */}

//   <div className="imgs w-full ">
//     <img
//       src={item?.articlePic}
//       className="mx-auto w-full lg:w-full shadow-xl rounded-xl xl:h-[250px]"
//       alt=""
//     />
//   </div>
//   {/* image div ends article image */}
//   {/* content div start */}
//   <div className="contents font-secondary">
//     <h1 className="truncate md:text-2xl font-bold text-light-text py-2 lg:py-3">
//       {item?.articleTitle}
//     </h1>

//     <p className="text-light-text/70 font-bold md:font-medium md:text-xl line-clamp-2">
//       {item?.descriptions}
//     </p>
//     {/* publsiher and view count show */}
//     <div className="hidden publisherviews py-3 lg:py-5 cl:flex items-center justify-between ">
//       <h3 className="text-light-text font-bold flex items-center font-secondary text-[13px] md:text-[17px] ">
//         <FaGripfire className="text-xl text-light-accent font-bold" />
//         {item?.views}Views
//       </h3>
//       <h3 className="text-light-text md:text-xl font-medium font-secondary">
//         <span className="font-bold">Publisher</span> : {item?.publisher?.label}
//       {/* </h3>
//     </div>

//   </div>
// </div> */}
