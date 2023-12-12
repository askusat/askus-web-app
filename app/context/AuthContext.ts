

// ** React Imports
import React from 'react';
import { createContext } from 'react'
import { LoginParam, SignUpParam } from './AuthProvider';

export type User = {
  id: number;
  authUserId: string;
  email: string;
  fullName: string;
  isSubscribed: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: any;
} | null;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  signup: (params: SignUpParam, errorCallback: (error: any) => void, setProcessingSignUp: React.Dispatch<React.SetStateAction<boolean>>) => void;
  login: (params: LoginParam, errorCallback: (error: any) => void, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
  logout: () => void;
}

export const defaultProvider: AuthContextType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => false,
  signup: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => {}
};

const AuthContext = createContext<AuthContextType>(defaultProvider)

export { AuthContext }
