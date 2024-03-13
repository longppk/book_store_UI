import Breadcrumb from '../../../components/Breadcrumb';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import { adminRoutes } from '../../../routes';
import { Route, Routes } from 'react-router-dom';
// import Sidebar from '../Component/Sidebar';

function DefaultAdminLayout() {
    return (
        <div className="flex">
            <div className="w-2/12">
                <Sidebar />
            </div>
            <div className="w-10/12 mt-20">
                <Header />
                <div className="pl-10 ">
                    <Breadcrumb />
                    <Routes>
                        {adminRoutes.map(
                            ({ layout, pages }) =>
                                layout === 'dashboard' &&
                                pages.map(({ path, element }) => <Route exact path={path} element={element} />),
                        )}
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default DefaultAdminLayout;
