import { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { authorServices, bookServices, genreServices } from '../../../../apiServices';
import MyCustomInput from '../../../../components/MyCustomInput';
import classNames from 'classnames';
import { useNotify } from '../../../../hooks';

const listInputLabels = ['title', 'description', 'language', 'publishDate', 'price', 'quantity'];
function AddNewBook() {
    const notify = useNotify();
    const [listSelectedAuthors, setListSelectedAuthors] = useState(() => ({
        authorsValid: true,
        authorsErrorMessage: '',
        authors: [],
    }));
    const [listSelectedGenres, setListSelectedGenres] = useState(() => ({
        genresValid: true,
        genresErrorMessage: '',
        genres: [],
    }));
    const [listImages, setListImages] = useState(() => ({ imagesValid: true, imagesErrorMessage: '', images: [] }));
    const [bookInfo, setBookInfo] = useState(() => ({
        title: '',
        titleValid: true,
        description: '',
        descriptionValid: true,
        language: 'Vietnamese',
        languageValid: true,
        publishDate: '',
        publishDateValid: true,
        publishDateErrorMessage: '',
        price: 1000,
        priceValid: true,
        priceErrorMessage: '',
        quantity: 1,
        quantityValid: true,
        quantityErrorMessage: '',
        authorIds: '',
        authorIdsValid: true,
        authorIdsErrorMessage: '',
        genreIds: '',
        genreIdsValid: true,
        genreIdsErrorMessage: '',
    }));

    useEffect(() => {
        return () => {
            if (listImages.images?.length !== 0) {
                listImages.images.forEach((image) => {
                    URL.revokeObjectURL(image.preview);
                });
            }
        };
    }, [listImages.images]);

    const handleAddBookInputChange = (e, isValid) => {
        if (isValid) {
            setBookInfo((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
                [e.target.name + 'Valid']: isValid,
            }));
        } else {
            if (e.target.name === 'price' || e.target.name === 'quantity') {
                if (e.target.value === '') {
                    setBookInfo((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                        [e.target.name + 'Valid']: false,
                        [e.target.name + 'ErrorMessage']: 'This field is blank!',
                    }));
                    return;
                }

                if (+e.target.value === 0) {
                    setBookInfo((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                        [e.target.name + 'Valid']: false,
                        [e.target.name + 'ErrorMessage']: 'This field is required greater than 0!',
                    }));
                    return;
                }

                setBookInfo((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                    [e.target.name + 'Valid']: true,
                    [e.target.name + 'ErrorMessage']: '',
                }));
            }

            if (e.target.name === 'publishDate') {
                if (e.target.value === undefined) {
                    setBookInfo((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                        [e.target.name + 'Valid']: false,
                        [e.target.name + 'ErrorMessage']: 'This field is blank!',
                    }));
                    return;
                }

                setBookInfo((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                    [e.target.name + 'Valid']: true,
                    [e.target.name + 'ErrorMessage']: '',
                }));
            }
            setBookInfo((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const loadAuthorOptions = async (inputValue) => {
        return await authorServices.search(inputValue, 6, 1);
    };

    const handleChangeChooseAuthor = (authorInfo) => {
        if (authorInfo?.length === 0) {
            setListSelectedAuthors((prev) => ({
                ...prev,
                authors: authorInfo,
                authorsValid: false,
                authorsErrorMessage: 'This field is required!',
            }));
        } else {
            setListSelectedAuthors((prev) => ({
                ...prev,
                authors: authorInfo,
                authorsValid: true,
                authorsErrorMessage: '',
            }));
        }
    };

    const loadGenreOptions = async (inputValue) => {
        return await genreServices.search(inputValue, 6, 1);
    };

    const handleChangeChooseGenre = (genreInfo) => {
        if (genreInfo?.length === 0) {
            setListSelectedGenres((prev) => ({
                ...prev,
                genres: genreInfo,
                genresValid: false,
                genreIdsErrorMessage: 'This field is required!',
            }));
        } else {
            setListSelectedGenres((prev) => ({
                ...prev,
                genres: genreInfo,
                genresValid: true,
                genreIdsErrorMessage: '',
            }));
        }
    };

    // images handle
    const handleChooseImages = (e) => {
        if (e.target.files?.length === 0) {
            setListImages((prev) => ({
                ...prev,
                images: [],
                imagesValid: false,
                imagesErrorMessage: 'This filed is required!',
            }));
        } else {
            const imagesChosen = [];
            for (let i = 0; i < e.target.files?.length; i++) {
                imagesChosen.push(e.target.files[i]);
            }
            imagesChosen.map((image) => {
                image.preview = URL.createObjectURL(image);
                return image;
            });
            setListImages((prev) => ({
                ...prev,
                images: imagesChosen,
                imagesValid: true,
                imagesErrorMessage: '',
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formValid = true;
        let errorMessage = '';

        if (listSelectedGenres.genres?.length === 0 || listSelectedGenres.genresValid === false) {
            formValid = false;
            errorMessage = 'You need choose at least one genre!';
        }

        if (listSelectedAuthors.authors?.length === 0 || listSelectedAuthors.authorsValid === false) {
            formValid = false;
            errorMessage = 'You need choose at least one author!';
        }

        if (listImages.images?.length === 0 || listImages.imagesValid === false) {
            formValid = false;
            errorMessage = 'You need provide at least one image!';
        }

        listInputLabels.forEach((label) => {
            if (bookInfo[label] === '') {
                formValid = false;
                errorMessage = 'This ' + label + ' field is required!';
            }

            if (bookInfo[label + 'Valid'] === false) {
                formValid = false;
            }
        });

        let formData = new FormData();
        const lAuthors = listSelectedAuthors.authors.map((author) => author.value);
        const lGenres = listSelectedGenres.genres.map((genre) => genre.value);
        let dataSubmit = {
            title: bookInfo.title,
            description: bookInfo.description,
            language: bookInfo.language,
            publishDate: bookInfo.publishDate,
            price: bookInfo.price,
            quantity: bookInfo.quantity,
            authorIds: lAuthors,
            genreIds: lGenres,
        };
        if (!formValid) {
            notify(errorMessage, 'error');
        } else {
            formData.append('addBookRequest', JSON.stringify(dataSubmit));
            listImages.images.forEach((img) => {
                formData.append('images', img);
            });
            const submitAddBookForm = async (formData) => {
                const res = await bookServices.addNewBook(formData);
                if (res && res.rspCode === '200') {
                    notify(res.message);
                    setBookInfo(() => ({
                        title: '',
                        titleValid: true,
                        description: '',
                        descriptionValid: true,
                        language: 'Vietnamese',
                        languageValid: true,
                        publishDate: '',
                        publishDateValid: true,
                        publishDateErrorMessage: '',
                        price: 1000,
                        priceValid: true,
                        priceErrorMessage: '',
                        quantity: 1,
                        quantityValid: true,
                        quantityErrorMessage: '',
                        authorIds: '',
                        authorIdsValid: true,
                        authorIdsErrorMessage: '',
                        genreIds: '',
                        genreIdsValid: true,
                        genreIdsErrorMessage: '',
                    }));
                    setListSelectedAuthors(() => ({
                        authorsValid: true,
                        authorsErrorMessage: '',
                        authors: [],
                    }));
                    setListSelectedGenres(() => ({
                        genresValid: true,
                        genresErrorMessage: '',
                        genres: [],
                    }));
                    setListImages(() => ({ imagesValid: true, imagesErrorMessage: '', images: [] }));
                } else if (res && res.state === 'error') {
                    notify(res.message, 'error');
                } else {
                    notify('Add new book error!', 'error');
                }
            };

            submitAddBookForm(formData);
        }
    };

    return (
        <>
            <h1 className="my-5 ml-2 text-2xl font-semibold">Add new book here</h1>
            <div className="bg-white w-full p-5">
                <form className="mx-auto">
                    <MyCustomInput
                        label="Title"
                        name="title"
                        type="text"
                        placeholder="Title..."
                        value={bookInfo.title}
                        validation={{ patternRegex: '', errorMessage: '', maxLength: 200 }}
                        onValueChange={handleAddBookInputChange}
                    />
                    <MyCustomInput
                        label="Description"
                        name="description"
                        type="textarea"
                        placeholder="Description..."
                        value={bookInfo.description}
                        validation={{ patternRegex: '', errorMessage: '', maxLength: 1500 }}
                        onValueChange={handleAddBookInputChange}
                    />
                    <div className="mb-5 grid grid-cols-4 gap-x-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Select language
                            </label>
                            <select
                                name="language"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={bookInfo.language}
                                onChange={handleAddBookInputChange}
                            >
                                <option value="Vietnamese">Vietnamese</option>
                                <option value="English">English</option>
                                <option value="Chinese">Chinese</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Korean">Korean</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Publish Date
                            </label>
                            <input
                                type="date"
                                name="publishDate"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                                value={bookInfo.publishDate}
                                onChange={handleAddBookInputChange}
                            />
                            <div className="mt-2 ms-1 text-sm text-red-500 italic">
                                {bookInfo.publishDateValid === false && bookInfo.publishDateErrorMessage}
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Price
                            </label>
                            <input
                                type="number"
                                min="1000"
                                name="price"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                                value={bookInfo.price}
                                onChange={handleAddBookInputChange}
                            />
                            <div className="mt-2 ms-1 text-sm text-red-500 italic">
                                {bookInfo.priceValid === false && bookInfo.priceErrorMessage}
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Quantity
                            </label>
                            <input
                                type="number"
                                min="1"
                                name="quantity"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                                value={bookInfo.quantity}
                                onChange={handleAddBookInputChange}
                            />
                            <div className="mt-2 ms-1 text-sm text-red-500 italic">
                                {bookInfo.quantityValid === false && bookInfo.quantityErrorMessage}
                            </div>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="user_avatar"
                        >
                            Upload image files
                        </label>
                        <div className="my-5 flex gap-x-5">
                            {listImages.images?.length !== 0 &&
                                listImages.images.map((image, index) => (
                                    <img
                                        key={index}
                                        className="h-96 w-60 object-contain rounded-xl border-2 drop-shadow-md"
                                        src={image.preview}
                                        alt={'image preview' + index}
                                    />
                                ))}
                        </div>
                        <input
                            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                            type="file"
                            onChange={handleChooseImages}
                            // onBlur={handleChooseImages}
                            multiple
                        />
                        <div
                            className={classNames('mt-2 ms-1 text-sm ', {
                                'text-red-500 italic': !listImages.imagesValid,
                                'text-gray-500': listImages.imagesValid,
                            })}
                        >
                            {listSelectedAuthors.authorsValid === false
                                ? listSelectedAuthors.authorsErrorMessage
                                : 'You can upload multiple files here.'}
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="user_avatar"
                        >
                            Choose author
                        </label>
                        <AsyncSelect
                            isMulti
                            onChange={handleChangeChooseAuthor}
                            value={listSelectedAuthors.authors}
                            cacheOptions
                            loadOptions={loadAuthorOptions}
                            defaultOptions
                        />
                        <div className="mt-2 ms-1 text-sm text-red-500 italic">
                            {listSelectedAuthors.authorsValid === false && listSelectedAuthors.authorsErrorMessage}
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="user_avatar"
                        >
                            Choose genre
                        </label>
                        <AsyncSelect
                            isMulti
                            onChange={handleChangeChooseGenre}
                            value={listSelectedGenres.genres}
                            cacheOptions
                            loadOptions={loadGenreOptions}
                            defaultOptions
                        />
                        <div className="mt-2 ms-1 text-sm text-red-500 italic">
                            {listSelectedGenres.genresValid === false && listSelectedGenres.genresErrorMessage}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default AddNewBook;
