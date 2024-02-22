import { Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import HomePage from './page/HomePage';
import DashBoardAdmin from './page/Admin/dashboard';
import BookTable from './page/Admin/Table/BookTable';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/admin/dashboard" element={<DashBoardAdmin />}></Route>
            <Route path="/admin/table/book" element={<BookTable />}></Route>
        </Routes>
    );
}

export default App;
