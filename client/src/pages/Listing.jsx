import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import spinner from "/spinner.svg";

const Listing = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [list, setList] = useState({});
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

  return (
    <main>
      {error && <h1>Something went wrong!</h1>}
      {loading && <img src={spinner} className="self-center" />}
      {list && !error && !loading && (
        <Swiper navigation>
          {list.imageUrls.map((url) => (
            <SwiperSlide key={url}>
              <div
                className="h-[550px] w-full"
                style={{
                  background: `url(${url}) center  no-repeat`,
                  backgroundSize: "cover",
                  width: "100%",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </main>
  );
};

export default Listing;
