import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsBarChart, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsChevronDown } from 'react-icons/bs';
import "./Sidebar.css";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const navigate = useNavigate();

    const toggleCategories = () => {
        setIsCategoriesOpen(!isCategoriesOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleReportsClick = () => {
        navigate('/reports'); // Navigate to the reports page
    };

    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className="sidebar-brand">
                    <BsBarChart className="icon_header" /> CWIP TRACKER
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsGrid1X2Fill className="icon" /> Dashboard
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="">
                        <BsFillArchiveFill className="icon" /> Products
                    </a>
                </li>
                <li className="sidebar-list-item" onClick={toggleCategories}>
                    <a href="#">
                        <BsFillGrid3X3GapFill className="icon" /> Categories <BsChevronDown className="icon" />
                    </a>
                    {isCategoriesOpen && (
                        <ul className="dropdown">
                            <li className="dropdown-item" onClick={() => handleNavigation('/aged-items')}>Aged Amount</li>
                            <li className="dropdown-item" onClick={() => handleNavigation('/ongoing-ontrack')}>Ongoing-Ontrack</li>
                            <li className="dropdown-item" onClick={() => handleNavigation('/completed')}>Completed</li>
                            <li className="dropdown-item">Total MOM</li>
                        </ul>
                    )}
                </li>
                <li className="sidebar-list-item">
                    <a href="">
                        <BsPeopleFill className="icon" /> Owners
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="">
                        <BsListCheck className="icon" /> Inventory
                    </a>
                </li>
                <li className="sidebar-list-item" onClick={handleReportsClick}>
                    <a href="#">
                        <BsMenuButtonWideFill className="icon" /> Reports
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="">
                        <BsFillGearFill className="icon" /> Setting
                    </a>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar;