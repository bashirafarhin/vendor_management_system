import connectDB from "../db/db";
import Vendor from "../models/vendor.model";

export async function getVendors(page = 1, limit = 10) {
  await connectDB();
  const skip = (page - 1) * limit;
  const vendors = await Vendor.find().skip(skip).limit(limit);
  const total = await Vendor.countDocuments();
  return { vendors, total };
}

export async function getVendorById(id) {
  await connectDB();
  return await Vendor.findById(id);
}

export async function createVendor(data) {
  await connectDB();
  const vendor = new Vendor(data);
  return await vendor.save();
}

export async function updateVendor(id, data) {
  await connectDB();
  return await Vendor.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteVendor(id) {
  await connectDB();
  return await Vendor.findByIdAndDelete(id);
}