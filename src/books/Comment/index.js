// Comment.js
import React, { useEffect, useState } from 'react';
import styles from './Comment.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faStar, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisV, faShare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/userSlice';

function Comment({ bookId }) {
    const getToDay = () => {
        const today = new Date();
        const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
        return localDate.toISOString().slice(0, 16);
    };
    //  console.log(bookId);

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
    const [rating, setRating] = useState(1);
    const [commentValue, setCommentValue] = useState('');
    const [comment, setComment] = useState([]);
    const [editingCommentIndex, setEditingCommentIndex] = useState(-1);
    const [editingCommentValue, setEditingCommentValue] = useState('');
    const [editingRating, setEditingRating] = useState(rating);
    const { isAuthenticated } = useSelector(selectUser);
    // const [dropdownOpen, setDropdownOpen] = useState(null);
    // const handleToggleDropdown = (index) => {
    //     setDropdownOpen((prevState) => (prevState === index ? null : index));
    // };
    // setTimeout(() => {
    //     console.log("Hello, World!");
    //   }, 2000);

    const fetchComment = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/user/book/comment/${bookId}`);
            console.log(response.data);
            setComment(response.data);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetchComment();
    }, []);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const validateUser = (emailUser) => {
        const loginUser = JSON.parse(localStorage.getItem('user')) || {};
        // console.log(loginUser);
        // console.log(emailUser);
        if (loginUser === emailUser) {
            // console.log(emailUser);
            return true;
        } else {
            return false;
        }
    };
    const handleStartEditComment = (index) => {
        setEditingCommentIndex(index);
        setEditingCommentValue(comment[index].content);
        setEditingRating(comment[index].rating);
    };

    const handleCancelEditComment = () => {
        setEditingCommentIndex(-1);
    };
    const handleSaveEditComment = async (index) => {
        // alert(comment[index].id)
        const commentRe = {
            content: editingCommentValue,
            rating: editingRating,
        };
        console.log(commentRe);
        try {
            const res = await axios.post(
                `http://localhost:8080/api/user/book/comment/edit/${comment[index].id}`,
                commentRe,
            );
            alert(res.data);
            // setComment((prevComments) => {
            //     const newComments = [...prevComments];
            //     newComments[index].content = editingCommentValue;
            //     newComments[index].rating = editingRating;
            //     return newComments;
            // });
            setEditingCommentIndex(-1);
            fetchComment();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteComment = async (id) => {
        // alert(id);
        try {
            const res = await axios.post(`http://localhost:8080/api/user/book/comment/delete/${id}`);
            alert(res.data);
            fetchComment();
        } catch (error) {
            console.log(error);
        }
    };
    const [cFullNameUser, setCFullNameUser] = useState(false);
    const token = localStorage.getItem('token');
    useEffect(() => {
        const getCFullNameUser = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/user/get/fullName', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // alert(res.data);
                setCFullNameUser(res.data);
                // console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (isAuthenticated) {
            getCFullNameUser();
        }
    }, []);
    const handlePostComment = async () => {
        console.log(commentValue);
        setCommentValue('');
        const newComment = {
            fullNameUser: cFullNameUser,
            rating: rating,
            content: commentValue,
        };
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const res = await axios.post(
                `http://localhost:8080/api/user/book/comment/add/${bookId}`,
                newComment,
                config,
            );
            alert(res.data);
            const response = await axios.get(`http://localhost:8080/api/user/book/comment/${bookId}`);
            console.log(response.data);
            setComment(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={styles.container} style={{ maxWidth: '1000px' }}>
            {isAuthenticated && (
                <div className={styles.commentCard} style={{ backgroundColor: '#f8f9fa' }}>
                    <div className={styles.addCommentHeader}>
                        <img className={styles.imageUser} src={cFullNameUser.avatarUrl} alt="avatar" />
                        <div className={styles.addCommentInfo}>
                            <h6 className="fw-bold text-primary mb-1">{cFullNameUser.fullName}</h6>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    className={styles.rating}
                                    key={star}
                                    onClick={() => handleRatingChange(star)}
                                    style={{
                                        cursor: 'pointer',
                                        color: star <= rating ? 'violet' : 'gray',
                                    }}
                                >
                                    <FontAwesomeIcon icon={faStar} />
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className={styles.addCommentGroup}>
                        <textarea
                            value={commentValue}
                            className={styles.inputComment}
                            onChange={(e) => setCommentValue(e.target.value)}
                        />
                    </div>
                    <div className={styles.commentBtn}>
                        <button className={`${styles.btnSubmit} ${styles.btn}`} onClick={handlePostComment}>
                            Add
                        </button>
                        <button className={`${styles.btnCancel} ${styles.btn}`}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="justify-content-center">
                {comment?.map((item, index) => (
                    <div className={styles.commentCard} key={index}>
                        <div className={styles.CommentInfo}>
                            <div>
                                <div className={styles.userInfocomment}>
                                    <img
                                        className={styles.imageUser}
                                        src={item.avatarUser}
                                        alt="avatar"
                                        width="30"
                                        height="30"
                                    />
                                    <div className={styles.headerCommentCard}>
                                        <h6 className="">{item.fullNameUser}</h6>
                                        {editingCommentIndex === index ? (
                                            <div>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        className={styles.rating}
                                                        key={star}
                                                        onClick={() => setEditingRating(star)}
                                                        style={{
                                                            cursor: 'pointer',
                                                            color: star <= editingRating ? 'violet' : 'gray',
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faStar} />
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        className={styles.ratingItem}
                                                        key={star}
                                                        style={{
                                                            cursor: 'pointer',
                                                            color: star <= item.rating ? 'violet' : 'gray',
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faStar} />
                                                    </span>
                                                ))}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {editingCommentIndex === index ? (
                                    <textarea
                                        value={editingCommentValue}
                                        onChange={(e) => setEditingCommentValue(e.target.value)}
                                        className={styles.inputCommentEdit}
                                    />
                                ) : (
                                    <p className="mt-3 mb-4 pb-2">{item.content}</p>
                                )}
                            </div>
                            {editingCommentIndex === index ? (
                                <div className={styles.commentEditBtn}>
                                    <button className={styles.btn} onClick={() => handleSaveEditComment(index)}>
                                        Lưu
                                    </button>
                                    <button className={styles.btn} onClick={handleCancelEditComment}>
                                        Hủy
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    {/* Dropdown menu cho việc chỉnh sửa hoặc xóa comment */}
                                    {validateUser(item.emailUser) && (
                                        <div className={styles.commentDropdown}>
                                            <div className={styles.dropdownIcon}>
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </div>
                                            <div className={styles.dropdownContent}>
                                                <button onClick={() => handleStartEditComment(index)}>Sửa</button>
                                                <button onClick={() => handleDeleteComment(item.id)}>Xóa</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Comment;
/** <div className={styles.CommentInfo}>
                            <div className={styles.userInfocomment}>
                                <img
                                    className={styles.imageUser}
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                                    alt="avatar"
                                    width="30"
                                    height="30"
                                />
                                <div className={styles.headerCommentCard}>
                                    <h6 className="">{item.fullNameUser}</h6>
                                    <p>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                className={styles.ratingItem}
                                                key={star}
                                                style={{
                                                    cursor: 'pointer',
                                                    color: star <= item.rating ? 'violet' : 'gray',
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </div>
                            {validateUser(item.emailUser) && (
                                <div className={styles.commentDropdown}>
                                    <div className={styles.dropdownIcon}>
                                        <FontAwesomeIcon icon={faEllipsisV} />
                                    </div>
                                    <div className={styles.dropdownContent}>
                                        <button onClick={() => handleEditComment(index)}>Sửa</button>
                                        <button onClick={() => handleDeleteComment(index)}>Xóa</button>
                                    </div>
                                </div>
                            )}
                        </div> */
