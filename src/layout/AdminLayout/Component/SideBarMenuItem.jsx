import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';
import classNames from 'classnames';

function SideBarMenuItem({ title, icon, value, separate, dropdownMenu, active, onClick, ...passProps }) {
    const [isnDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

    const handleMenuClick = (e) => {
        e.preventDefault();
        setIsDropdownMenuOpen((prev) => !prev);
    };

    const props = {
        onClick,
        ...passProps,
    };

    let MyLi = NavLink;
    props.to = '/admin/' + value;
    if (dropdownMenu?.length !== 0) {
        props.onClick = handleMenuClick;
    }

    return (
        <li className={`${separate && 'pb-2 border-b'}`}>
            <MyLi {...props}>
                {({ isActive }) => (
                    <div
                        className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-purple-400 dark:text-white dark:hover:bg-gray-700 ${
                            isActive && 'bg-purple-500'
                        }`}
                    >
                        <div
                            className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white ${
                                isActive && 'text-white'
                            }`}
                        >
                            {icon}
                        </div>
                        <span
                            className={`flex-1 ms-3 text-left rtl:text-right whitespace-nowrap group-hover:text-white ${
                                isActive && 'text-white'
                            }`}
                        >
                            {title}
                        </span>
                        {dropdownMenu?.length !== 0 && (
                            <FaChevronDown className={`w-3 h-3 group-hover:text-white ${isActive && 'text-white'}`} />
                        )}
                    </div>
                )}
            </MyLi>
            {dropdownMenu?.length !== 0 && isnDropdownMenuOpen && (
                <ul className="py-2 space-y-2">
                    {dropdownMenu.map((item, index) => (
                        <li key={index + 272 + item.value}>
                            <NavLink to={'/admin/' + value + '/' + item.value}>
                                {({ isActive }) => (
                                    <div
                                        className={classNames(
                                            'ps-5 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:text-white hover:bg-purple-400 dark:text-white dark:hover:bg-gray-700',
                                            { 'text-purple-500 font-bold': isActive },
                                        )}
                                    >
                                        {item.title}
                                    </div>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}

SideBarMenuItem.prototype = {
    title: PropTypes.string,
    icon: PropTypes.node,
    value: PropTypes.string,
    separate: PropTypes.bool,
    dropdownMenu: PropTypes.array,
    active: PropTypes.bool,
    onClick: PropTypes.func,
};

export default SideBarMenuItem;
