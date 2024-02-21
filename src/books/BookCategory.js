import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import BookCard from "./BookCard";
import styled from "styled-components";

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
  return (
    <BookCategoryStyles className="container">
      <div className="book-category container">
        <h1>Top sách nổi bật</h1>
      </div>
      <Swiper
        grabCursor={true}
        spaceBetween={40}
        slidesPerView={"auto"}
        className="book-list"
      >
        <SwiperSlide>
          <BookCard></BookCard>
        </SwiperSlide>
        <SwiperSlide>
          <BookCard></BookCard>
        </SwiperSlide>
        <SwiperSlide>
          <BookCard></BookCard>
        </SwiperSlide>
        <SwiperSlide>
          <BookCard></BookCard>
        </SwiperSlide>
        <SwiperSlide>
          <BookCard></BookCard>
        </SwiperSlide>
        <SwiperSlide>
          <BookCard></BookCard>
        </SwiperSlide>
        <SwiperSlide>
          <BookCard></BookCard>
        </SwiperSlide>
      </Swiper>
    </BookCategoryStyles>
  );
};

export default BookCategory;
