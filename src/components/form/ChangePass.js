import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useHandleChange from '../../hooks/useHandleChange';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ChangePassStyles = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  background-color: #fff;
  padding: 40px 0;
  height: 583px;
    .container-form {
        width: 400px;
        margin: auto;
        .container-field {
            margin-top: 15px;
            .logo {
                display: flex;
                align-items: center;
                font-weight: bold;
                gap: 10px;
                justify-content: center;
                .logo-name {
                    font-size: 25px;
                    color: rgb(49 46 203);
                }
            }
            .form-label {
                font-size: 18px;
                color: #555555;
                display: flex;
                margin: 20px 0;
                font-weight: 600;
            }
            .form-input {
                width: 100%;
                border: 1px solid #ced4da;
                padding: 8px 10px;
                outline: none;
                &:focus {
                    border: 1px solid #2489f4;
                }
            }
            .form-message {
                color: #cf3c3f;
                font-size: 13px;
            }
        }
        .btn-submit {
            width: 100%;
            height: 40px;
            background-color: #c92127;
            color: #fff;
            font-size: 14px;
            font-weight: 700;
            margin-top: 30px;
        }
        .loading {
            border: 8px solid #f3f3f3;
            border-radius: 50%;
            border-top: 8px solid #c92127;
            border-bottom: 8px solid #f3f3f3;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: auto;
        }

        @-webkit-keyframes spin {
            0% {
                -webkit-transform: rotate(0deg);
            }
            100% {
                -webkit-transform: rotate(360deg);
            }
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
`;
const ChangePass = () => {
    const { values, handleChange } = useHandleChange({
        password: "",
        newPassword: "",
        confirmNewPassword: ""
      });
      const [errorMessage, setErrorMessage] = useState({
        newPassword: "",
        confirmNewPassword: ""
      });
      const navigate = useNavigate();
      const token = window.localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if(values.password === ''){
            errors.password = 'Password is require'
        }
        else if (values.newPassword === '') {
            errors.newPassword = 'New password is required';
        } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(values.newPassword)) {
            errors.newPassword = 'new password must contain at least one special character';
        } else if (values.newPassword.length < 8) {
            errors.newPassword = 'new password must be at least 8 characters long';
        } else if (values.confirmNewPassword === '') {
            errors.confirmNewPassword = 'Confirm new password is require';
        } else if (values.confirmNewPassword !== values.newPassword) {
            errors.confirmNewPassword = 'New password do not match';
        } else {
            errors.password = '';
            errors.confirmPassword = '';
        }
        setErrorMessage(errors);
        if(!(Object.values(errors).some(error => error !== ''))){
            try {
                const {password, newPassword} = values;
                const dataSend = {password, newPassword};
                console.log(dataSend)
              const res2 = await axios.post(
                'http://localhost:8080/api/user/changePassword', dataSend, config
              );
              console.log(res2)
              if (res2.data) {
                toast.success("Change password success",{
                  theme: "colored"
                });
                navigate("/")
              } else {
                toast.error("Password incorrect",{
                  theme: "colored"
                });
              }
            } catch (e) {}
        }
        
      };
    return (
        <ChangePassStyles>
            <div className="container-form" autoComplete="off">
                <div className="container-field">
                    <NavLink to={'/'} className="logo">
                        <span>
                            <svg
                                id="logo-35"
                                width="80"
                                height="80"
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
                    <label className="form-label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="form-input"
                        placeholder="Please enter your password"
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        autoComplete="off"
                    ></input>
                    <p className="form-message">{errorMessage.password}</p>
                </div>
                <div className="container-field">
                    <label className="form-label" htmlFor="newPassword">
                        New password
                    </label>
                    <input
                        className="form-input"
                        placeholder="Please enter your confirm password"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        onChange={handleChange}
                        autoComplete="off"
                    ></input>
                    <p className="form-message">{errorMessage.newPassword}</p>
                </div>
                <div className="container-field">
                    <label className="form-label" htmlFor="confirmNewPassword">
                        Confirm new password
                    </label>
                    <input
                        className="form-input"
                        placeholder="Please enter your confirm password"
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        onChange={handleChange}
                        autoComplete="off"
                    ></input>
                    <p className="form-message">{errorMessage.confirmNewPassword}</p>
                </div>
                <button onClick={handleSubmit}  className="btn-submit">
                    Change Password
                </button>
            </div>
        </ChangePassStyles>
    );
};

export default ChangePass;
