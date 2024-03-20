import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function CartHandler({ initialTotalPrice, initialCheckAllCart, initialCart }) {
    const [cartItems, setCartItems] = useState([]);
    const [checkAllCart, setCheckAllCart] = useState(initialCheckAllCart);
    const [totalPrice, setToltalPrice] = useState(initialTotalPrice);

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
    const handleCheckOut = () => {
        if (totalPrice !== 0) {
        } else {
            toast.warning('Payment cannot be made if the item is not available');
        }
    };
    const handleChangeMethodPayment = (value) => {
        alert(value);
    };
    return {
        cartItems,
        checkAllCart,
        totalPrice,
        handleChangeMethodPayment,
        handleCheckAllCart,
        handleCheckItems,
        handleCheckOut,
    };
}
export default CartHandler;
