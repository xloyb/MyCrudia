import { createContext, useContext, useEffect, useState } from "react";
import axios, { mergeConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import { Try } from "expo-router/build/views/Try";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
  };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt";

export const API_URL = "http://localhost:3000/api/auth";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const register = async (email: string, password: string) => {
    try{
       return await axios.post(`${API_URL}/register`, {
            email,
            password,
        });
        
    }catch(e){
        return {error: true, msg:(e as any).response.data.msg || "An error occurred"};
    }
  };
const value = {
    onRegister: register,
};

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

