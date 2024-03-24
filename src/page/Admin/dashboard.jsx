import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts';

import StatisticalCard from '../../components/cards/StatisticalCard';
import { useEffect, useState, useCallback } from 'react';
import { statisticalServices, bookServices } from '../../apiServices';
import Skeleton from 'react-loading-skeleton';
import NormalTable from '../../components/tables/NormalTable';
import { useNotify } from '../../hooks';
const tableLabels = ['title', 'language', 'price', 'publishDate', 'quantity', 'action'];

function DashBoardAdmin() {
    const [statisticalData1, setStatisticalData1] = useState();
    const [statisticalData2, setStatisticalData2] = useState();
    const [simpleStatisticalData, setSimpleStatisticalData] = useState();
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

    useEffect(() => {
        const fetchStatisticalData = async () => {
            const res1 = await statisticalServices.getStatisticalDateAndNumberOfBook();
            const res2 = await statisticalServices.getStatisticalSaleFromDateToDate();
            const res3 = await statisticalServices.getSimpleStatistical();
            setSimpleStatisticalData(res3);
            setStatisticalData1(res1.slice(-20));
            setStatisticalData2(res2.slice(-20));
        };

        fetchStatisticalData();
    }, []);

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
        <>
            {simpleStatisticalData ? (
                <div className="p-3 my-5 grid grid-cols-4 gap-4">
                    {simpleStatisticalData.map((statisticalItem) => (
                        <StatisticalCard key={statisticalItem.title} {...statisticalItem} />
                    ))}
                </div>
            ) : (
                <Skeleton className="w-full" height={300} />
            )}

            {statisticalData1 ? (
                <div className="p-3 mb-5 grid grid-cols-2 gap-2 h-96 bg-white">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={statisticalData1}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sumBook" label="Sum of book" fill="#A8CD9F" />
                            {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                        </BarChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={statisticalData2}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <Skeleton className="w-full" height={450} />
            )}
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
                    onSelectSize={handleSelectSize}
                />
            ) : (
                <Skeleton height={600} />
            )}
        </>
    );
}

export default DashBoardAdmin;
