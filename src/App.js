import { Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
