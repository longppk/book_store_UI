import { useSelector } from 'react-redux';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import { selectUser } from '../store/userSlice';
import HomePage from '../page/HomePage';
import Profile from '../page/Profile';
import ForgotPass from '../form/ForgotPass';
import NotFoundPage from '../page/404Page';
import DefaultAdminLayout from '../layout/AdminLayout/DefaultAdminLayout/DefaultAdminLayout';
import ListBook from '../books/ListBook';
import DetailBook from '../books/DetailBook';
import Cart from '../page/User/Cart';
import SignIn from '../form/SignIn';
import Payment from '../page/User/Payment';
import Authenticate from '../page/Authenticate';
import OrderHistory from '../module/profile/OrderHistory';

function Routing() {
    const { isAuthenticated } = useSelector(selectUser);

    return (
        <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" exact element={<HomePage />} />
            <Route path="/authenticate" exact element={<Authenticate/>} />
            <Route path="/forgotPass" element={<ForgotPass />}></Route>
            <Route path="/admin/*" element={<DefaultAdminLayout />} />
            <Route path='/orderHistory' element={<OrderHistory/>}></Route>
            <Route
                path="/profile"
                element={isAuthenticated ? <Profile /> : <Navigate to={'/authenticate'} replace={true} />}
            />
            {/* <Route
                path="/admin/*"
                element={isAuthenticated ? <DefaultAdminLayout /> : <Navigate to={'/authenticate'} replace={true} />}
            /> */}
            <Route path="/list" element={<ListBook />} />
            <Route path="/detail/:bookId" element={<DetailBook />} />
            <Route path="/payment" element={<Payment />} />
            <Route
                path="/user/cart"
                element={isAuthenticated ? <Cart /> : <Navigate to={'/authenticate'} replace={true} />}
            />
        </Routes>
    );
}
export default Routing;
