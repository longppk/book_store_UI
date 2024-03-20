import styles from './Cart.module.scss';
import CartItem from './CartItem';
import { ToastContainer } from 'react-toastify';
import CartHandler from './CartHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import Header from '../../../layout/Header';

function Cart() {
    const {
        cartItems,
        checkAllCart,
        totalPrice,
        handleChangeMethodPayment,
        handleCheckAllCart,
        handleCheckItems,
        handleCheckOut,
    } = CartHandler({ initialTotalPrice: 0, initialCheckAllCart: false });
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
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
