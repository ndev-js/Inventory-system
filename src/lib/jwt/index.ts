import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";
import { SignOptionI } from "./types";

const DEFAULT_SIGN_OPTION: SignOptionI = {
  expiresIn: "1d",
};

export const verifyJWT = (token: string) => {
  console.log(token, "token");
  try {
    const secretKey = process.env.JWT_USER_ID_SECRET as string;
    console.log(secretKey, "secret");
    const decoded = jwt.verify(token, secretKey);
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const generateAccessToken = async (
  payload: JwtPayload,
  option: SignOptionI = DEFAULT_SIGN_OPTION
) => {
  const secretKey = process.env.ACCESS_TOKEN_SECRET as string;
  // Convert expiresIn to seconds if it's a string
  let expiresIn = option.expiresIn || DEFAULT_SIGN_OPTION.expiresIn;

  const access_token = jwt.sign(payload, secretKey, { expiresIn });

  return access_token;
};

export const verifyAccessToken = async (token: string) => {
  // try {
  console.log(token, "token extracted");
  const secretKey = process.env.ACCESS_TOKEN_SECRET as string;
  const decoded = jwt.verify(token, secretKey);
  const validity = checkTokenExpiration(decoded as JwtPayload);
  return validity;
  // } catch (error) {
  //   console.log(error, "in the catch block");
  //   return error;
  // }
};

export const checkTokenExpiration = async (decodedToken: JwtPayload) => {
  console.log(decodedToken, "decoded token");

  if (!decodedToken.exp || decodedToken.exp < Date.now() / 1000) {
    // console.log("Token is expired");
    return {
      status: false,
      errorType: "TokenExpiredError",
      message: "Token is Expired !",
      user: null,
    };
  }
  const expirationTime = decodedToken.exp ? decodedToken.exp * 1000 : 0; // Convert to milliseconds
  const remainingTime = expirationTime - Date.now();
  const remainingSeconds = Math.max(0, Math.floor(remainingTime / 1000)); // Ensure remaining time is non-negative
  console.log("Remaining time:", remainingSeconds, "seconds");

  return {
    status: true,
    message: "Successfully validated user",
    remainingTime: remainingTime,
    user: decodedToken,
  };
};
