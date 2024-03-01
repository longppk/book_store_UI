import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa6';
import { BiSort } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDebounce, useNotify } from '../../hooks';

const deF = (e) => {};

function NormalTable({ name, labels, data, pagination, sort, onNextPage = deF, onPrevPage = deF, onSearch = deF }) {
    const [paginationInfo, setPaginationInfo] = useState(pagination);
    const notify = useNotify();
    const [searchValue, setSearchValue] = useState('');
    const debounce = useDebounce(searchValue, 500);
    const { pathname } = useLocation();
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        onSearch(debounce);
    }, [debounce]);

    const handleNextPage = () => {
        if (paginationInfo.currentPage + 1 <= paginationInfo.totalPage) {
            onNextPage(paginationInfo.currentPage + 1);
            setPaginationInfo((prev) => ({
                ...prev,
                currentPage: prev.currentPage + 1,
            }));
        } else {
            notify('This is the last page!', 'error!');
        }
    };

    const handlePrevPage = () => {
        if (paginationInfo.currentPage - 1 > 0) {
            onPrevPage(paginationInfo.currentPage - 1);
            setPaginationInfo((prev) => ({
                ...prev,
                currentPage: prev.currentPage - 1,
            }));
        } else {
            notify('This is the first page!', 'error');
        }
    };
    return (
        <div className="p-3 relative overflow-x-auto shadow-md bg-white sm:rounded-lg">
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                <div className="">
                    <button
                        type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                        Sort
                        <BiSort className="w-3.5 h-3.5 ms-2" />
                    </button>
                    <Link
                        to={pathname + '/add'}
                        className="focus:outline-none text-white bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:ring-purple-300 font-semibold rounded-lg text-sm inline-flex items-center me-2 px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                    >
                        <FaPlus className="w-3.5 h-3.5 me-2" />
                        Add new {name}
                    </Link>
                </div>
                <label htmlFor="table-search" className="sr-only">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchValue}
                        className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for items"
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">
                                    checkbox
                                </label>
                            </div>
                        </th>
                        {labels &&
                            labels.map((label) => (
                                <th key={label} scope="col" className="px-6 py-3">
                                    {label}
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        labels &&
                        data.map((dataItem) => (
                            <tr
                                key={dataItem.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            id="checkbox-table-search-1"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                <th
                                    scope="row"
                                    className="w-96 line-clamp-1 whitespace-nowrap text-ellipsis px-6 py-4 font-medium text-gray-900 dark:text-white"
                                >
                                    {dataItem[labels[0]]}
                                </th>
                                {labels.slice(1, labels?.length - 1).map((label) => (
                                    <td key={label} className="px-6 py-4">
                                        {dataItem[label]}
                                    </td>
                                ))}
                                <td className="px-6 py-4">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </a>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="flex place-content-between items-center mt-5">
                <div className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500">
                    Page {pagination.currentPage} of {pagination.totalPage}
                </div>
                <div className="flex">
                    <button
                        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={handlePrevPage}
                    >
                        Previous
                    </button>
                    <button
                        className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={handleNextPage}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

NormalTable.prototype = {
    labels: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    sort: PropTypes.bool,
    onNextPage: PropTypes.func,
    onPrevPage: PropTypes.func,
    onSearch: PropTypes.func,
};

export default NormalTable;
