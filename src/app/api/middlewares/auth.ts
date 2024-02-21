import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { verifyAccessToken } from "@/lib/jwt";
export function requireAuth(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const access_token = headers().get("authorization");
    console.log(access_token, "before extraction");
    const extract_Token = access_token?.split(" ")[1] as string;
    console.log(extract_Token, "extracted");
    if (!access_token) {
      return NextResponse.json({ error: "Unauthorized" });
    }
    try {
      const secret = process.env.ACCESS_TOKEN_SECRET as string;
      const decodedToken = verifyAccessToken(extract_Token);
      console.log(decodedToken, "decoded");
      //   const email = (decodedToken as any).email
      //   (req as any).email = email;
      return await handler(req, res);
    } catch (error) {
      console.log(error);
      if (error instanceof TokenExpiredError) {
        return NextResponse.json({ error: "Unauthorized: Token expired" });
      } else if (error instanceof JsonWebTokenError) {
        return NextResponse.json({ error: "Unauthorized: Invalid token" });
      } else {
        return NextResponse.json({
          error: "Unauthorized: Token verification failed",
        });
      }
    }
  };
}
