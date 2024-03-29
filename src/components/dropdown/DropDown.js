import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosLogOut } from 'react-icons/io';

const DropDownStyles = styled.div`
    width: 250px;
    background-color: #fff;
    margin: auto;
    box-shadow: 2px 2px 10px #aaaaaa;
    .container-dropdown {
        text-align: center;
        padding: 20px 20px;
        .btn-box {
            display: flex;
            flex-direction: column;
            gap: 10px;
            .btn-signin {
                color: #fff;
                padding: 5px 0;
                background-color: #c92127;
                font-weight: 500;
                border-radius: 20px;
            }
            .btn-signup {
                color: #c92127;
                padding: 4px 0;
                border: 2px solid #c92127;
                font-weight: 500;
                border-radius: 20px;
            }
            .btn-logout {
                display: flex;
                align-items: center;
                gap: 10px;
                justify-content: center;
                border: 1px solid #000;
                border-radius: 20px;
            }
        }
    }
`;
const DropDown = ({ className, data }) => {
    const navigate = useNavigate();
    const logged = window.localStorage.getItem('isLogged');
    const handleLogout = () => {
        navigate('/authenticate');
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('isLogged');
        localStorage.removeItem('role');
    };
    return (
        <DropDownStyles className={className}>
            <div className="container-dropdown">
                {data ? (
                    <div className="btn-box">
                        <NavLink className="btn-signup" to={'/profile'}>
                            Profile
                        </NavLink>
                        <button onClick={handleLogout} className="btn-logout">
                            <IoIosLogOut />
                            <span>Logout</span>
                        </button>
                    </div>
                ) : (
                    <div className="btn-box">
                        <NavLink className="btn-signin" to={'/authenticate'}>
                            Sign In
                        </NavLink>
                        <NavLink className="btn-signup" to={'/authenticate'}>
                            Sign Up
                        </NavLink>
                    </div>
                )}
            </div>
        </DropDownStyles>
    );
};

export default DropDown;
