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
                    {cart.book.bookImage &&
                        cart.book.bookImage.slice(0, 1).map((item, index) => (
                            <img
                                key={index}
                                className={styles.imageItems}
                                alt=""
                                // src={`http://localhost:8086/api/cart/upload/imageCart/${cart.id}`}
                                src={item}
                            />
                        ))}
                </div>
                <div className={styles.cartFrame}>
                    <section className={styles.cartSection}>
                        <div className={styles.bodyCart}>
                            <span className={styles.headerCart}>
                                <h2 className={styles.tourName}>{cart.book.bookName}</h2>
                            </span>
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
                            <input className={styles.quantityCart} value={cart.cartQuantity} readOnly />
                            <FontAwesomeIcon
                                icon={faPlus}
                                className={styles.iconPlus}
                                // onClick={() => handleIncrement(index)}
                            />
                        </span>
                        <span className={styles.cartPrice}>{cart.book.bookPrice}₫</span>
                        <span className={styles.totalPrice}>{cart.book.bookPrice * cart.cartQuantity}₫</span>
                    </article>
                </div>
            </div>
        </>
    );
}
export default CartItem;
