import jwt from 'jsonwebtoken';
import { privateKey, publicKey } from '../../../config/config';

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'HS256',
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.log(e);
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}
