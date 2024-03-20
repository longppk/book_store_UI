import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import { faCarrot, faLocationDot, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styles from './DetailTour.module.scss';
import DetailTourHandler from './DetailTourHandler';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-toastify';
import Comment from './Comment';
import Header from '../layout/Header';
function DetailBook() {
    const [rating] = useState(4.5);
    const [detailTour, setDetailTour] = useState({});
    const { bookId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    console.log('detail tour get id', bookId);
    const [controlTab, setControlTab] = useState(true);

    const { quantity, handleMinusQuantity, handlePlusQuantity, totalPriceRef } = DetailTourHandler({
        initialQuantity: 1,
        maxQuantity: detailTour.bookQuantity,
    });
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        return new Intl.DateTimeFormat('vi-VN', options).format(date).replace(/\./g, '/');
    };

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const fetchBookInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/user/book/detail/${bookId}`);
            console.log(response.data);
            setDetailTour(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchBookInfo();
    }, []);
    const handleAddToCart = async () => {
        // console.log(quantity);
        // const totalPrice = totalPriceRef.current.innerText;
        // console.log('Total Price: ', totalPrice);
        // console.log(detailTour.bookPrice);
        const addToCartData = {
            bookId: detailTour.bookId,
            // bookPrice: detailTour.bookPrice,
            cartQuantity: quantity,
        };
        console.log(addToCartData);
        if (!localStorage.getItem(token)) {
            alert('login before buy item');
            navigate('/authenticate');
        } else {
            try {
                const response = await axios.post('http://localhost:8080/api/user/cart/add', addToCartData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                toast.success(response.data);
            } catch (e) {
                console.log(e);
            }
        }
    };
    const settings = {
        // dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const handleTabClick = (value) => {
        // alert(value);
        if (value === 'comment') {
            // console.log(value);
            setControlTab(false);
        } else if (value === 'description') {
            // console.log(value);
            setControlTab(true);
        }
    };
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.detailTour}>
                    <div className={styles.detailImage}>
                        {detailTour.bookImage?.length === 1 ? (
                            <img src={detailTour.bookImage[0].url} alt="detail-imagee" className={styles.imageOnly} />
                        ) : (
                            <Slider {...settings}>
                                {detailTour.bookImage?.slice(0, 4).map((item, index) => (
                                    <img
                                        key={index}
                                        src={item.url}
                                        alt="detail-imagee"
                                        className={styles.imageTourDetail}
                                    />
                                ))}
                            </Slider>
                        )}
                    </div>
                    <div className={styles.detailInfo}>
                        <div className={styles.titleTour}>
                            <h2>{detailTour.bookTitle}</h2>
                        </div>
                        {detailTour.bookAuthorList &&
                            detailTour.bookAuthorList.map((item, index) => (
                                <div className={styles.providerTour} key={index}>
                                    <h4>Composed by {item.name} </h4>
                                </div>
                            ))}
                        <div className={styles.rating}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    className={styles.ratingItem}
                                    key={star}
                                    style={{
                                        cursor: 'pointer',
                                        color: star <= rating ? 'violet' : 'gray',
                                    }}
                                >
                                    {/* &#9733; */}
                                    <FontAwesomeIcon icon={faStar} />
                                </span>
                            ))}
                        </div>
                        <div className={styles.content}>
                            <div className={styles.description}>
                                {detailTour.bookGenres &&
                                    detailTour.bookGenres.map((item, index) => (
                                        <p key={index} className={styles.discountContent}>
                                            {item.name}
                                        </p>
                                    ))}
                                <p className={styles.dayTour}>
                                    Total Quantity: {detailTour.bookQuantity && detailTour.bookQuantity}
                                </p>
                            </div>
                        </div>
                        <div className={styles.footerDetail}>
                            <div className={styles.quantityTour}>
                                <FontAwesomeIcon
                                    icon={faMinus}
                                    onClick={handleMinusQuantity}
                                    className={`${styles.iconItem} ${styles.iconMinus}`}
                                />
                                <input type="number" className={styles.quantityInput} value={quantity} disabled />
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    onClick={handlePlusQuantity}
                                    className={`${styles.iconItem} ${styles.iconPlus}`}
                                />
                            </div>
                            <div className={styles.groupPrice}>
                                <p className={styles.priceTour}>
                                    {detailTour.bookPrice && VND.format(detailTour.bookPrice)}/book
                                </p>
                            </div>
                        </div>
                        <p className={styles.totalPrice} ref={totalPriceRef}>
                            Total price: {VND.format(detailTour.bookPrice * quantity)}
                        </p>
                        <button className={styles.btn} onClick={handleAddToCart}>
                            Add To Cart
                        </button>
                    </div>
                </div>
                <div>{detailTour.description}</div>
                <div className={styles.tabDetail}>
                    <div className={styles.controlTab}>
                        <hr className={styles.vertical} />
                        <button
                            onClick={(e) => handleTabClick(e.target.value)}
                            value={'description'}
                            className={`${styles.btnControlTab} ${styles.btnDescriptionClick}`}
                        >
                            Description
                        </button>
                        <hr className={styles.vertical} />
                        <button
                            onClick={(e) => handleTabClick(e.target.value)}
                            value={'comment'}
                            className={`${styles.btnControlTab} ${styles.btnCommentClick}`}
                        >
                            Comment
                        </button>
                    </div>
                    {controlTab && (
                        <div className={styles.description}>
                            <div dangerouslySetInnerHTML={{ __html: detailTour.bookDescription }} />
                        </div>
                    )}
                    {!controlTab && (
                        <div>
                            <Comment bookId={detailTour.bookId} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
export default DetailBook;
