import { config } from 'dotenv';

config();

const requiredEnvVariables = [
  'PAYPAY_CLIENT_ID',
  'PAYPAY_CLIENT_SECRET',
  'PAYPAY_MERCHANT_ID',
  'STRIPE_SECRET_KEY',
];

requiredEnvVariables.forEach((variable) => {
  if (!process.env[variable]) {
    throw new Error(`${variable} must be set.`);
  }
});

export const PAYPAY_CLIENT_ID = process.env.PAYPAY_CLIENT_ID!;
export const PAYPAY_CLIENT_SECRET = process.env.PAYPAY_CLIENT_SECRET!;
export const PAYPAY_MERCHANT_ID = process.env.PAYPAY_MERCHANT_ID!;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
