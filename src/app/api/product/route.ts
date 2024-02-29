import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../middlewares/auth";
import { NextApiRequest, NextApiResponse } from "next";

export const GET = requireAuth(async (req: NextApiRequest) => {
  try {
    console.log("Hello");
    // Access user information via req (if needed after successful verification)
    // const email = (req as any).email; // assuming email stored in req after verification

    return NextResponse.json({
      message: "Successfully authorized to access product page",
    });
  } catch (error) {
    // This catch block handles unexpected errors in the route handler itself
    console.error("Unexpected error in route handler:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
});
