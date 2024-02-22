import React from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { CiMail, CiBellOn, CiSearch } from 'react-icons/ci';

function Header() {
    return (
        <header className="fixed top-0 w-10/12 px-6 bg-white h-16 flex place-content-between">
            <div className="flex-initial w-1/2 flex items-center">
                <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search
                </label>
                <div class="relative w-2/3">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <CiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                        type="search"
                        id="search"
                        class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search"
                        required
                    />
                </div>
            </div>
            <div className="flex w-1/2 justify-end">
                <div className="flex items-center">
                    <img
                        className="w-10 h-10 rounded-full"
                        src="https://down-vn.img.susercontent.com/file/vn-11134233-7r98o-lnjefuceb33uc2_tn"
                        alt="avatar"
                    />
                    <div className="relative py-1 ml-2 w-36 group">
                        <div className="flex justify-center items-center cursor-pointer">
                            <span>pitithuong</span>
                            <FaChevronDown className="ml-5 text-gray-400" />
                        </div>
                        <div className="absolute hidden top-8 right-px z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 group-hover:block">
                            <ul
                                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownMenuIconHorizontalButton"
                            >
                                <li>
                                    <button className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Profile
                                    </button>
                                </li>
                                <li>
                                    <button className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Upgrade
                                    </button>
                                </li>

                                <li>
                                    <button className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex items-center w-36 place-content-evenly text-purple-500">
                    <div>
                        <CiMail className="w-6 h-6" />
                    </div>
                    <div>
                        <CiBellOn className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
