import { GrUserAdmin } from 'react-icons/gr';
import { FaChevronRight } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

function Breadcrumb() {
    const { pathname } = useLocation();
    const listBreadcrumb = pathname.split('/').slice(2);
    const findIndexValue = (value) => {
        return listBreadcrumb.findIndex((it) => it === value);
    };
    const generatePath = (value) => {
        if (listBreadcrumb?.length > 1) {
            if (value === listBreadcrumb[0]) {
                return '/admin/' + listBreadcrumb.slice(0, 2).join('/');
            }
            return '/admin/' + listBreadcrumb.slice(0, findIndexValue(value) + 1).join('/');
        } else {
            return '/admin/' + listBreadcrumb.slice(0, findIndexValue(value) + 1).join('/');
        }
    };

    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <Link
                        to="/admin/dashboard"
                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-purple-500 dark:text-gray-400 dark:hover:text-white"
                    >
                        <GrUserAdmin className="size-4 me-2.5" />
                        Admin
                    </Link>
                </li>
                {listBreadcrumb.map((item, index) => {
                    if (index === listBreadcrumb.length - 1) {
                        return (
                            <li aria-current="page" key={item}>
                                <div className="flex items-center">
                                    <FaChevronRight className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" />
                                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                        {item}
                                    </span>
                                </div>
                            </li>
                        );
                    } else {
                        return (
                            <li key={item}>
                                <div className="flex items-center">
                                    <FaChevronRight className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" />
                                    <Link
                                        to={generatePath(item)}
                                        className="ms-1 text-sm font-medium text-gray-700 hover:text-purple-500 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        {item}
                                    </Link>
                                </div>
                            </li>
                        );
                    }
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumb;
