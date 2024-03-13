// import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
// import { NextResponse } from "next/server";
// import { headers } from "next/headers";
// import { verifyAccessToken } from "@/lib/jwt";
// export function requireAuth(handler: NextApiHandler) {
//   return async (req: NextApiRequest, res: NextApiResponse) => {
//     const access_token = headers().get("authorization");
//     console.log(access_token, "before extraction");
//     const extract_Token = access_token?.split(" ")[1] as string;
//     console.log(extract_Token, "extracted");
//     if (!access_token) {
//       return NextResponse.json({ error: "Unauthorized" });
//     }
//     try {
//       const hasVerified = await verifyAccessToken(extract_Token);
//       console.log(hasVerified, "hasVerified");

//       //   const email = (decodedToken as any).email
//       //   (req as any).email = email;
//       console.log(res, "res");
//       return await handler(req, res);
//     } catch (error) {
//       console.log(error);
//       if ((error as AuthError).errorType === "TokenExpiredError") {
//         return NextResponse.json({ error: "Unauthorized: Token expired" });
//       }
//       // Check if the error is a JsonWebTokenError
//       if ((error as AuthError).errorType === "JsonWebTokenError") {
//         return NextResponse.json({ error: "Unauthorized: Invalid token" });
//       }

//       // For other errors, return a generic error message
//       return NextResponse.json({
//         error: "Unauthorized: Token verification failed",
//       });
//     }
//   };
// }

type AuthError = {
  errorType: "TokenExpiredError" | "JsonWebTokenError";
};
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { verifyAccessToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export function requireAuth(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return NextResponse.json({ error: "Unauthorized" });
    }

    // Extract token from authorization header
    const token = authorizationHeader.split(" ")[1];

    try {
      const isVerified = await verifyAccessToken(token);
      console.log(isVerified, "isverified");
      if (!isVerified.status) {
        console.log(isVerified, "helloe");
        return NextResponse.json({ error: "Unauthorized: Token expired" });
      }

      return handler(req, res);
    } catch (error) {
      console.log(error, "errors");
      if (error instanceof TokenExpiredError) {
        return NextResponse.json({ error: "Unauthorized: Token expired" });
      } else if (error instanceof JsonWebTokenError) {
        return NextResponse.json({ error: "Unauthorized: Invalid token" });
      } else {
        // Handle other potential errors (optional)
        console.error("Unexpected error during token verification:", error);
        return NextResponse.json({ error: "Internal Server Error" });
      }
    }
  };
}
