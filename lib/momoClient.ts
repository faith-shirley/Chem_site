import { create } from 'mtn-momo';
export const momo = create({ callbackHost: process.env.CALLBACK_HOST! });

// Collections client
export const collections = momo.Collections({
  primaryKey: process.env.MOMO_PRIMARY_KEY!,
  userSecret: process.env.MOMO_USER_SECRET!,
  userId: process.env.MOMO_USER_ID!,
});