import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ListItem from "../components/ListItem";

const Search = () => {
  const navigate = useNavigate();
  const [sideBarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  console.log(listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await axios.get(`/api/list/get?${searchQuery}`);
      const data = res.data;
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "searchTerm") {
      setSidebarData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    if (name === "all" || name === "sale" || name === "rent") {
      setSidebarData((prevData) => ({
        ...prevData,
        type: name,
      }));
    }

    if (name === "parking" || name === "offer" || name === "furnished") {
      setSidebarData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    }
    // [name]: checked || "true" ? true : false,
    if (name === "sort_order") {
      const sort = value.split("_")[0] || "created_at";
      const order = value.split("_")[1] || "desc";
      setSidebarData((prevData) => ({
        ...prevData,
        sort,
        order,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();

    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("type", sideBarData.type);
    urlParams.set("parking", sideBarData.parking);
    urlParams.set("furnished", sideBarData.furnished);
    urlParams.set("offer", sideBarData.offer);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("order", sideBarData.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col sm:flex-row pt-16 md:relative">
      <div className="border-b-2 sm:border-r-2 p-4 md:fixed md:min-h-lvh ">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 flex-wrap">
            <label
              htmlFor="searchTerm"
              className="whitespace-nowrap font-semibold"
            >
              Search Term :
            </label>
            <input
              className="p-2 rounded-md"
              type="text"
              placeholder="Search..."
              name="searchTerm"
              id="searchTerm"
              value={sideBarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label className="font-semibold">Type :</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="all"
                id="all"
                className="w-4 "
                checked={sideBarData.type === "all"}
                onChange={handleChange}
              />
              <label htmlFor="all" className="select-none">
                Rent & Sale
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="rent"
                id="rent"
                className="w-4"
                onChange={handleChange}
                checked={sideBarData.type === "rent"}
              />
              <label htmlFor="rent" className="select-none">
                Rent
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="sale"
                id="sale"
                className="w-4"
                onChange={handleChange}
                checked={sideBarData.type === "sale"}
              />
              <label htmlFor="sale" className="select-none">
                Sale
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                className="w-4"
                onChange={handleChange}
                checked={sideBarData.offer}
              />
              <label htmlFor="offer" className="select-none">
                Offer
              </label>
            </div>
          </div>
          <div className="flex gap-2 items-center  flex-wrap">
            <label className="font-semibold">Amenities :</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-4"
                onChange={handleChange}
                checked={sideBarData.parking}
              />
              <label htmlFor="parking" className="select-none">
                Parking
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-4"
                onChange={handleChange}
                checked={sideBarData.furnished}
              />
              <label htmlFor="furnished" className="select-none">
                Furnished
              </label>
            </div>
          </div>
          <div className="flex gap-2 items-center  flex-wrap">
            <label className="font-semibold">Sort</label>
            <select
              className="p-2 rounded-md"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              name="sort_order"
            >
              <option value="regularPrice_desc">Price High to Low</option>
              <option value="regularPrice_asc">Price Low to Height</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-slate-800 text-white p-2 rounded-lg hover:opacity-75 shadow-lg max-w-sm"
          >
            Search
          </button>
        </form>
      </div>
      <div className="p-2 md:flex-1 md:ml-[400px]">
        <h1 className="font-semibold border-b-2 p-2 ">Listing Results :</h1>
        <div className="flex gap-10 flex-wrap m-5">
          {listings &&
            listings.length > 0 &&
            listings.map((list) => <ListItem key={list._id} list={list} />)}
        </div>
      </div>
    </div>
  );
};

export default Search;
