// lib/models/vendorModel.js
import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    vendorName: { type: String, required: true },
    bankAccountNumber: { type: String, required: true },
    bankName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.models?.Vendor || mongoose.model("Vendor", vendorSchema);
export default Vendor;
