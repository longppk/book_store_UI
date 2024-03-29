// QuantityHandler.jsx
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const DetailTourHandler = ({ initialQuantity, maxQuantity }) => {
    const [quantity, setQuantity] = useState(initialQuantity);
    const totalPriceRef = useRef(null);

    const handleMinusQuantity = () => {
        if (quantity < 2) {
            toast.warning('Quantity cannot be less than 1');
        } else {
            setQuantity(quantity - 1);
        }
    };

    const handlePlusQuantity = () => {
        if (quantity > maxQuantity - 1) {
            toast.warning(`Maximum quantity left in stock is
            ${maxQuantity}`);
        } else {
            setQuantity(quantity + 1);
        }
    };
    const addTocart = () => {
        const totalPrice = totalPriceRef.current.innerText;
        console.log('Total Price: ', totalPrice);
    };
    return {
        quantity,
        handleMinusQuantity,
        handlePlusQuantity,
        addTocart,
        totalPriceRef,
    };
};

export default DetailTourHandler;
