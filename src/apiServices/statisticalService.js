import { statisticalRequest } from '../utils/requests';
import { CiCreditCard1 } from 'react-icons/ci';
import { FaUserPlus, FaUserGroup } from 'react-icons/fa6';
import { LuBarChart4 } from 'react-icons/lu';

export const getStatisticalDateAndNumberOfBook = async (name, size, cPage) => {
    try {
        const res = await statisticalRequest.get('/dateAndNumberOfBook', {});
        return res;
    } catch (error) {
        console.log('Get list StatisticalDateAndNumberOfBook error!');
        console.log(error);
    }
};

export const getStatisticalSaleFromDateToDate = async (name, size, cPage) => {
    try {
        const res = await statisticalRequest.get('/saleFromDateToDate', {});
        return res;
    } catch (error) {
        console.log('Get list StatisticalSaleFromDateToDate error!');
        console.log(error);
    }
};

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

export const getSimpleStatistical = async (name, size, cPage) => {
    try {
        const res = await statisticalRequest.get('/simpleStatistical', {
            transformResponse: [
                function (data) {
                    let jsonData = JSON.parse(data);
                    const statisticalDashboardData = [
                        {
                            color: 'pink',
                            icon: <CiCreditCard1 />,
                            title: 'Total Books',
                            value: jsonData.totalBooks,
                            footer: {
                                color: 'green',
                                value: '+55%',
                                label: 'than last week',
                            },
                        },
                        {
                            color: 'blue',
                            icon: <FaUserGroup />,
                            title: "Today's Users",
                            value: jsonData.totalUsers,
                            footer: {
                                color: 'green',
                                value: '+3%',
                                label: 'than last month',
                            },
                        },
                        {
                            color: 'gray',
                            icon: <FaUserPlus />,
                            title: 'Sales',
                            value: VND.format(jsonData.totalSales),
                            footer: {
                                color: 'green',
                                value: '+150%',
                                label: 'than yesterday',
                            },
                        },
                        {
                            color: 'yellow',
                            icon: <LuBarChart4 />,
                            title: 'Total Orders',
                            value: jsonData.totalOrders,
                            footer: {
                                color: 'green',
                                value: '+5%',
                                label: 'than yesterday',
                            },
                        },
                    ];

                    return statisticalDashboardData;
                },
            ],
        });
        return res;
    } catch (error) {
        console.log('Get list simpleStatistical error!');
        console.log(error);
    }
};
