

export const BACKEND_URL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8000'
    : process.env.NEXT_PUBLIC_BASE_URL;

export const STRIPE_Pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

export const PRICE_ID = 'price_1OM5DLFl4zfP5z2zZGNq9ljz'

export const authConfig = {
    meEndpoint: '/auth/me',
    loginEndpoint: '/jwt/login',
    registerEndpoint: '/jwt/register',
    storageTokenKeyName: 'accessToken',
    onTokenExpiration: 'refreshToken', // logout | refreshToken
    afterLogin: '/profile',
    afterSignup: '/payment',
};
