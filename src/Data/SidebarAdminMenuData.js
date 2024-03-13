import { FaRegChartBar, FaUserFriends, FaRegCalendarCheck } from 'react-icons/fa';
import { BsTable } from 'react-icons/bs';
import { TbLogin2 } from 'react-icons/tb';
import { SlNote } from 'react-icons/sl';
import { IoExitOutline } from 'react-icons/io5';
export const SidebarAdminMenuData = [
    {
        title: 'Dashboard',
        icon: <FaRegChartBar />,
        value: 'dashboard',
        dropdownMenu: [],
    },
    {
        title: 'Table',
        icon: <BsTable />,
        value: 'table',
        dropdownMenu: [
            {
                title: 'Book',
                value: 'book',
            },
            {
                title: 'Author',
                value: 'author',
            },
            {
                title: 'Genre',
                value: 'genre',
            },
            {
                title: 'Voucher',
                value: 'voucher',
            },
        ],
    },
    {
        title: 'Todo',
        icon: <FaRegCalendarCheck />,
        value: 'todo',
        dropdownMenu: [],
    },
    {
        title: 'Users',
        icon: <FaUserFriends />,
        value: 'users',
        dropdownMenu: [],
        separate: true,
    },
    {
        title: 'SignIn',
        value: 'signIn',
        icon: <TbLogin2 />,
        dropdownMenu: [],
    },
    {
        title: 'SignUp',
        value: 'signUp',
        icon: <SlNote />,
        dropdownMenu: [],
    },
    {
        title: 'Logout',
        value: 'logout',
        icon: <IoExitOutline />,
        dropdownMenu: [],
    },
];
