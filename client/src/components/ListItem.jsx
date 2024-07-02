import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
  FaAngleDoubleDown,
} from "react-icons/fa";

const ListItem = ({ list }) => {
  const {
    _id,
    name,
    description,
    address,
    type,
    bathrooms,
    bedrooms,
    regularPrice,
    discountPrice,
    furnished,
    offer,
    parking,
    imageUrls,
  } = list;
  return (
    <div className="w-[200px] md:w-[300px] flex  gap-20 bg-slate-50 shadow-md hover:shadow-xl rounded-xl overflow-hidden">
      <Link className="w-full" to={`/list/${_id}`}>
        <img
          src={imageUrls[0]}
          alt="banner"
          className="w-[200px] h-[200px] md:w-[300px] md:h-[330px] object-cover hover:scale-105 transition-scale duration-300 "
        />
        <div className="p-4 flex flex-col flex-wrap gap-2 w-full">
          <p className="font-semibold text-md md:text-xl text-slate-800 capitalize w-full truncate">
            {name}
          </p>

          <div className="flex items-center gap-2 w-full">
            <div>
              <FaMapMarkerAlt className="text-green-700 text-md md:text-xl w-4 h-4" />
            </div>
            <p className=" text-sm md:text-md text-gray-700 capitalize w-full truncate">
              {address}
            </p>
          </div>
          <p className="text-sm md:text-md text-gray-700 capitalize overflow-hidden line-clamp-2">
            {description}
          </p>
          <p className="font-semibold text-md md:text-lg text-gray-500 capitalize overflow-hidden">
            ${" "}
            {offer
              ? discountPrice.toLocaleString("eng-US")
              : regularPrice.toLocaleString("en-US")}
            {type === "rent" && " / Month"}
          </p>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 text-gray-700">
              <FaBed className="text-green-700" />
              {bedrooms && bedrooms > 1
                ? `${bedrooms} Beds`
                : `${bedrooms} Bed`}
            </div>
            <div className="flex items-center gap-1 text-gray-700">
              <FaBath className="text-green-700" />
              {bathrooms && bathrooms > 1
                ? `${bathrooms} Baths`
                : `${bathrooms} Bath`}
            </div>
            <div className="flex items-center gap-1 text-gray-700">
              {parking && <FaParking className="text-green-700" />}
            </div>
            <div className="flex items-center gap-1 text-gray-700">
              {furnished && <FaChair className="text-green-700" />}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListItem;
