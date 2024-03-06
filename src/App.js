import { Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';
import DashBoardAdmin from './page/Admin/dashboard';
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookTable from './page/Admin/Table/Book/BookTable';
import AddNewBook from './page/Admin/Table/Book/AddNewBook';
import EditBook from './page/Admin/Table/Book/EditBook';

function App() {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route path="/admin/dashboard" element={<DashBoardAdmin />}></Route>
                <Route path="/admin/table/book" element={<BookTable />}></Route>
                <Route path="/admin/table/book/add" element={<AddNewBook />} />
                <Route path="/admin/table/book/edit/:bookId" element={<EditBook />} />
            </Routes>
        </>
    );
}

export default App;
