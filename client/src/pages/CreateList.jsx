import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateList = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    regularPrice: 50,
    discountPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    parking: false,
    furnished: false,
    offer: false,
    type: "rent",
    userRef: "",
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((store) => store.user);
  const navigate = useNavigate();
  console.log(formData);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUploadImages = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setImageUploadError(false);
      setUploading(true);
      const images = [];
      for (let i = 0; i < files.length; i++) {
        images.push(storeImage(files[i]));
      }

      console.log(images);

      Promise.all(images)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image upload error (2 mb max per image)");
          setUploading(false);
        });
    } else if (files.length === 0) {
      setImageUploadError("You should select min one image");
      setUploading(false);
    } else {
      setImageUploadError("You can only upload 6 images per listing ");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) => {
            resolve(getDownloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (name === "sale" || name === "rent") {
      setFormData((prevState) => ({
        ...prevState,
        type: name,
      }));
    }

    if (name === "parking" || name === "furnished" || name === "offer") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    }

    if (type === "text" || type === "textarea" || type === "number") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price ");
      setError(false);
      setLoading(true);
      const res = await axios.post("/api/list/create", {
        ...formData,
        userRef: currentUser._id,
      });
      const data = res.data;

      if (data.success === false) {
        setError(true);
      }

      setLoading(false);
      navigate(`/list/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading();
    }
  };

  return (
    <main className="max-w-4xl mx-auto mt-5">
      <h1 className="text-center font-semibold text-lg">Create New Listing</h1>
      <form
        className="flex flex-wrap flex-col sm:flex-row gap-4"
        onSubmit={handleSubmitForm}
      >
        <div className=" flex flex-col flex-1 p-5 gap-4 ">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="bg-slate-50 rounded-xl p-2"
              minLength={10}
              maxLength={62}
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              type="textarea"
              placeholder="Description"
              name="description"
              className="bg-slate-50 rounded-xl p-2"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              className="bg-slate-50 rounded-xl p-2"
              required
              onChange={handleChange}
              value={formData.address}
            />
          </div>
          <div className=" flex flex-col flex-wrap gap-4">
            <div className="flex gap-2">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="sale"
                  id="sale"
                  className="w-4"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <label htmlFor="sale" className="select-none">
                  Sell
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="rent"
                  id="rent"
                  className="w-4"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <label htmlFor="rent" className="select-none">
                  Rent
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="parking"
                  id="parking"
                  className="w-4"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <label htmlFor="parking" className="select-none">
                  Parking-Slot
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="furnished"
                  id="furnished"
                  className="w-4"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <label htmlFor="furnished" className="select-none">
                  Furnished
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="offer"
                  id="offer"
                  className="w-4"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <label htmlFor="offer" className="select-none">
                  Offer
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                min={1}
                max={10}
                className="w-20 p-1 rounded-lg text-center border border-gray-300"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <label htmlFor="beds" className="select-none">
                Bedrooms
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                min={1}
                max={10}
                className="w-20 p-1 rounded-lg  text-center border border-gray-300"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <label htmlFor="baths" className="select-none">
                Bathrooms
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="regularPrice"
              min="50"
              max="10000000"
              name="regularPrice"
              required
              className="p-1 border border-gray-300 rounded-lg"
              onChange={handleChange}
              value={formData.regularPrice}
            />
            <div className="flex flex-col items-center">
              <p>Regular price</p>
              <span className="text-xs">($ / month)</span>
            </div>
          </div>
          {formData.offer && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="0"
                max="10000000"
                name="discountPrice"
                required
                className="p-1 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.discountPrice}
              />
              <div className="flex flex-col items-center">
                <p>Discounted price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          )}
        </div>
        <div className=" flex flex-col flex-1 p-5 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-1 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <button
              onClick={handleUploadImages}
              type="button"
              className="p-1 text-green-700 border border-green-700 rounded capitalize hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {imageUploadError && (
            <p className="text-red-500 text-sm">{imageUploadError}</p>
          )}

          <div className="flex flex-col gap-5">
            {formData.imageUrls.map((url, index) => {
              return (
                <div
                  key={url}
                  className="flex justify-between items-center border border-solid border-slate-200 p-4"
                >
                  <img
                    className="w-32 h-32 object-cover shadow-lg"
                    src={url}
                    alt="images"
                  />
                  <button
                    className="bg-transparent hover:bg-red-500 text-red-700 hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded flex items-center gap-1"
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
          <button
            disabled={loading || uploading}
            type="submit"
            className="p-1 bg-slate-700 text-white rounded-lg capitalize hover:opacity-70 disabled:opacity-80"
          >
            {loading ? "Listing..." : "Create Listing"}
          </button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateList;
