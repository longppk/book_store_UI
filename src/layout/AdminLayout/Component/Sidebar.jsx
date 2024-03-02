import React from 'react';
import SideBarMenuItem from './SideBarMenuItem';
import { SidebarAdminMenuData } from '../../../Data/SidebarAdminMenuData';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <aside
            id="sidebar-multi-level-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <div className="py-3 mb-2 flex font-bold text-3xl justify-center items-center">
                    <Link to="/admin/dashboard">
                        <span className="text-purple-500">B</span>ookStore
                    </Link>
                </div>
                <ul className="space-y-2 font-medium">
                    {SidebarAdminMenuData.map((sidebarItem, index) => (
                        <SideBarMenuItem key={index} {...sidebarItem} />
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
