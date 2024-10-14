export const PROTECTED_PAGES = ["/chat", "/admin", "/profile"];

export const BACKEND_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000"
    : process.env.NEXT_PUBLIC_BASE_URL;

export const STRIPE_Pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const PRICE_ID =
  process.env.NODE_ENV !== "production"
    ? "price_1OZbkPJHPrBY6EDQY3VVjwGK"
    : process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;

export const authConfig = {
  meEndpoint: "/auth/me",
  loginEndpoint: "/jwt/registration",
  registerEndpoint: "/jwt/register",
  storageTokenKeyName: "accessToken",
  onTokenExpiration: "refreshToken", // logout | refreshToken
  afterLogin: "/profile",
  afterSignup: "/payment",
};

export const PUBLIC_URL = "https://askusat.co.uk";

export const MAILTO = "paulinnocent05@gmail.com";

export const AMOUNT_FOR_CALL_REQUEST = 50;
