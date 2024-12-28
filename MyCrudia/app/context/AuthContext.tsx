import { createContext, useContext, useEffect, useState } from "react";
import axios, { mergeConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import { MY_API_URL, MY_TOKEN_KEY } from "@env";


interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
  };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = process.env.MY_TOKEN_KEY || 'auth_token';
console.log("------------------- testing TOKEN_KEY output:",TOKEN_KEY);

//export const API_URL = "https://73f1-160-158-216-86.ngrok-free.app/api/auth";

export const API_URL = `${process.env.MY_API_URL}/auth` || "http://localhost:3000/api/auth";
console.log("------------------- testing API_URL output:",API_URL);

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

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token) {
          setAuthState({
            token,
            authenticated: true,
          });
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          setAuthState({
            token: null,
            authenticated: false,
          });
        }
      } catch (e) {
        console.error("Error loading token:", e);
      }
    };

    loadToken();
  }, []);

  //   const register = async (email: string, password: string) => {
  //     try{
  //        return await axios.post(`${API_URL}/register`, {
  //             email,
  //             password,
  //         });

  //     }catch(e){
  //         return {error: true, msg:(e as any).response.data.msg || "An error occurred"};
  //     }
  //   };

  //   const login = async (email: string, password: string) => {
  //     try{
  //        const result = await axios.post(`${API_URL}/login`, {
  //             email,
  //             password,
  //         });

  //         setAuthState({
  //             token: result.data.token,
  //             authenticated: true,
  //         });

  //         axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;
  //         await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
  //         return result;
  //     }catch(e){
  //         return {error: true, msg:(e as any).response.data.msg || "An error occurred"};
  //     }
  //   };

  const register = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/register`, {
        email,
        password,
      });

      if (result.data.token) {
        setAuthState({
          token: result.data.token,
          authenticated: true,
        });

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${result.data.token}`;
        await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
        return { error: false, msg: "Registration successful" };
      }

      return { error: false, msg: "Registration successful. Please log in." };
    } catch (e) {
      return {
        error: true,
        msg: (e as any).response.data.msg,
      };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      console.log("authContext: result in the login", result);

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

      return { error: false, msg: "Login successful" }; // Return a uniform response
    } catch (e) {
      return {
        error: true,
        msg: (e as any).response?.data?.msg || "An error occurred",
      };
    }
  };

  const logout = async () => {
    try {
      setAuthState({
        token: null,
        authenticated: false,
      });
      delete axios.defaults.headers.common["Authorization"];
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (e) {
      return {
        error: true,
        msg: (e as any).response.data.msg || "An error occurred",
      };
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
