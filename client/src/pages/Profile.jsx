import { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteFailure,
  deleteStart,
  deleteSuccess,
} from "../../features/user/userSlice.js";
import axios from "axios";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [updateSuccessState, setUpdateSuccessState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    setFileUploadError(false);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    // const storageRef = ref(storage, `avatars/${fileName}`);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",

      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setFilePercentage(progress);
      },

      (error) => {
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = async (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await axios.post(
        `/api/user/update/${currentUser._id}`,
        formData
      );
      const data = res.data;
      if (data.success === false) {
        dispatch(updateFailure(data.message));
      }
      dispatch(updateSuccess(data));
      setUpdateSuccessState(true);
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteStart());
      const res = await axios.delete(`/api/user/delete/${currentUser._id}`);
      const data = res.data;
      if (data.success === false) {
        dispatch(updateFailure(data.message));
      }
      dispatch(deleteSuccess(data));
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-4">
      <form
        className="flex flex-col text-center gap-2 my-2"
        onSubmit={handleSubmit}
      >
        <h1 className="font-semibold text-xl">Profile</h1>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.profilePicture || currentUser.profilePicture}
          alt="avatar"
          className="w-40 h-40 rounded-full shadow-xl cursor-pointer self-center object-cover"
        />
        <p className="self-center">
          {fileUploadError ? (
            <span className="text-red-500">
              Error image upload (Image must be less then 2mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-500">{`Uploading ${filePercentage}...`}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-500">
              Image uploaded successfully!{" "}
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          className="bg-slate-50 rounded-xl p-2"
          name="username"
          placeholder="username"
          onChange={handleChange}
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          className="bg-slate-50 rounded-xl p-2"
          name="email"
          placeholder="email"
          onChange={handleChange}
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          className="bg-slate-50 rounded-xl p-2"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white p-2 rounded-xl disabled:opacity-70 hover:opacity-75 hover:shadow-lg"
        >
          Update
        </button>
      </form>
      <div>
        <button
          onClick={handleDeleteUser}
          type="submit"
          className="bg-red-700 text-white p-2 rounded-xl disabled:opacity-70 hover:opacity-75 hover:shadow-lg w-full"
        >
          Delete Account
        </button>
      </div>
      <div>
        <span className="text-green-500">
          {updateSuccessState ? "Updated succesfully" : null}
        </span>
        <span className="text-red-500">{error ? error : null}</span>
      </div>
    </div>
  );
};

export default Profile;
