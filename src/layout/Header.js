import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  IoNotificationsOutline,
  IoCartOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";
import DropDown from "../components/dropdown/DropDown";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeaderStyles = styled.div`
  top: 0;
  z-index: 100;
  position: fixed;
  background-color: #fff;
  width: 100%;
  .header-main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px 5px 40px;
    .logo {
      display: flex;
      align-items: center;
      font-weight: bold;
      gap: 10px;
      .logo-name {
        font-size: 20px;
        color: rgb(49 46 203);
      }
    }
    .search {
      width: 500px;
      display: flex;
      padding: 10px 20px;
      border: 1px solid #ccc;
      position: relative;
      border-radius: 20px;
      .search-input {
        width: 100%;
      }
      .search-icon {
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-50%);
        padding: 15px 20px;
        background-color: rgb(0, 122, 255);
        color: #fff;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
      }
    }
    .menu {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 30px;
      .menu-item {
        position: relative;
        .dropdown {
          display: none;
        }
        &:hover .dropdown {
          transition: all.5;
          position: absolute;
          right: 0;
          display: block;
        }
        .menu-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .icon-item {
            font-size: 24px;
          }
        }
      }
    }
  }
`;

const Header = () => {
  const [data, setData] = useState();
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/profile",
          config
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        return;
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const login = window.localStorage.getItem("isLoggedIn");
  return (
    <HeaderStyles>
      {data && (
        <div>
          <div className="header-main">
            <NavLink to={"/"} className="logo">
              <span>
                <svg
                  id="logo-35"
                  width="50"
                  height="39"
                  viewBox="0 0 50 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                    className="ccompli1"
                    fill="#007AFF"
                  ></path>
                  <path
                    d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                    className="ccustom"
                    fill="#312ECB"
                  ></path>
                </svg>
              </span>
              <span className="logo-name">Book.com</span>
            </NavLink>
            <div className="search">
              <input
                type="text"
                className="search-input"
                placeholder="search book"
              />
              <button className="search-icon">
                <IoSearchOutline />
              </button>
            </div>
            <ul className="menu">
              <li className="menu-item">
                <NavLink to={"/notification"} className="menu-links">
                  <div className="menu-icon">
                    <IoNotificationsOutline className="icon-item" />
                    <span>Notification</span>
                  </div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to={"/cart"} className="menu-links">
                  <div className="menu-icon">
                    <IoCartOutline className="icon-item" />
                    <span>Cart</span>
                  </div>
                </NavLink>
              </li>
              <li className="menu-item">
                <button to={"/profile"} className="menu-links">
                  <div className="menu-icon">
                    <MdAccountCircle className="icon-item" />
                    {data && <span>{data.username}</span>}
                  </div>
                </button>
                <DropDown className="dropdown" />
              </li>
            </ul>
          </div>
        </div>
      )}
    </HeaderStyles>
  );
};
export default Header;
