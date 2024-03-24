import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMailOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { BiSolidMap } from "react-icons/bi";
const FooterStyles = styled.section`
  margin: auto;
  width: 1200px;
  background-color: #fff;
  padding: 20px;
  .footer-info {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    padding: 25px 0;
    background-color: #646464;
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
    .footer-register {
      width: 400px;
      position: relative;
      .footer-email {
        color: #000;
        font-size: 14px;
        padding: 10px 100px 10px 20px;
        width: 100%;
      }
      .btn-register {
        background-color: #f7941e;
        padding: 5px 10px;
        position: absolute;
        right: 2px;
        bottom: 3px;
      }
    }
  }
  .footer-static {
    display: flex;
    padding: 40px 0;
    .footer-address {
      width: 400px;
      font-size: 14px;
      border-right: 1px solid #646464;
      .logo {
        padding: 20px 0;
        display: flex;
        align-items: center;
        font-weight: bold;
        gap: 10px;
        .logo-name {
          font-size: 40px;
          color: rgb(49 46 203);
        }
      }
      .address-detail {
        margin: 10px 0;
      }
      .footer-social {
        display: flex;
        gap: 10px;
      }
      .footer-download {
        display: flex;
        gap: 10px;
        .image-download {
          margin-top: 10px;
          width: 110px;
          height: 36px;
        }
      }
    }
    .footer-support {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      .list-support {
        padding: 20px;
        display: block;
        .title-support {
          line-height: 39px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .item-support {
          display: flex;
          flex-direction: column;
          .support-link {
            font-size: 13px;
            line-height: 1.8rem;
          }
        }
      }
    }
    .footer-contact {
      .title-contact {
        padding: 0 20px;
        line-height: 39px;
        font-weight: 700;
        text-transform: uppercase;
      }
      .detail-contact {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        span {
          font-size: 13px;
          padding: 0 20px;
        }
      }
    }
    .footer-payment {
      padding-top: 30px;
      width: 100%;
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      .image-payment {
        width: 70px;
        height: 40px;
      }
    }
  }
`;
const Footer = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <FooterStyles>
      {loading && (
        <div>
          <div className="footer-info">
            <IoMailOutline className="icon-email" />
            <h4>nhận tin tức mới nhất về sách</h4>
            <div className="footer-register">
              <input
                className="footer-email"
                placeholder="nhập email của bạn"
              />
              <button className="btn-register">Đăng ký</button>
            </div>
          </div>
          <div className="footer-static">
            <div className="footer-address">
              <div className="logo">
                <span>
                  <svg
                    id="logo-35"
                    width="100"
                    height="50"
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
              </div>
              <p className="address-detail">
                Lầu 5, đường 3/2 Quận Ninh Kiều, TP. Cần Thơ Công Ty Cổ Phần
                Phát Hành Sách TP CT - BookHaSa - 62 Lê Lợi, Ninh Kiều, TP. Cần
                Thơ, Việt Nam
              </p>
              <p className="address-detail">
                Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG
                hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất
                cả Hệ Thống Fahasa trên toàn quốc.
              </p>
              <div className="footer-social">
                <img
                  src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/footer/Facebook-on.png"
                  alt=""
                />
                <img
                  src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images//footer/Insta-on.png"
                  alt=""
                />
                <img
                  src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images//footer/Youtube-on.png"
                  alt=""
                />
                <img
                  src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images//footer/tumblr-on.png"
                  alt=""
                />
                <img
                  src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images//footer/twitter-on.png"
                  alt=""
                />
                <img
                  src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images//footer/pinterest-on.png"
                  alt=""
                />
              </div>
              <div className="footer-download">
                <img
                  className="image-download"
                  src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/android1.png"
                  alt=""
                />
                <img
                  className="image-download"
                  src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/appstore1.png"
                  alt=""
                />
              </div>
            </div>
            <div>
              <div className="footer-support">
                <div className="list-support">
                  <h3 className="title-support">Dịch vụ</h3>
                  <div className="item-support">
                    <NavLink className="support-link" to={"/"}>
                      Điều khoản sử dụng
                    </NavLink>
                    <NavLink className="support-link" to={"/"}>
                      Chính sách bảo mật thông tin cá nhân
                    </NavLink>
                    <NavLink className="support-link" to={"/"}>
                      Chính sách bảo mật thanh toán
                    </NavLink>
                    <NavLink className="support-link" to={"/"}>
                      giới thiệu Book.com
                    </NavLink>
                    <NavLink className="support-link" to={"/"}>
                      Hệ thống trung tâm nhà sách
                    </NavLink>
                  </div>
                </div>
                <div className="list-support">
                  <h3 className="title-support">Dịch vụ</h3>
                  <div className="item-support">
                    <NavLink className="support-link" to={"/"}>
                      Điều khoản sử dụng
                    </NavLink>
                    <NavLink className="support-link" to={"/"}>
                      Chính sách bảo mật thông tin cá nhân
                    </NavLink>
                    <NavLink className="support-link" to={"/"}>
                      Chính sách bảo mật thanh toán
                    </NavLink>
                    <NavLink className="support-link" to={"/"}>
                      giới thiệu Book.com
                    </NavLink>
                    <NavLink className="support-link" to={"/"}>
                      Hệ thống trung tâm nhà sách
                    </NavLink>
                  </div>
                </div>
                <div className="list-support">
                  <h3 className="title-support">Dịch vụ</h3>
                  <div className="item-support">
                    <NavLink className="support-link" to={"/"}>
                      Điều khoản sử dụng
                    </NavLink>
                    <NavLink className="support-link" to={"/"}>
                      Chính sách bảo mật thông tin cá nhân
                    </NavLink>
                    <NavLink className="support-link" to={"/"}>
                      Chính sách bảo mật thanh toán
                    </NavLink>
                    <NavLink className="support-link" to={"/"}>
                      giới thiệu Book.com
                    </NavLink>
                    <NavLink className="support-link" to={"/"}>
                      Hệ thống trung tâm nhà sách
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="footer-contact">
                <h3 className="title-contact">Liên hệ</h3>
                <div className="detail-contact">
                  <span>62 Lê Lợi, Q.Ninh Kiều, TP. Cần Thơ</span>
                  <span>cskh@book.com.vn</span>
                  <span> 1900-0900-9308</span>
                </div>
              </div>
              <div className="footer-payment">
                <img
                  className="image-payment"
                  src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/vnpost1.png"
                  alt=""
                />
                <img
                  className="image-payment"
                  src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/ahamove_logo3.png"
                  alt=""
                />
                <img
                  className="image-payment"
                  src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/icon_giao_hang_nhanh1.png"
                  alt=""
                />
                <img
                  className="image-payment"
                  src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/icon_snappy1.png"
                  alt=""
                />
                <img
                  className="image-payment"
                  src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/Logo_ninjavan.png"
                  alt=""
                />
                <img
                  className="image-payment"
                  src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/vnpay_logo.png"
                  alt=""
                />
                <img
                  className="image-payment"
                  src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/ZaloPay-logo-130x83.png"
                  alt=""
                />
                <img
                  className="image-payment"
                  src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/shopeepay_logo.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </FooterStyles>
  );
};

export default Footer;
