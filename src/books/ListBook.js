import React, { Fragment, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { FaStarHalfAlt } from 'react-icons/fa';
import 'swiper/scss';
import axios from 'axios';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import { IoMdCheckmark } from 'react-icons/io';
import { Listbox, Transition } from '@headlessui/react';
import { PiCaretUpDown } from 'react-icons/pi';
import { useNotify } from '../hooks';

const BookCardStyles = styled.section`
    padding: 20px 10px;
    width: 260px;
    height: 400px;
    .book-img {
        width: 260px;
        height: 200px;
    }
    .book-content {
        background-color: #fff;
        padding: 10px 37px;
        height: 140px;
        .book-title {
            font-size: 20px;
            margin: 5px 0;
            cursor: pointer;
            color: #333333;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
        }
        .book-price {
            color: #c92127;
            font-weight: 600;
            line-height: 1.6rem;
        }
        .book-rating {
            display: flex;
            color: #f6a500;
            .book-total-rating {
                padding-left: 5px;
                font-size: 14px;
                color: #cdcfd0;
            }
        }
    }
`;
const sizes = [
    { label: 'Size: 6', value: 6 },
    { label: 'Size: 12', value: 12 },
    { label: 'Size: 20', value: 20 },
    { label: 'Size: 50', value: 50 },
    { label: 'Size: 100', value: 100 },
];
const arrComment = [
    {
        id: 1,
        bookId: 1,
        rating: 4,
        description: 'abbcsjcsđsk',
    },
    {
        id: 2,
        bookId: 1,
        rating: 4,
        description: 'abbcsjcsđsk',
    },
    {
        id: 3,
        bookId: 1,
        rating: 5,
        description: 'abbcsjcsđsk',
    },
    {
        id: 4,
        bookId: 1,
        rating: 4,
        description: 'abbcsjcsđsk',
    },
    {
        id: 5,
        bookId: 1,
        rating: 5,
        description: 'abbcsjcsđsk',
    },
];
function ListBook() {
    const [listBook, setListbook] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [selected, setSelected] = useState(sizes[0]);
    const [paginationInfo, setPaginationInfo] = useState();
    const [paginationData, setPaginationData] = useState([]);
    const notify = useNotify();
    const [sizeData, setSizeData] = useState(6);
    const { search } = location.state || {};
    console.log(search);

    useEffect(() => {
        const fetchListBook = async () => {
            try {
                const resp = await axios.get('http://localhost:8080/api/user/book/pagination', {
                    params: {
                        title: search ? search : '',
                        size: sizeData,
                        currentpage: paginationData.currentPage,
                    },
                });
                console.log(resp.data);
                setListbook(resp.data);
                setPaginationData(resp.data.pagination);
            } catch (e) {
                console.log(e);
            }
        };
        fetchListBook();
    }, [search, sizeData, paginationData.currentPage]);

    const calculateAverageRating = (comments) => {
        if (comments.length === 0) return 0;

        const totalRating = comments.reduce((accumulator, comment) => {
            return accumulator + comment.rating;
        }, 0);

        return totalRating / comments.length;
    };

    const averageRating = calculateAverageRating(arrComment);
    const goToBookDetail = (bookId) => {
        // alert(bookId);
        navigate(`/detail/${bookId}`);
    };
    // console.log(listBook.data);

    const handleSelectSize = (sizeInfo) => {
        setSelected(sizeInfo);
        setPaginationInfo((prev) => ({
            ...prev,
            currentPage: 1,
            size: sizeInfo.value,
        }));
        console.log(sizeInfo.value);
        // console.log(selected.value);
        setSizeData(sizeInfo.value);
    };
    const handleNextPage = () => {
        if (paginationData.currentPage < paginationData.totalPage) {
            setPaginationData((prev) => ({
                ...prev,
                currentPage: prev.currentPage + 1,
            }));
        } else {
            notify('This is the last page!', 'error');
        }
    };

    const handlePrevPage = () => {
        if (paginationData.currentPage > 1) {
            setPaginationData((prev) => ({
                ...prev,
                currentPage: prev.currentPage - 1,
            }));
        } else {
            notify('This is the first page!', 'error');
        }
    };
    return (
        <>
            <Header />
            <div className="w-32 pt-20 ml-40">
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
            <div className="flex place-content-between items-center mt-5">
                <div className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500">
                    Page {paginationData.currentPage} of {paginationData.totalPage}
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
            <div className="flex flex-wrap gap-8 px-11 pt-10">
                {listBook.data?.map((book, index) => (
                    <BookCardStyles className="book-card" key={index}>
                        <img className="book-img" src={book.bookImage[0]} alt="book" />
                        <div className="book-content">
                            <h1 className="book-title">{book.bookName}</h1>
                            <button onClick={() => goToBookDetail(book.bookId)}>Xem thêm</button>
                            <div className="book-price">{book.bookPrice}đ</div>
                            <div className="book-rating">
                                {[...Array(Math.ceil(averageRating))].map((o, i) => (
                                    <span key={i}>
                                        {i + 1 === Math.ceil(averageRating) && !Number.isInteger(averageRating) ? (
                                            <FaStarHalfAlt />
                                        ) : (
                                            <FaStar />
                                        )}
                                    </span>
                                ))}
                                {arrComment.length > 0 && (
                                    <span className="book-total-rating">({arrComment.length})</span>
                                )}
                            </div>
                        </div>
                    </BookCardStyles>
                ))}
            </div>
        </>
    );
}

export default ListBook;
