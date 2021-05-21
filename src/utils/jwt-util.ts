import jwt, { SignOptions } from "jsonwebtoken";
import { TokenDecoded } from "../interfaces";

const generateToken = (payload: string | any | Buffer, options: SignOptions): Promise<string> => new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET, options || { noTimestamp: true }, (err, token) => {
        if (err) {
            reject(err);
        } else {
            resolve(token);
        }
    });
});

const verifyToken = (token: string): Promise<TokenDecoded> => new Promise(((resolve, reject) => {
    jwt.verify(token, process.env.SECRET, (err: Error, decoded: TokenDecoded) => {
        if (err) {
            reject(err);
        } else {
            resolve(decoded);
        }
    });
}));
export {
    generateToken,
    verifyToken
};
