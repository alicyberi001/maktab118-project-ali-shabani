import toast from "react-hot-toast";
import { getSessionToken, setSessionToken } from "./session_manager";
import { generateToken } from "@/api/auth.service";


export const errorHandler = async(error: any) => {
    const message = error.message;
    if (typeof message === "string") {
      toast.error(message);
    } else if (Array.isArray(message)) {
      for (const msgText of message) {
        toast.error(msgText);
      }
    }
  
    const statusCode = Number(error.status);
    if (statusCode === 403) {
      toast.error("please wait...");
      const {rtoken} = getSessionToken()
      const {token} = await generateToken(rtoken as string)
      setSessionToken(token.accessToken, rtoken as string)
    }
  };