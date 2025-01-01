import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface TanstackProviderProps {
  children: React.ReactNode;
}

export const ToastifyProvider: React.FC<TanstackProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};
