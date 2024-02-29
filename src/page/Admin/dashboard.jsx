import { IoMdHome } from 'react-icons/io';
import { FaChevronRight } from 'react-icons/fa';
import {
    BarChart,
    Bar,
    Cell,
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
import DefaultAdminLayout from '../../layout/AdminLayout/DefaultAdminLayout/DefaultAdminLayout';
import { StatisticalDashboardData } from '../../Data';
import { TestChartData } from '../../Data/TestChartData';
import TestTable from '../../components/tables/TestTable';

function DashBoardAdmin() {
    return (
        <div>
            <DefaultAdminLayout>
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <a
                                href="#"
                                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                            >
                                <IoMdHome className="w-3 h-3 me-2.5" />
                                Home
                            </a>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <FaChevronRight className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" />
                                <a
                                    href="#"
                                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Dashboard
                                </a>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <FaChevronRight className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" />
                                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                    Flowbite
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className="p-3 my-5 grid grid-cols-4 gap-4">
                    {StatisticalDashboardData.map((statisticalItem) => (
                        <StatisticalCard key={statisticalItem.title} {...statisticalItem} />
                    ))}
                </div>

                <div className="p-3 mb-5 grid grid-cols-2 gap-2 h-96 bg-white">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={TestChartData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#8884d8" />
                            <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={TestChartData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <TestTable />
            </DefaultAdminLayout>
        </div>
    );
}

export default DashBoardAdmin;
