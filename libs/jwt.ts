import jwt from "jsonwebtoken";

export const createJWT = (payload: string | object | Buffer) => {
  return new Promise((resolve, reject) => {
    jwt.sign( payload, process.env.JWT_SECRET, { expiresIn: "1d"},
    (err, token) => err ? reject(err) : resolve(token))
  });
}