import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-md mx-auto">
      <form className="flex flex-col text-center gap-2 my-2">
        <h1 className="font-semibold text-xl">Profile</h1>
        <img
          src={currentUser.profilePicture}
          alt="avatar"
          className="w-40 h-40 rounded-full shadow-xl cursor-pointer self-center"
        />
        <input
          type="text"
          className="bg-slate-50 rounded-xl p-2"
          name="text"
          placeholder="username"
        />
        <input
          type="email"
          className="bg-slate-50 rounded-xl p-2"
          name="email"
          placeholder="email"
        />
        <input
          type="password"
          className="bg-slate-50 rounded-xl p-2"
          name="password"
          placeholder="password"
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-2 rounded-xl disabled:opacity-70 hover:opacity-75 hover:shadow-lg"
        >
          Update
        </button>
      </form>
      <div>
        <button
          type="submit"
          className="bg-red-700 text-white p-2 rounded-xl disabled:opacity-70 hover:opacity-75 hover:shadow-lg w-full"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
