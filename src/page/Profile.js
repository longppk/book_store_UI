import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../layout/Layout";
import { NavLink } from "react-router-dom";

const ProfileStyles = styled.div`
  display: flex;
  padding: 80px 0 20px;
  margin: auto;
  gap: 15px;
  .profile-sidebar {
    width: 250px;
    .profile-avatar {
      width: 100%;
      text-align: center;
      .image-avatar {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin: auto;
      }
      .title {
        font-weight: 600;
      }
    }
    .profile-navigate {
      margin-top: 20px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .link-navigate {
        font-size: 13px;
        color: #646464;
        border-bottom: 1px solid #f2f2f2;
        padding: 10px 20px;
      }
    }
  }
  .profile-content {
    padding: 20px 30px;
    background-color: #fff;
    width: 100%;
    .profile-info {
      margin-top: 30px;
      display: flex;
      gap: 20px;
      align-items: center;
      flex-direction: column;
      width: 720px;
      .profile-field {
        display: flex;
        gap: 10px;
        align-items: center;
        .field-title {
          font-size: 14px;
          color: #646464;
          width: 150px;
          cursor: pointer;
        }
        .input-field{
            border: 1px solid #ced4da;
            border-radius:8px;
            width: 550px;
            padding: 3px 10px;
        }
      }
      .button-box{
            width: 100%;
            display: flex;
            align-items: center;
            gap: 20px;
            .button-edit{
                background-color: #C92127;
                color: #fff;
                padding: 10px;
                font-weight: 600;
            }
            .button-save{
              background-color: #007AFF;
                color: #fff;
                padding: 10px;
                font-weight: 600;
            }
        }
    }
  }
`;

const Profile = () => {
  const [readOnly, setReadOnly] = useState("readOnly");
  const handleEdit = () => {
    setReadOnly('')
  }
  const handleSave = (e) => {
    e.preventDefault()
  }
  return (
    <Layout>
      <ProfileStyles className="container">
        <div className="profile-sidebar">
          <div className="profile-avatar">
            <img
              className="image-avatar"
              src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
              alt="avatar"
            />
            <h3 className="title">Hoàng Long</h3>
          </div>
          <div className="profile-navigate">
            <NavLink className="link-navigate" to={"/"}>
              Thông tin tài khoản
            </NavLink>
            <NavLink className="link-navigate" to={"/"}>
              Lịch sử đơn hàng
            </NavLink>
            <NavLink className="link-navigate" to={"/"}>
              Điểm tích lũy
            </NavLink>
            <NavLink className="link-navigate" to={"/"}>
              Ví voucher
            </NavLink>
            <NavLink className="link-navigate" to={"/"}>
              Thông báo
            </NavLink>
          </div>
        </div>
        <div className="profile-content">
          <h2>Thông tin tài khoản</h2>
          <form onSubmit={handleSave} className="profile-info">
            <div className="profile-field">
              <label htmlFor="username" className="field-title">Username</label>
              <input id="username" className="input-field" readOnly={readOnly} type="text" />
            </div>
            <div className="profile-field">
              <label htmlFor="email" className="field-title">Email</label>
              <input id="email" className="input-field" readOnly={readOnly} type="text" />
            </div>
            <div className="profile-field">
              <label htmlFor="fullname" className="field-title">Fullname</label>
              <input id="fullname" className="input-field" readOnly={readOnly} type="text" />
            </div>
            <div className="profile-field">
              <label htmlFor="phone" className="field-title">Phone</label>
              <input id="phone" className="input-field" readOnly={readOnly} type="text" />
            </div>
            <div className="profile-field">
              <label htmlFor="address" className="field-title">Address</label>
              <input id="address" className="input-field" readOnly={readOnly} type="text" />
            </div>
            <div className="button-box">
                <button type="submit" className="button-save">Lưu thay đổi</button>
                <button onClick={handleEdit} type="button" className="button-edit">Chỉnh sửa thông tin</button>
            </div>
          </form>
        </div>
      </ProfileStyles>
    </Layout>
  );
};

export default Profile;
