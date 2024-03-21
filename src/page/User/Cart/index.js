import styles from './Cart.module.scss';
import CartItem from './CartItem';
import { ToastContainer, toast } from 'react-toastify';
import CartHandler from './CartHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import Header from '../../../layout/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [checkAllCart, setCheckAllCart] = useState(false);
    const [totalPrice, setToltalPrice] = useState(0);
    const [cNameUser, setCNameUser] = useState('');
    const [urlPayment, setUrlPayment] = useState('');
    const param = useLocation();
    const token = localStorage.getItem('token');
    const getCartInfo = async () => {
        try {
            const resp = await axios.get('http://localhost:8080/api/user/cart/info', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(resp.data);
            setCartItems(resp.data);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getCartInfo();
    }, []);
    useEffect(() => {
        const total = cartItems.reduce((acc, item) => {
            return item.checked ? acc + item.book.bookPrice * item.cartQuantity : acc;
        }, 0);
        setToltalPrice(total);
        // console.log(cartItems);
    }, [cartItems, checkAllCart]);
    const handleCheckItems = (cartId) => {
        // alert(cartId);
        const newCart = cartItems.map((item) => {
            if (item.cartId === cartId) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        setCartItems(newCart);
        // console.log(cartItems);
    };
    const handleCheckAllCart = () => {
        setCheckAllCart(!checkAllCart);
        const newCart = cartItems.map((item) => ({ ...item, checked: !checkAllCart }));
        setCartItems(newCart);
    };

    const handleChangeMethodPayment = (value) => {
        alert(value);
    };
    const handleIncrement = async (cartId) => {
        try {
            const res = await axios.put(`http://localhost:8080/api/user/${cartId}/increment`);
            // Xử lý kết quả trả về nếu cần thiết
            console.log(res.data);
            const resp = await axios.get('http://localhost:8080/api/user/cart/info', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(resp.data);
            setCartItems(resp.data);
        } catch (error) {
            console.log(error);
            // Xử lý lỗi nếu cần thiết
        }
    };

    // Hàm giảm số lượng
    const handleDecrement = async (cartId) => {
        try {
            const res = await axios.put(`http://localhost:8080/api/user/${cartId}/decrement`);
            // Xử lý kết quả trả về nếu cần thiết
            console.log(res.data);
            const resp = await axios.get('http://localhost:8080/api/user/cart/info', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(resp.data);
            setCartItems(resp.data);
        } catch (error) {
            console.log(error);
            // Xử lý lỗi nếu cần thiết
        }
    };

    // Hàm xóa item
    const handleDelete = async (cartId) => {
        try {
            const res = await axios.delete(`http://localhost:8080/api/user/${cartId}`);
            // Xử lý kết quả trả về nếu cần thiết
            console.log(res.data);
            const resp = await axios.get('http://localhost:8080/api/user/cart/info', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(resp.data);
            setCartItems(resp.data);
        } catch (error) {
            console.log(error);
            // Xử lý lỗi nếu cần thiết
        }
    };

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    // useEffect(() => {
    const getCFullNameUser = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/user/get/fullName', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // alert(res.data);
            setCNameUser(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const createUrlPayment = async (amount) => {
        console.log('Price after discount', amount);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const res = await axios.post(
                'http://localhost:8080/api/user/checkout/createUrl',
                {
                    totalPrice: amount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            // alert(res.data);
            setUrlPayment(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // }, []);
    const handleCheckOut = async () => {
        // getCFullNameUser();
        // console.log(cNameUser);
        if (totalPrice > 0) {
            const checkedItems = cartItems.filter((item) => item.checked);
            const checkedCartIds = cartItems.filter((item) => item.checked).map((item) => item.cartId);
            console.log('Checked out itemsID:', checkedCartIds);
            console.log('Checked out items:', checkedItems);
            // localStorage.setItem('listCartItems', checkedCartIds);
            let amount = totalPrice;
            if (confirmVoucher !== null) {
                const discount = confirmVoucher.percent;
                localStorage.setItem('voucherId', confirmVoucher.id);
                amount = totalPrice - totalPrice * (discount / 100);
            }
            // console.log('Price before discount', totalPrice);
            // console.log('Price after discount', amount);
            const res = await axios.post(
                'http://localhost:8080/api/user/checkout/createUrl',
                {
                    totalPrice: amount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            // alert(res.data);
            // setUrlPayment(res.data);
            // toast.success(urlPayment.message);
            if (res.data.responseCode === '200') {
                console.log('200');
                console.log(param);
                const url = res.data.data;
                localStorage.setItem('listCartItems', checkedCartIds);
                window.open(url, '_blank');
                window.close();
            }
            // console.log(urlPayment);

            console.log(totalPrice);
        } else {
            console.log(totalPrice);
            toast.warning('Payment cannot be made if the item is not available');
        }
    };
    const [voucherValue, setVoucherValue] = useState('');
    const [confirmVoucher, setConfirmVoucher] = useState(null);
    const handleCheckVoucher = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/user/voucher/${voucherValue}`);
            setConfirmVoucher(res.data);
            console.log(confirmVoucher);
        } catch (error) {
            console.log(error);
        }
        console.log(voucherValue);
    };
    return (
        <>
            <Header />
            <div className={styles.containerCart}>
                <div className={styles.infoCart}>
                    <div className={styles.checkOutItem}>
                        <div className={`${styles.paymentGroup} ${styles.groupCheckAll}`}>
                            <div onClick={handleCheckAllCart}>
                                {!checkAllCart && <FontAwesomeIcon icon={faSquare} className={styles.checkAllCart} />}
                                {checkAllCart && (
                                    <FontAwesomeIcon icon={faSquareCheck} className={styles.checkAllCart} />
                                )}
                            </div>
                            ({cartItems.filter((item) => item.checked).length} items checked )
                        </div>
                        <div className={`${styles.paymentGroup} ${styles.totalPrice}`}>
                            Total Price: {VND.format(totalPrice)}
                        </div>
                        <div className={`${styles.paymentGroup} ${styles.paymentMethod}`}>
                            <select onChange={(e) => handleChangeMethodPayment(e.target.value)}>
                                <option value="" className={styles.optionPayment}>
                                    Select a Payment Method
                                </option>
                                <option value="a">VNPAY</option>
                                <option value="b">PAYPAL</option>
                                <option value="c">ZALO PAY</option>
                                <option value="d">MOMO</option>
                            </select>
                        </div>
                        <div className={`${styles.paymentGroup} ${styles.checkVoucher}`}>
                            <input value={voucherValue} onChange={(e) => setVoucherValue(e.target.value)} />
                            <button className={styles.btnCheckOut} onClick={handleCheckVoucher}>
                                Confirm
                            </button>
                        </div>
                        <div className={`${styles.paymentGroup}`}>
                            <button className={styles.btnCheckOut} onClick={handleCheckOut}>
                                CheckOut
                            </button>
                        </div>
                    </div>
                    <div className={styles.CartItem}>
                        {cartItems &&
                            cartItems.map((cart, index) => (
                                <CartItem
                                    key={cart.cartId}
                                    cart={cart}
                                    index={index}
                                    onCheck={() => handleCheckItems(cart.cartId)}
                                    checked={cart.checked}
                                    onDecrement={() => handleDecrement(cart.cartId)}
                                    onDelete={() => handleDelete(cart.cartId)}
                                    onIncrement={() => handleIncrement(cart.cartId)}
                                />
                            ))}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Cart;
