import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { FaStarHalfAlt } from 'react-icons/fa';
import 'swiper/scss';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const BookCardStyles = styled.section`
    padding: 20px 10px;
    width: 260px;
    height: 400px;
    .book-img {
        width: 260px;
        height: 200px;
    }
    .book-content {
        background-color: #fff;
        padding: 10px 37px;
        height: 140px;
        .book-title {
            font-size: 20px;
            margin: 5px 0;
            cursor: pointer;
            color: #333333;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
        }
        .book-price {
            color: #c92127;
            font-weight: 600;
            line-height: 1.6rem;
        }
        .book-rating {
            display: flex;
            color: #f6a500;
            .book-total-rating {
                padding-left: 5px;
                font-size: 14px;
                color: #cdcfd0;
            }
        }
    }
`;

const arrComment = [
    {
        id: 1,
        bookId: 1,
        rating: 4,
        description: 'abbcsjcsđsk',
    },
    {
        id: 2,
        bookId: 1,
        rating: 4,
        description: 'abbcsjcsđsk',
    },
    {
        id: 3,
        bookId: 1,
        rating: 5,
        description: 'abbcsjcsđsk',
    },
    {
        id: 4,
        bookId: 1,
        rating: 4,
        description: 'abbcsjcsđsk',
    },
    {
        id: 5,
        bookId: 1,
        rating: 5,
        description: 'abbcsjcsđsk',
    },
];
function ListBook() {
    const [listBook, setListbook] = useState([]);
    const navigate = useNavigate();
    const fetchListBook = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/user/book/list/10');
            console.log(response.data);
            setListbook(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchListBook();
    }, []);

    const calculateAverageRating = (comments) => {
        if (comments.length === 0) return 0;

        const totalRating = comments.reduce((accumulator, comment) => {
            return accumulator + comment.rating;
        }, 0);

        return totalRating / comments.length;
    };

    const averageRating = calculateAverageRating(arrComment);
    const goToBookDetail = (bookId) => {
        alert(bookId);
        navigate(`/detail/${bookId}`);
    };
    return (
        <>
            <div className="flex flex-wrap gap-8 px-11">
                {listBook &&
                    listBook.map((book, index) => (
                        <BookCardStyles className="book-card" key={index}>
                            <img className="book-img" src={book.bookImage[0].url} alt="book" />
                            <div className="book-content">
                                <h1 className="book-title">{book.bookName}</h1>
                                <button onClick={() => goToBookDetail(book.bookId)}>Xem thêm</button>
                                <div className="book-price">{book.bookPrice}đ</div>
                                <div className="book-rating">
                                    {[...Array(Math.ceil(averageRating))].map((o, i) => (
                                        <span key={i}>
                                            {i + 1 === Math.ceil(averageRating) && !Number.isInteger(averageRating) ? (
                                                <FaStarHalfAlt />
                                            ) : (
                                                <FaStar />
                                            )}
                                        </span>
                                    ))}
                                    {arrComment.length > 0 && (
                                        <span className="book-total-rating">({arrComment.length})</span>
                                    )}
                                </div>
                            </div>
                        </BookCardStyles>
                    ))}
            </div>
        </>
    );
}

export default ListBook;
