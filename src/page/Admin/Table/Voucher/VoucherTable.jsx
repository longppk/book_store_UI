import NormalTable from '../../../../components/tables/NormalTable';
import { useEffect, useState, useCallback } from 'react';
import { voucherServices } from '../../../../apiServices';
import Skeleton from 'react-loading-skeleton';
const tableLabels = ['code', 'id', 'endDate', 'percent', 'highestRate', 'action'];

function VoucherTable() {
    const [listVouchers, setListVouchers] = useState();
    const [paginationInfo, setPaginationInfo] = useState(() => ({
        currentPage: 1,
        size: 7,
        totalPage: 0,
        totalResult: 0,
    }));
    const [searchValue, setSearchValue] = useState('');

    const myNumberFormat = new Intl.NumberFormat('en-us', { maximumFractionDigits: 5 });
    useEffect(() => {
        const fetchBookLists = async (code, size, cPage) => {
            const res = await voucherServices.search(code, size, cPage);
            if (res) {
                setPaginationInfo((prev) => ({
                    ...prev,
                    ...res.pagination,
                }));
                setListVouchers(res.data);
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

    return (
        <>
            <h1 className="my-5 ml-2 text-2xl font-semibold">
                Vouchers{' '}
                {paginationInfo.totalResult !== 0 ? (
                    <span className="text-gray-500 font-thin">{myNumberFormat.format(paginationInfo.totalResult)}</span>
                ) : (
                    <Skeleton className="inline" width={100} />
                )}
            </h1>
            {listVouchers ? (
                <NormalTable
                    name="voucher"
                    deleteBtn={false}
                    labels={tableLabels}
                    data={listVouchers}
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
    );
}

export default VoucherTable;
