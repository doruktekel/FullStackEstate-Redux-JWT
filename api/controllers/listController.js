import { handleError } from "../middlewares/errormiddleware.js";
import ListModel from "../models/listModel.js";

const listCreate = async (req, res, next) => {
  const list = await ListModel.create(req.body);
  if (!list) {
    return next(handleError(400, "List not created"));
  }
  res.status(200).json(list);
};

const listDelete = async (req, res, next) => {
  const list = await ListModel.findById(req.params.id);
  if (!list) {
    return next(handleError(400, "You have not list for deleting"));
  }

  if (req.user.id !== list.userRef) {
    return next(handleError(401, "You can just delete your own lists"));
  }

  await ListModel.findByIdAndDelete(req.params.id);

  res.status(200).json("Listing has been deleted ");
};

const listUpdate = async (req, res, next) => {
  const list = await ListModel.findById(req.params.id);
  if (!list) {
    return next(handleError(404, "List is not found"));
  }

  if (req.user.id !== list.userRef) {
    return next(handleError(401, "You can only update your own lists"));
  }

  const updatedList = await ListModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedList);
};

const getList = async (req, res, next) => {
  const list = await ListModel.findById(req.params.id);

  if (!list) {
    return next(handleError(404, "List is not found"));
  }

  res.status(200).json(list);
};

const getLists = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 9;
  const index = parseInt(req.query.startIndex) || 0;

  let offer = req.query.offer;
  if (offer === undefined || offer === false) {
    offer = { $in: [true, false] };
  }

  let furnished = req.query.furnished;
  if (furnished === undefined || furnished === false) {
    furnished = { $in: [true, false] };
  }

  let parking = req.query.parking;
  if (parking === undefined || parking === false) {
    parking = { $in: [true, false] };
  }

  let type = req.query.type;
  if (type === undefined || type === "all") {
    type = { $in: ["rent", "sale"] };
  }

  const searchTerm = req.query.searchTerm || "";
  const sort = req.query.sort || "createdAt";
  const order = req.query.order || "desc";

  const listing = await ListModel.find({
    name: { $regex: searchTerm, $options: "i" },
    offer,
    furnished,
    parking,
    type,
  })
    .sort({
      [sort]: order,
    })
    .limit(limit)
    .skip(index);

  if (!listing) {
    return next(handleError(404, "we can not do listing with this term"));
  }
  res.status(200).json(listing);
};

export { listCreate, listDelete, listUpdate, getList, getLists };
