import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import BookCard from './BookCard';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookCategoryStyles = styled.div`
    margin: auto;
    .swiper-slide {
        width: 260px;
    }
    .book-category {
        background-color: #fcddef;
        margin: auto;
        color: #1f1d1d;
        font-size: 20px;
        font-weight: bold;
        padding: 10px;
    }
    .book-list {
        width: 1200px;
        height: 350px;
        margin: auto;
        background-color: #fff;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }
`;

const BookCategory = () => {
    const [listBook, setListbook] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchListBook = async () => {
            try {
                const resp = await axios.get('http://localhost:8080/api/user/book/pagination', {
                    params: {
                        size: 10,
                    },
                });
                console.log(resp.data);
                setListbook(resp.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchListBook();
    }, []);
    const goToBookDetail = (bookId) => {
        // alert(bookId);
        navigate(`/detail/${bookId}`);
    };
    return (
        <BookCategoryStyles className="container">
            <div className="book-category container">
                <h1>Top sách nổi bật</h1>
            </div>
            <Swiper grabCursor={true} spaceBetween={40} slidesPerView={'auto'} className="book-list">
                {listBook.data?.map((book, index) => (
                    <SwiperSlide key={index}>
                        <BookCard book={book} onDetail={goToBookDetail} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </BookCategoryStyles>
    );
};

export default BookCategory;
