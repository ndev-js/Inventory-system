import jwt, { JwtPayload } from "jsonwebtoken";
import { SignOptionI } from "./types";

const DEFAULT_SIGN_OPTION: SignOptionI = {
  expiresIn: "1d",
};

export const signJWT = (
  payload: JwtPayload,
  option: SignOptionI = DEFAULT_SIGN_OPTION
) => {
  const secretKey = process.env.JWT_USER_ID_SECRET as string;
  const token = jwt.sign(payload, secretKey);
  return token;
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
  const access_token = jwt.sign(payload, secretKey);

  return access_token;
};

export const verifyAccessToken = async (token: string) => {
  console.log(token, "token extracted");
  const secretKey = process.env.ACCESS_TOKEN_SECRET as string;
  const decoded = jwt.verify(token, secretKey);
  return decoded as JwtPayload;
};
