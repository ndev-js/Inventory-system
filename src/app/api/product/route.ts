import { NextResponse } from "next/server";
import { requireAuth } from "../middlewares/auth";

import { NextApiRequest, NextApiResponse } from "next";

export const GET = requireAuth(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      console.log("Hello");
      return NextResponse.json({
        message: "successfully right to go product page",
      });
    } catch (error) {}
  }
);

// export default requireAuth(GET);
