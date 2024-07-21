import axios from "axios";
import httpStatus from "http-status";
import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Context {
  handleRegister?: (name: string, username: string, password: string) => Promise<string | undefined>; // Define correct signature for handleRegister
  handleLogin?: (username: string, password: string) => Promise<string | undefined>;
  userData?: object;
  setUserData?: (data: object) => void; // Optional setter with typed data
}
export const AuthContext = createContext<Context>({});

const client = axios.create({
  baseURL: "http://localhost:8000/api/v1/users",
  headers: {
    "Content-Type": "application/json",
  },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState<object | undefined>(authContext);
  const router = useNavigate();

  const handleRegister = async (name: string, username: string, password: string) => {
    try {
      const response = await client.post("/register", {
        name,
        username,
        password,
      });

      if (response.status === httpStatus.CREATED) {
        return response.data.message;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await client.post("/login", {
        username,
        password,
      });

      if (response.status === httpStatus.OK) {
        localStorage.setItem("vc-token", response.data.token);
        router("/home");
        return response.data.message;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
