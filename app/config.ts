

export const PRICE_ID = 'price_1OM5DLFl4zfP5z2zZGNq9ljz'

export const authConfig = {
    meEndpoint: '/auth/me',
    loginEndpoint: '/jwt/login',
    registerEndpoint: '/jwt/register',
    storageTokenKeyName: 'accessToken',
    onTokenExpiration: 'refreshToken', // logout | refreshToken
    afterLogin: '/profile',
    afterSignup: '/signup#payment',
};