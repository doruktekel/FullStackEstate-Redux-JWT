import { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  console.log(fileUploadError);

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

  return (
    <div className="max-w-md mx-auto">
      <form className="flex flex-col text-center gap-2 my-2">
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
