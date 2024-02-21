import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import "swiper/scss";

const BookCardStyles = styled.section`
    padding: 20px 10px;
    width: 260px;
    height: auto;
    .book-img {
      width: 260px;
      height: 200px;

    }
    .book-content {
      background-color: #fff;
      padding: 10px 37px;
      .book-title {
        font-size: 20px;
        margin: 5px 0;
        cursor: pointer;
        color: #333333;
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
    description: "abbcsjcsđsk",
  },
  {
    id: 2,
    bookId: 1,
    rating: 4,
    description: "abbcsjcsđsk",
  },
  {
    id: 3,
    bookId: 1,
    rating: 5,
    description: "abbcsjcsđsk",
  },
  {
    id: 4,
    bookId: 1,
    rating: 4,
    description: "abbcsjcsđsk",
  },
  {
    id: 5,
    bookId: 1,
    rating: 5,
    description: "abbcsjcsđsk",
  },
];
const BookCard = () => {
  const calculateAverageRating = (comments) => {
    if (comments.length === 0) return 0;

    const totalRating = comments.reduce((accumulator, comment) => {
      return accumulator + comment.rating;
    }, 0);

    return totalRating / comments.length;
  };

  const averageRating = calculateAverageRating(arrComment);

  return (
    <BookCardStyles className="book-card">
      <img
        className="book-img"
        src="https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_46272.jpg"
        alt="book"
      />
    <div className="book-content">
      <h1 className="book-title">Kỹ Năng Sinh Tồn</h1>
      <span className="book-price">75.000 đ</span>
      <div className="book-rating">
        {[...Array(Math.ceil(averageRating))].map((o, i) => (
          <span key={i}>
            {i + 1 === Math.ceil(averageRating) &&
            !Number.isInteger(averageRating) ? (
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
  );
};

export default BookCard;
