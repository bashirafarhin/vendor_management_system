import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: [true, "Vendor Name is required"],
      trim: true,
    },
    bankAccountNumber: {
      type: String,
      required: [true, "Bank Account Number is required"],
      match: [/^\d+$/, "Bank Account Number must be numeric"],
    },
    bankName: {
      type: String,
      required: [true, "Bank Name is required"],
    },
    addressLine1: {
      type: String,
      default: "",
    },
    addressLine2: {
      type: String,
      required: [true, "Address Line 2 is required"],
    },
    city: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    zipCode: {
      type: String,
      match: [/^\d{4,6}$/, "Zip Code must be between 4 to 6 digits"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.models?.Vendor || mongoose.model("Vendor", vendorSchema);
export default Vendor;