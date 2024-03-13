import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import { faCarrot, faLocationDot, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styles from './DetailTour.module.scss';
import DetailTourHandler from './DetailTourHandler';
import { useParams } from 'react-router-dom';
function DetailBook() {
    const [rating] = useState(4.5);
    const [detailTour, setDetailTour] = useState({});
    const { bookId } = useParams();
    console.log('detail tour get id', bookId);
    const { quantity, handleMinusQuantity, handlePlusQuantity, addTocart, totalPriceRef } = DetailTourHandler({
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

    return (
        <div className={styles.container}>
            <div className={styles.detailTour}>
                <div className={styles.detailImage}>
                    <img
                        src={detailTour.bookImage && detailTour.bookImage[0].url}
                        alt="detail-imagee"
                        className={styles.imageTourDetail}
                    />
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
                            {/* <p className={`${styles.startDay} ${styles.dayTour}`}>
                                Start day: {detailTour.startTime && formatDateTime(detailTour.startTime)}
                            </p>
                            <p className={`${styles.endDay} ${styles.dayTour}`}>
                                End day: {detailTour.endTime && formatDateTime(detailTour.endTime)}
                            </p> */}
                            <p className={styles.dayTour}>
                                Total Quantity: {detailTour.bookQuantity && detailTour.bookQuantity}
                            </p>
                        </div>
                        {/* <div className={styles.destinationTour}>
                            Destination tour:
                            <ul>
                                {detailTour.destiationDtoList &&
                                    detailTour.destiationDtoList.map((item, index) => (
                                        <li className={styles.destinationItem} key={index}>
                                            <FontAwesomeIcon className={styles.iconCarrot} icon={faCarrot} />{' '}
                                            {item.desName}
                                        </li>
                                    ))}
                            </ul>
                        </div> */}
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
                    <button className={styles.btn} onClick={addTocart}>
                        Add To Cart
                    </button>
                </div>
            </div>
            <div>{detailTour.description}</div>
            <div className={styles.tabDetail}>
                <div className={styles.introduceTour}>
                    <div className={styles.listImageDes}>
                        {detailTour.bookImage &&
                            detailTour.bookImage.map((item, index) => (
                                <figure key={index} className={styles.figureStyle}>
                                    <img
                                        src={item.url}
                                        alt="detail-DestinationImage"
                                        className={styles.imageDestinationDetail}
                                    />
                                    <div>
                                        {/* <figcaption className={styles.figcaptionDesName}>{item.desName}</figcaption>
                                        <figcaption className={styles.figcaptionLocation}>
                                            <FontAwesomeIcon icon={faLocationDot} className={styles.iconLocationDes} />
                                            Location EN: {item.desAddress}
                                        </figcaption> */}
                                        {/* <figcaption className={styles.figcaptionLocationVn}>
                                            <FontAwesomeIcon
                                                icon={faLocationDot}
                                                className={styles.iconLocationDesVn}
                                            />
                                            Location VN: {item.location}
                                        </figcaption> */}
                                    </div>
                                </figure>
                            ))}
                    </div>
                </div>
                <div className={styles.commentTour}>
                    <div dangerouslySetInnerHTML={{ __html: detailTour.bookDescription }} />
                    {/* <Comment commentList={detailTour.commentList} /> */}
                </div>
            </div>
        </div>
    );
}
export default DetailBook;
