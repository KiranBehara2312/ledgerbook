import { useDispatch } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { setuserProfile } from "./redux/slices/userProfileSlice";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";

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
      </BrowserRouter>
    </>
  );
}

export default App;
