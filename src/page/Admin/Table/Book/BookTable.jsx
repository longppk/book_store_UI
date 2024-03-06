import DefaultAdminLayout from '../../../../layout/AdminLayout/DefaultAdminLayout/DefaultAdminLayout';
import NormalTable from '../../../../components/tables/NormalTable';
import { useCallback, useEffect, useState } from 'react';
import { bookServices } from '../../../../apiServices';
import Skeleton from 'react-loading-skeleton';
import { useNotify } from '../../../../hooks';
const tableLabels = ['title', 'language', 'price', 'publishDate', 'quantity', 'action'];

function BookTable() {
    const [listBooks, setListBooks] = useState();
    const [paginationInfo, setPaginationInfo] = useState(() => ({
        currentPage: 1,
        size: 7,
        totalPage: 0,
        totalResult: 0,
    }));
    const notify = useNotify();
    const [searchValue, setSearchValue] = useState('');
    const [listBookIdsChecked, setListBookIdsChecked] = useState([]);

    const myNumberFormat = new Intl.NumberFormat('en-us', { maximumFractionDigits: 5 });
    useEffect(() => {
        const fetchBookLists = async (title, size, cPage) => {
            const res = await bookServices.search(title, size, cPage);
            if (res) {
                setPaginationInfo((prev) => ({
                    ...prev,
                    ...res.pagination,
                }));
                setListBooks(res.data);
            }
        };

        fetchBookLists(searchValue, paginationInfo.size, paginationInfo.currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationInfo.currentPage, searchValue]);

    const handleNextPage = (nextPage) => {
        setPaginationInfo((prev) => ({
            ...prev,
            currentPage: nextPage,
        }));
    };

    const handlePrevPage = (prevPage) => {
        setPaginationInfo((prev) => ({
            ...prev,
            currentPage: prevPage,
        }));
    };

    const handleSearchValueChange = (value) => {
        setPaginationInfo((prev) => ({
            ...prev,
            currentPage: 1,
        }));
        setSearchValue(value);
    };

    const handleCheck = (bookIds) => {
        setListBookIdsChecked(() => bookIds);
    };

    const handleDeleteBook = useCallback(() => {
        const deleteBooksCall = async () => {
            const resD = await bookServices.deleteBooks(listBookIdsChecked);
            if (resD && resD.rspCode === '200') {
                const res = await bookServices.search('', 7, 1);
                if (res) {
                    setPaginationInfo((prev) => ({
                        ...prev,
                        ...res.pagination,
                    }));
                    setListBooks(res.data);
                }
                notify(resD.message);
            }
        };
        deleteBooksCall();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listBookIdsChecked]);

    return (
        <div>
            <DefaultAdminLayout>
                <h1 className="my-5 ml-2 text-2xl font-semibold">
                    Books{' '}
                    {paginationInfo.totalResult !== 0 ? (
                        <span className="text-gray-500 font-thin">
                            {myNumberFormat.format(paginationInfo.totalResult)}
                        </span>
                    ) : (
                        <Skeleton className="inline" width={100} />
                    )}
                </h1>
                {listBooks ? (
                    <NormalTable
                        name="book"
                        labels={tableLabels}
                        data={listBooks}
                        pagination={paginationInfo}
                        onNextPage={handleNextPage}
                        onPrevPage={handlePrevPage}
                        onSearch={handleSearchValueChange}
                        onCheck={handleCheck}
                        onDelete={handleDeleteBook}
                    />
                ) : (
                    <Skeleton height={600} />
                )}
            </DefaultAdminLayout>
        </div>
    );
}

export default BookTable;
