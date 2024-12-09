import { useDispatch } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { setuserProfile } from "./redux/slices/userProfileSlice";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setuserProfile({ name: "kiran" }));
    }, 10000);
  }, []);
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
