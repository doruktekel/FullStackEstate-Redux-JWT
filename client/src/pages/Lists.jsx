import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import spinner from "/spinner.svg";
import Swal from "sweetalert2";

const Lists = () => {
  const [showListError, setShowListError] = useState(false);
  const [deleteListError, setDeleteListError] = useState(false);
  const { currentUser } = useSelector((store) => store.user);
  const [userListing, setUserListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const showListing = async () => {
    try {
      setShowListError(false);
      setLoading(true);
      const res = await axios.get(`/api/user/list/${currentUser._id}`);
      const data = res.data;

      if (data.success === false) {
        return setShowListError(error.massage);
      }

      setUserListing(data);
      setLoading(false);
    } catch (error) {
      setShowListError(true);
      setLoading(false);
    }
  };
  const handleDeleteList = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setDeleteLoading(true);
        setDeleteListError(false);

        const res = await axios.delete(`/api/list/delete/${id}`);
        const data = res.data;

        if (data.success === false) {
          setDeleteListError(true);
          Swal.fire({
            title: "Error!",
            text: "There was an error deleting the list.",
            icon: "error",
          });
          return;
        }

        setUserListing((prev) => prev.filter((lists) => lists._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "The list has been deleted.",
          icon: "success",
        });
      } catch (error) {
        setDeleteListError(true);
        Swal.fire({
          title: "Error!",
          text: "There was an error deleting the list.",
          icon: "error",
        });
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  useEffect(() => {
    showListing();
  }, []);
  return (
    <div className="max-w-md mx-auto mt-5 mb-10 flex flex-col justify-center pt-16">
      <h1 className="text-lg text-center font-semibold mb-2">My Lists</h1>
      {showListError && <p className="bg-red-500 tex-sm">Error showing list</p>}
      {loading || deleteLoading ? (
        <img src={spinner} className="self-center" />
      ) : (
        <div className="flex flex-col gap-2">
          {userListing && userListing.length > 0 ? (
            userListing?.map((list) => (
              <div
                key={list._id}
                className="flex justify-between items-center border border-solid border-slate-200 p-4 shadow-md gap-4"
              >
                <Link
                  className="flex items-center gap-4 truncate"
                  to={`/list/${list._id}`}
                >
                  <img
                    className="w-32 h-32 object-cover shadow-lg"
                    src={list.imageUrls[0]}
                    alt="image"
                  />
                  <p className="underline capitalize">{list.name}</p>
                </Link>
                <div className="flex flex-col gap-4 text-center">
                  <button
                    className="bg-transparent w-20 hover:bg-red-500 text-red-700 hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded  transition-all duration-300 ease-in-out   items-center gap-1 "
                    onClick={() => handleDeleteList(list._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/updatelist/${list._id}`}>
                    <button className="bg-transparent w-20 hover:bg-yellow-500 text-yellow-700 hover:text-white py-1 px-2 border border-yellow-500 hover:border-transparent rounded text-center transition-all duration-300 ease-in-out items-center gap-1 ">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <h1>You have not listing</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Lists;
