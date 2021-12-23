export const server_url = process.env.SERVER_URL || 'http://localhost:1337/';
export const port = (process.env.PORT as unknown as number) || 1337;
export const dbUri =
  process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/NXMeasurement';
export const saltWorkFactor = 10;
export const accessTokenTtl = '15m';
export const refreshTokenTtl = '1y';
export const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';
export const publicKey = process.env.PUBLIC_KEY || '34321hjhdu1adsgs';
export const privateKey = process.env.PRIVATE_KEY || 'dsew45345g542fdq1';
