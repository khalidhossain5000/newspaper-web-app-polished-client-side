import React, { useEffect, useState } from "react";
import TrendingArticlesSlider from "../TrendingArticles/TrendingArticlesSlider";
import Publishers from "../PublisherSection/Publishers";
import Plans from "../PlansSection/Plans";
import Statistics from "../Statistics/Statistics";
import ExclusiveNews from "../ExclusiveNewsSection/ExclusiveNews/ExclusiveNews";
import LatestNews from "../LatestNews/LatestNews";
import { useNavigate } from "react-router";
import { ImCross } from "react-icons/im";

import Modal from "react-modal";
import NewYorkTimePopularPost from "../NewYorkTimePost/NewYorkTimePopularPost";
import SubscribeNewsLetter from "../SubscribeNewsLetter/SubscribeNewsLetter";
Modal.setAppElement("#root");
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Close modal function
  const closeModal = () => setShowModal(false);

  // Button click to navigate subscription
  const goToSubscription = () => {
    navigate("/subscription"); // adjust route as needed
  };

  return (
    <div>
      <div className="relative z-0">
        <TrendingArticlesSlider />
      </div>
      <div className="">
        <div>
          
          <Publishers />
          <LatestNews />
          <Plans />
          <ExclusiveNews />
          <NewYorkTimePopularPost/>
          <Statistics />
          <SubscribeNewsLetter/>
        </div>
      </div>

      <div className="relative z-[9999999999999]">
        
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Subscription Modal"
        className="relative z-[9999999] p-6 lg:p-12 bg-gradient-to-br from-dark-primary to-dark-secondary rounded-md shadow-lg w-lg  md:w-2xl mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black/30 flex justify-center items-center"
      >
        <h2 className="text-xl font-primary lg:text-2xl lg:font-bold text-white font-semibold mb-4 lg:mb-6">
          Take Subscription To Access Premium Content.
        </h2>
        <p className="font-secondary text-xl  font-medium  text-white">Get Access To Premium Articels</p>
        <p className="font-secondary text-xl font-medium  text-white">Post Unlimited Articles</p>
        <p className="font-secondary text-xl font-medium  text-white">Premium Feature and Many More |</p>
        <button
          onClick={goToSubscription}
          className="bg-gradient-to-br from-dark-secondary to-dark-primary border-dark-text/30 border-1 hover:bg-[#090979] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300 w-full mt-3 lg:mt-6 cursor-pointer hover:scale-110"
        >
          Subscribe Now
        </button>
        <button onClick={closeModal} className="text-xl lg:text-2xl cursor-pointer absolute top-0 mt-4 text-gray-100 right-6">
          <ImCross />
        </button>
      </Modal>
      </div>
    </div>
  );
};

export default Home;
