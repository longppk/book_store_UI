import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './CartItem.module.scss';
import { faSquare, faSquareCheck, faTrashCan } from '@fortawesome/free-regular-svg-icons';
function CartItem({ cart, index, onCheck, checked }) {
    return (
        <>
            <div key={index} className={styles.cartItem}>
                <div className={styles.groupCheckbox} onClick={onCheck}>
                    {!checked && <FontAwesomeIcon icon={faSquare} />}
                    {checked && <FontAwesomeIcon icon={faSquareCheck} />}
                </div>
                <div className={styles.imageCart}>
                    <img
                        className={styles.imageItems}
                        alt=""
                        // src={`http://localhost:8086/api/cart/upload/imageCart/${cart.id}`}
                        src="https://i.pinimg.com/564x/01/16/37/011637a289e407972b469e57d3b069fd.jpg"
                    />
                </div>
                <div className={styles.cartFrame}>
                    <section className={styles.cartSection}>
                        <span className={styles.headerCart}>
                            <h2 className={styles.tourName}>{cart.productName}</h2>
                        </span>
                        <div className={styles.bodyCart}>
                            <ul className={styles.contentCart}>
                                <li className={styles.contentCartItem}>Nhà cung cấp : {cart.supplier}</li>
                                <li className={styles.contentCartItem}>Tour : {cart.day_tour}</li>
                                <li className={styles.contentCartItem}>Địa điểm : {cart.location}</li>
                                <li className={styles.contentCartItem}>Ngày khởi hành : {cart.check_in_date}</li>
                                <li className={styles.contentCartItem}>Dịch vụ : {cart.service_tour}</li>
                            </ul>
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                className={styles.iconTrash}
                                // onClick={() => handleDelete(cart.yourBookingId, cart.id)}
                            />
                        </div>
                    </section>
                    <article className={styles.cartFooter}>
                        <span className={styles.groupIcon}>
                            <FontAwesomeIcon
                                icon={faMinus}
                                className={styles.iconMinus}
                                // onClick={() => handleDecrement(index, cart.yourBookingId, cart.id)}
                            />
                            <input className={styles.quantityCart} value={cart.quantity} readOnly />
                            <FontAwesomeIcon
                                icon={faPlus}
                                className={styles.iconPlus}
                                // onClick={() => handleIncrement(index)}
                            />
                        </span>
                        <span className={styles.cartPrice}>{cart.priceTour}₫</span>
                        <span className={styles.totalPrice}>{cart.priceTour * cart.quantity}₫</span>
                    </article>
                </div>
            </div>
        </>
    );
}
export default CartItem;