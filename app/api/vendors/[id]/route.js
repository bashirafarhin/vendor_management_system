import { NextResponse } from 'next/server';
import Vendor from '@/lib/models/vendor.model';
import connectDB from '@/lib/db/db';
import { updateVendor } from "@/lib/services/vendor.service"

export async function GET(req, { params }) {
  try {
    await connectDB();
    const vendor = await Vendor.findById(params.id);
    if (!vendor) {
      return NextResponse.json({ message: 'Vendor not found' }, { status: 404 });
    }

    return NextResponse.json(vendor, { status: 200 });
  } catch (error) {
    console.error('Error fetching vendor by ID:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
    console.log(params.id);
  try {
    const body = await req.json();
    const updated = await updateVendor(params.id, body);
    return NextResponse.json({ success: true, vendor: updated });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}