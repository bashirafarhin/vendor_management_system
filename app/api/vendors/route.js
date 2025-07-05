import { VendorSchema } from "@/lib/validation/vendor/vendorSchema";
import { createVendor } from "@/lib/services/vendor.service";
import { NextResponse } from "next/server";
import Vendor from "@/lib/models/vendor.model";
import connectDB from "@/lib/db/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = VendorSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const vendor = await createVendor(parsed.data);
    return NextResponse.json({ success: true, vendor });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const pageParam = searchParams.get("page") || "1";
    const page = parseInt(pageParam, 10);
    const limit = 3;
    const skip = (page - 1) * limit;
    const vendors = await Vendor.find()
      .skip(skip)
      .limit(limit)
      .lean();
    return NextResponse.json(vendors, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch vendors" },
      { status: 500 }
    );
  }
}


export async function DELETE(req) {
  try {
    await connectDB();
    const { ids } = await req.json();
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "No vendor IDs provided for deletion." },
        { status: 400 }
      );
    }
    const result = await Vendor.deleteMany({ _id: { $in: ids } });
    return NextResponse.json(
      {
        message: `Deleted ${result.deletedCount} vendor(s) successfully.`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}