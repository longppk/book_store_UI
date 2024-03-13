import { Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import HomePage from "./page/HomePage";
import SignUp from "./form/SignUp";
import SignIn from "./form/SignIn";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Authenticate from "./page/Authenticate";
import Profile from "./page/Profile";
import ForgotPass from "./form/ForgotPass";

function App() {
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/authenticate" element={<Authenticate></Authenticate>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/forgotPass" element={<ForgotPass></ForgotPass>}></Route>
      </Routes>
    </>
  );
}

export default App;
