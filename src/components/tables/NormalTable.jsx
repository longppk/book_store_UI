import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa6';
import { BiSort } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState, Fragment } from 'react';
import { useDebounce } from '../../hooks';
import classNames from 'classnames';
import DeleteDialog from './DeleteDialog';
import { PiCaretUpDown } from 'react-icons/pi';
import { IoMdCheckmark } from 'react-icons/io';
import { Listbox, Transition } from '@headlessui/react';

const sizes = [
    { label: 'Size: 7', value: 7 },
    { label: 'Size: 14', value: 14 },
    { label: 'Size: 20', value: 20 },
    { label: 'Size: 50', value: 50 },
    { label: 'Size: 100', value: 100 },
];

const deF = (e) => {};

function NormalTable({
    name,
    labels,
    data,
    pagination,
    sort,
    deleteBtn = true,
    addBtn = true,
    actionCol = true,
    onNextPage = deF,
    onPrevPage = deF,
    onSearch = deF,
    onCheck = deF,
    onDelete = deF,
    onSelectSize = deF,
}) {
    const [paginationInfo, setPaginationInfo] = useState(pagination);
    // const notify = useNotify();
    const [searchValue, setSearchValue] = useState('');
    const [listItemChecked, setListItemChecked] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentPageClick, setCurrentPageClick] = useState(() => ({ nextPageTotal: 0, prevPageTotal: 0 }));
    const debounce = useDebounce(searchValue, 500);
    const currentPageChange = useDebounce(currentPageClick, 500);
    const { pathname } = useLocation();
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };
    const [selected, setSelected] = useState(sizes[0]);

    useEffect(() => {
        onSearch(debounce);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounce]);

    useEffect(() => {
        if (paginationInfo.currentPage + currentPageChange.nextPageTotal <= paginationInfo.totalPage) {
            onNextPage(paginationInfo.currentPage + currentPageChange.nextPageTotal);
            setPaginationInfo((prev) => ({
                ...prev,
                currentPage: prev.currentPage + currentPageChange.nextPageTotal,
            }));
            setCurrentPageClick((prev) => ({
                ...prev,
                nextPageTotal: 0,
            }));
        } else {
            onNextPage(paginationInfo.totalPage);
            setPaginationInfo((prev) => ({
                ...prev,
                currentPage: paginationInfo.totalPage,
            }));
            setCurrentPageClick((prev) => ({
                ...prev,
                nextPageTotal: 0,
            }));
            // notify('This is the last page!', 'error');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPageChange.nextPageTotal]);

    useEffect(() => {
        if (paginationInfo.currentPage - currentPageChange.prevPageTotal > 0) {
            onPrevPage(paginationInfo.currentPage - currentPageChange.prevPageTotal);
            setPaginationInfo((prev) => ({
                ...prev,
                currentPage: prev.currentPage - currentPageChange.prevPageTotal,
            }));
            setCurrentPageClick((prev) => ({
                ...prev,
                nextPageTotal: 0,
            }));
        } else {
            onPrevPage(1);
            setPaginationInfo((prev) => ({
                ...prev,
                currentPage: 1,
            }));
            setCurrentPageClick((prev) => ({
                ...prev,
                nextPageTotal: 0,
            }));
            // notify('This is the first page!', 'error');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPageChange.prevPageTotal]);
    // useEffect(() => {
    //     setPaginationInfo(pagination);
    //     setCurrentPageClick(pagination.currentPage);
    // }, [pagination]);

    const handleSelectSize = (sizeInfo) => {
        setSelected(sizeInfo);
        setPaginationInfo((prev) => ({
            ...prev,
            currentPage: 1,
            size: sizeInfo.value,
        }));
        onSelectSize(sizeInfo.value);
    };

    const handleNextPage = () => {
        setCurrentPageClick((prev) => ({
            ...prev,
            nextPageTotal: prev.nextPageTotal + 1,
        }));
    };

    const handlePrevPage = () => {
        setCurrentPageClick((prev) => ({
            ...prev,
            prevPageTotal: prev.prevPageTotal + 1,
        }));
    };

    const handleCheckAll = () => {
        if (!isCheckAll) {
            const listIds = data.map((item) => item.id);
            setListItemChecked(listIds);
            onCheck(listIds);
        } else {
            setListItemChecked([]);
            onCheck([]);
        }
        setIsCheckAll((prev) => !prev);
    };

    const handleCheck = (id) => {
        let listIds;
        if (listItemChecked.includes(id)) {
            listIds = listItemChecked.filter((item) => item !== id);
        } else {
            listIds = [...listItemChecked, id];
        }
        if (listIds?.length === data?.length) {
            setIsCheckAll(true);
        } else {
            setIsCheckAll(false);
        }
        setListItemChecked(listIds);
        onCheck(listIds);
    };

    const handleToggleDeleteDialog = useCallback(() => {
        setIsDeleteDialogOpen((prev) => !prev);
    }, []);

    const handleDeleteBooks = useCallback(() => {
        onDelete();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listItemChecked]);

    return (
        <div className="p-3 relative overflow-x-auto shadow-md bg-white sm:rounded-lg">
            <DeleteDialog
                isOpen={isDeleteDialogOpen}
                onClose={handleToggleDeleteDialog}
                onConfirm={handleDeleteBooks}
            />
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                <div className="flex gap-x-2">
                    <button
                        type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                        Sort
                        <BiSort className="w-3.5 h-3.5 ms-2" />
                    </button>
                    <div className="w-32">
                        <Listbox value={selected} onChange={handleSelectSize}>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">{selected.label}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <PiCaretUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        {sizes.map((size, sizeIdx) => (
                                            <Listbox.Option
                                                key={sizeIdx}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active ? 'bg-gray-100 text-purple-500' : 'text-gray-900'
                                                    }`
                                                }
                                                value={size}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${
                                                                selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                        >
                                                            {size.label}
                                                        </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-300">
                                                                <IoMdCheckmark className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    {addBtn && (
                        <Link
                            to={pathname + '/add'}
                            className="focus:outline-none text-white bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:ring-purple-300 font-semibold rounded-lg text-sm inline-flex items-center me-2 px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        >
                            <FaPlus className="w-3.5 h-3.5 me-2" />
                            Add new {name}
                        </Link>
                    )}
                    {deleteBtn && (
                        <div>
                            <button
                                type="button"
                                className={classNames(
                                    'text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center',
                                    {
                                        'bg-red-300 dark:bg-red-500 cursor-not-allowed': listItemChecked?.length === 0,
                                        'bg-red-500 dark:bg-red-700 cursor-pointer ': listItemChecked?.length !== 0,
                                    },
                                )}
                                disabled={listItemChecked?.length === 0}
                                onClick={handleToggleDeleteDialog}
                            >
                                Delete
                            </button>
                        </div>
                    )}
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
                                    checked={isCheckAll}
                                    onChange={handleCheckAll}
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
                                            checked={listItemChecked.includes(dataItem.id)}
                                            onChange={() => handleCheck(dataItem.id)}
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
                                {actionCol &&
                                    labels.slice(1, labels?.length - 1).map((label) => (
                                        <td key={label} className="px-6 py-4">
                                            {dataItem[label]}
                                        </td>
                                    ))}
                                {!actionCol &&
                                    labels.slice(1, labels?.length).map((label) => (
                                        <td key={label} className="px-6 py-4">
                                            {dataItem[label]}
                                        </td>
                                    ))}
                                {actionCol && (
                                    <td className="px-6 py-4">
                                        <Link
                                            to={pathname + '/edit/' + dataItem.id}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                )}
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
    onSelectSize: PropTypes.func,
};

export default NormalTable;
