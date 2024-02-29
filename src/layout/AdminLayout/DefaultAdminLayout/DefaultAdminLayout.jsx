import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
// import Sidebar from '../Component/Sidebar';

function DefaultAdminLayout({ children }) {
    return (
        <div className="flex">
            <div className="w-2/12">
                <Sidebar />
            </div>
            <div className="w-10/12 mt-20">
                <Header />
                <div className="pl-10">{children}</div>
            </div>
        </div>
    );
}

export default DefaultAdminLayout;
