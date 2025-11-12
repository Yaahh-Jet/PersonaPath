import dotenv from 'dotenv';
dotenv.config();
export const JWT_SECRET = (process.env.JWT_SECRET || 'dev_jwt_secret_change_this_in_production').trim();