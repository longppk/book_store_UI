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
import DefaultAdminLayout from '../../layout/AdminLayout/DefaultAdminLayout/DefaultAdminLayout';
import { StatisticalDashboardData } from '../../Data';
import { TestChartData } from '../../Data/TestChartData';
import TestTable from '../../components/tables/TestTable';

function DashBoardAdmin() {
    return (
        <DefaultAdminLayout>
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
    );
}

export default DashBoardAdmin;
