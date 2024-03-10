import { useCallback, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { userServices } from '../../apiServices';
import NormalTable from '../../components/tables/NormalTable';
const userLabels = ['address', 'email', 'username', 'fullName', 'phone', 'role'];

function Users() {
    const [listUsers, setListUsers] = useState();
    const [paginationInfo, setPaginationInfo] = useState(() => ({
        currentPage: 1,
        size: 7,
        totalPage: 0,
        totalResult: 0,
    }));
    const [searchValue, setSearchValue] = useState('');
    // const [listUserIdsChecked, setListUserIdsChecked] = useState([]);

    const myNumberFormat = new Intl.NumberFormat('en-us', { maximumFractionDigits: 5 });
    useEffect(() => {
        const fetchBookLists = async (q, size, cPage) => {
            const res = await userServices.search(q, size, cPage);
            if (res) {
                setPaginationInfo((prev) => ({
                    ...prev,
                    ...res.pagination,
                }));
                setListUsers(res.data);
            }
        };

        fetchBookLists(searchValue, paginationInfo.size, paginationInfo.currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationInfo.currentPage, searchValue, paginationInfo.size]);

    const handleSelectSize = useCallback((size) => {
        setPaginationInfo((prev) => ({
            ...prev,
            currentPage: 1,
            size: size,
        }));
    }, []);

    const handleNextPage = useCallback((nextPage) => {
        setPaginationInfo((prev) => ({
            ...prev,
            currentPage: nextPage,
        }));
    }, []);

    const handlePrevPage = useCallback((prevPage) => {
        setPaginationInfo((prev) => ({
            ...prev,
            currentPage: prevPage,
        }));
    }, []);

    const handleSearchValueChange = (value) => {
        setPaginationInfo((prev) => ({
            ...prev,
            currentPage: 1,
        }));
        setSearchValue(value);
    };

    // const handleCheck = (bookIds) => {
    //     setListBookIdsChecked(() => bookIds);
    // };

    // const handleDeleteBook = useCallback(() => {
    //     const deleteBooksCall = async () => {
    //         const resD = await bookServices.deleteBooks(listBookIdsChecked);
    //         if (resD && resD.rspCode === '200') {
    //             const res = await bookServices.search('', 7, 1);
    //             if (res) {
    //                 setPaginationInfo((prev) => ({
    //                     ...prev,
    //                     ...res.pagination,
    //                 }));
    //                 setListBooks(res.data);
    //             }
    //             notify(resD.message);
    //         }
    //     };
    //     deleteBooksCall();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [listBookIdsChecked]);

    return (
        <div>
            <>
                <h1 className="my-5 ml-2 text-2xl font-semibold">
                    Users{' '}
                    {paginationInfo.totalResult !== 0 ? (
                        <span className="text-gray-500 font-thin">
                            {myNumberFormat.format(paginationInfo.totalResult)}
                        </span>
                    ) : (
                        <Skeleton className="inline" width={100} />
                    )}
                </h1>
                {listUsers ? (
                    <NormalTable
                        name="book"
                        deleteBtn={false}
                        addBtn={false}
                        actionCol={false}
                        labels={userLabels}
                        data={listUsers}
                        pagination={paginationInfo}
                        onNextPage={handleNextPage}
                        onPrevPage={handlePrevPage}
                        onSearch={handleSearchValueChange}
                        onSelectSize={handleSelectSize}
                    />
                ) : (
                    <Skeleton height={600} />
                )}
            </>
        </div>
    );
}

export default Users;
