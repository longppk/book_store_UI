import { CiCreditCard1 } from 'react-icons/ci';
import { FaUserPlus, FaUserGroup } from 'react-icons/fa6';
import { LuBarChart4 } from 'react-icons/lu';

export const StatisticalDashboardData = [
    {
        color: 'pink',
        icon: <CiCreditCard1 />,
        title: "Today's Money",
        value: '$53k',
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
        value: '2,300',
        footer: {
            color: 'green',
            value: '+3%',
            label: 'than last month',
        },
    },
    {
        color: 'gray',
        icon: <FaUserPlus />,
        title: 'New Clients',
        value: '3,462',
        footer: {
            color: 'red',
            value: '-2%',
            label: 'than yesterday',
        },
    },
    {
        color: 'yellow',
        icon: <LuBarChart4 />,
        title: 'Sales',
        value: '$103,430',
        footer: {
            color: 'green',
            value: '+5%',
            label: 'than yesterday',
        },
    },
];

export default StatisticalDashboardData;
