import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import spinner from "/spinner.svg";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
  FaAngleDoubleDown,
} from "react-icons/fa";

const Listing = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [list, setList] = useState({});
  const [copy, setCopy] = useState(false);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const getList = async () => {
      try {
        setError(false);
        setLoading(true);
        const res = await axios.get(`/api/list/get/${params.id}`);
        const data = res.data;
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setList(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    getList();
  }, []);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  const handleMapSearch = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      list.address
    )}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <main>
      {error && <h1>Something went wrong!</h1>}
      {loading && <img src={spinner} className="self-center" />}
      {list && !error && !loading && (
        <div>
          <Swiper navigation>
            {list.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className="max-h-96 w-full ">
                  <img
                    src={url}
                    alt="slide"
                    className="w-full max-h-96 object-cover "
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className=" z-10 absolute top-24 right-10 w-10 h-10 bg-white rounded-full flex justify-center items-center  cursor-pointer hover:cursor-pointer  shadow-xl  ">
            <FaShare className="text-slate-500" onClick={handleCopyUrl} />
          </div>
          {copy && (
            <p className="fixed top-36 right-10 z-10 text-slate-500 bg-white p-2 rounded-md ">
              Link Copied !
            </p>
          )}
          <div className="max-w-2xl mx-auto my-5 flex flex-col gap-4 p-2 sm:p-8">
            <p className="text-md sm:text-xl text-center sm:text-left font-semibold text-slate-800 capitalize ">
              {list.name} - ${" "}
              {list.offer
                ? list.discountPrice.toLocaleString("en-US")
                : list.regularPrice.toLocaleString("en-US")}
              {list.type === "rent" && " / Month"}
            </p>
            <hr />
            <p
              className="flex items-center gap-2 capitalize cursor-pointer "
              onClick={handleMapSearch}
            >
              {" "}
              <FaMapMarkerAlt className="text-green-700 text-xl" />{" "}
              {list.address}
            </p>
            <div className="flex flex-wrap gap-5">
              <p className="capitalize bg-red-800 text-white w-40 p-1 rounded-lg text-center text-md shadow-lg ">
                {list.type === "rent" ? "rent" : "sale"}
              </p>
              {list.offer && (
                <p className="capitalize bg-green-800 text-white w-40 p-1 rounded-lg  text-md shadow-lg flex gap-4 justify-center items-center ">
                  <FaAngleDoubleDown className="text-slate-100" />
                  {list.regularPrice - list.discountPrice} $ Off{" "}
                  <FaAngleDoubleDown className="text-slate-100" />
                </p>
              )}
            </div>
            <p className="capitalize">
              {" "}
              <span className="font-semibold ">Description :</span>{" "}
              {list.description}
            </p>
            <ul className="flex flex-wrap gap-5 text-sm sm:text-lg">
              <li className="flex gap-2 whitespace-nowrap items-center">
                <FaBed className=" text-green-800" />{" "}
                <p>
                  {list.bedrooms > 1
                    ? `${list.bedrooms} Beds`
                    : `${list.bedrooms} Bed`}
                </p>
              </li>
              <li className="flex gap-2 whitespace-nowrap items-center">
                <FaBath className=" text-green-800" />{" "}
                <p>
                  {list.bathrooms > 1
                    ? `${list.bathrooms} Baths`
                    : `${list.bathrooms} Bath`}
                </p>
              </li>
              <li className="flex gap-2 whitespace-nowrap items-center">
                <FaParking className=" text-green-800" />
                {list.parking === true ? "Parking Slot" : "No Parking"}
              </li>
              <li className="flex gap-2 whitespace-nowrap items-center">
                <FaChair className=" text-green-800" />{" "}
                <p>{list.furnished === true ? "Furnished" : "Unfurnished"}</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
