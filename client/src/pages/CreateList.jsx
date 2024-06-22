import React from "react";

const CreateList = () => {
  return (
    <main className="max-w-4xl mx-auto mt-5">
      <h1 className="text-center font-semibold text-lg">Create New Listing</h1>
      <form className="flex flex-wrap flex-col sm:flex-row gap-4">
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
            />
            <textarea
              type="textarea"
              placeholder="Description"
              name="name"
              className="bg-slate-50 rounded-xl p-2"
              required
            />
            <input
              type="text"
              placeholder="Address"
              name="name"
              className="bg-slate-50 rounded-xl p-2"
              required
            />
          </div>
          <div className=" flex flex-wrap gap-4">
            <div className="flex gap-2">
              <input type="checkbox" name="sell" id="sell" className="w-4" />
              <label htmlFor="sell" className="select-none">
                Sell
              </label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="rent" id="rent" className="w-4" />
              <label htmlFor="rent" className="select-none">
                Rent
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parkingslot"
                id="parkingslot"
                className="w-4"
              />
              <label htmlFor="parkingslot" className="select-none">
                Parking-Slot
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-4"
              />
              <label htmlFor="furnished" className="select-none">
                Furnished
              </label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="offer" id="offer" className="w-4" />
              <label htmlFor="offer" className="select-none">
                Offer
              </label>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="beds"
                name="beds"
                min={1}
                max={10}
                className="w-20 p-1 rounded-lg text-center border border-gray-300"
              />
              <label htmlFor="beds" className="select-none">
                Beds
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="baths"
                name="baths"
                min={1}
                max={10}
                className="w-20 p-1 rounded-lg  text-center border border-gray-300"
              />
              <label htmlFor="baths" className="select-none">
                Baths
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="regularPrice"
              min="50"
              max="10000000"
              required
              className="p-1 border border-gray-300 rounded-lg"
            />
            <div className="flex flex-col items-center">
              <p>Regular price</p>
              <span className="text-xs">($ / month)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="discountPrice"
              min="0"
              max="10000000"
              required
              className="p-1 border border-gray-300 rounded-lg"
            />
            <div className="flex flex-col items-center">
              <p>Discounted price</p>
              <span className="text-xs">($ / month)</span>
            </div>
          </div>
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
            />
            <button
              type="button"
              className="p-1 text-green-700 border border-green-700 rounded capitalize hover:shadow-lg disabled:opacity-80"
            >
              Upload
            </button>
          </div>
          <button
            type="submit"
            className="p-1 bg-slate-700 text-white rounded-lg capitalize hover:opacity-70 disabled:opacity-80"
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateList;
