import { Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Authenticate from "./page/Authenticate";
import Profile from "./page/Profile";

import ForgotPass from "./components/form/ForgotPass";
import OrderHistory from "./module/profile/OrderHistory";


function App() {
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/authenticate" element={<Authenticate></Authenticate>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/forgotPass" element={<ForgotPass></ForgotPass>}></Route>
        <Route path="/orderHistory" element={<OrderHistory></OrderHistory>}></Route>
      </Routes>
    </>
  );
}

export default App;
