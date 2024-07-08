import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListItem from "../components/ListItem";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  SwiperCore.use([Navigation]);

  console.log(offerListings);

  useEffect(() => {
    const fetchSaleListings = async () => {
      try {
        const res = await axios.get("api/list/get?type=sale&limit=4");
        setSaleListings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await axios.get("api/list/get?type=rent&limit=4");
        setRentListings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchOfferListings = async () => {
      try {
        const res = await axios.get("/api/list/get?offer=true&limit=4");
        setOfferListings(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
    fetchRentListings();
    fetchSaleListings();
  }, []);

  return (
    <div className="mt-20  py-10">
      <div className=" max-w-7xl mx-auto flex flex-col gap-10 px-5 md:px-12">
        <p className="font-bold capitalize text-3xl md:text-6xl text-slate-800 select-none ">
          Find your next
          <span className=" text-slate-400"> perfect </span> <br /> place with
          ease
        </p>
        <p className="text-slate-400 select-none">
          SariSite is the best place to find your next perfect place to live.{" "}
          <br />
          We have a wide range of properties for you to choose fro.
        </p>
        <Link
          className="flex items-center gap-2 hover:underline transition-underline  text-slate-500 max-w-[200px]"
          to={"/search"}
        >
          <p> Let's get started</p>
          <FaChevronRight />
        </Link>
      </div>
      <Swiper navigation className="my-10">
        {offerListings &&
          offerListings.length > 0 &&
          offerListings?.map((list) => (
            <SwiperSlide key={list._id}>
              <div
                style={{
                  background: `url(${list.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[650px]"
                key={list._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="mx-auto max-w-7xl p-3 my-2 flex flex-col">
        {offerListings && offerListings.length > 0 && (
          <div className="flex flex-col gap-3 font-semibold text-slate-500 ">
            <div className="flex flex-col gap-2">
              <h1 className="text-md sm:text-xl ">Recent Offers</h1>
              <Link
                to={"/search?offer=true"}
                className="flex gap-2 items-center hover:underline max-w-[200px]"
              >
                <p>Show more offers</p>
                <FaChevronRight />
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start ">
              {offerListings?.map((list) => (
                <ListItem key={list._id} list={list} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="flex flex-col gap-3 font-semibold text-slate-500 py-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-md sm:text-xl ">Recent places for rent </h1>
              <Link
                to={"/search?type=rent"}
                className="flex gap-2 items-center hover:underline max-w-[250px]"
              >
                <p className="whitespace-nowrap">Show more places for rent</p>
                <FaChevronRight />
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
              {rentListings?.map((list) => (
                <ListItem key={list._id} list={list} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="flex flex-col gap-3 font-semibold text-slate-500">
            <div className="flex flex-col gap-2">
              <h1 className="text-md sm:text-xl ">Recent places for sale</h1>
              <Link
                to={"/search?type=sale"}
                className="flex gap-2 items-center hover:underline max-w-[250px]"
              >
                <p>Show more places for sale</p>
                <FaChevronRight />
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
              {saleListings?.map((list) => (
                <ListItem key={list._id} list={list} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
