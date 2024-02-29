import { Store } from "@/lib/database/models/store.model";
import { StoreI } from "@/lib/types/Store.types";
import { requireAuth } from "../middlewares/auth";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";
import formidable from "formidable";
import { Fields, Files, IncomingForm } from "formidable";
const form = new IncomingForm({ multiples: true });
type FormidableFields = Fields & { file?: Files };
export const config = {
  api: {
    bodyParser: false, // Disable default body parser for form data
  },
};
export const POST = requireAuth(async (req: NextApiRequest) => {
  try {
    const {} = await new Promise<FormidableFields>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        return resolve({ fields, files });
      });
    });
    return NextResponse.json({ message: "All rights to you " });
  } catch (error) {
    console.log(error);
    return null;
  }
});
