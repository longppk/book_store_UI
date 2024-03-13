import { Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import SignUp from "./form/SignUp";
import SignIn from "./form/SignIn";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Authenticate from "./page/Authenticate";
import Profile from "./page/Profile";
import ForgotPass from "./form/ForgotPass";
import 'react-loading-skeleton/dist/skeleton.css';
import ListBook from './books/ListBook';
import DetailBook from './books/DetailBook';
import Cart from './page/User/Cart';
import DefaultAdminLayout from './layout/AdminLayout/DefaultAdminLayout/DefaultAdminLayout';
import NotFoundPage from './page/404Page';

function App() {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/authenticate" element={<Authenticate></Authenticate>}></Route>
                <Route path="/profile" element={<Profile></Profile>}></Route>
                <Route path="/forgotPass" element={<ForgotPass></ForgotPass>}></Route>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route path="/admin/*" element={<DefaultAdminLayout />}></Route>
                <Route path="/list" element={<ListBook />} />
                <Route path="/detail/:bookId" element={<DetailBook />} />
                <Route path="/user/cart" element={<Cart />} />
            </Routes>
        </>
    );
}

export default App;
