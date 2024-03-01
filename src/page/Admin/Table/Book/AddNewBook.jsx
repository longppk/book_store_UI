import { useState } from 'react';
import DefaultAdminLayout from '../../../../layout/AdminLayout/DefaultAdminLayout/DefaultAdminLayout';
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';
import { authorServices, genreServices } from '../../../../apiServices';
import MyCustomInput from '../../../../components/MyCustomInput';

const animatedComponents = makeAnimated();

function AddNewBook() {
    const [listSelectedAuthors, setListSelectedAuthors] = useState([]);
    const [listSelectedGenres, setListSelectedGenres] = useState([]);
    const [listImages, setListImages] = useState([]);
    const [bookInfo, setBookInfo] = useState(() => ({
        title: '',
        titleValid: true,
        description: '',
        descriptionValid: true,
        language: 'Vietnamese',
        languageValid: true,
        publishDate: '',
        publishDateValid: true,
        price: '',
        priceValid: true,
        quantity: '',
        quantityValid: true,
        authorIds: '',
        authorIdsValid: true,
        genreIds: '',
        genreIdsValid: true,
    }));

    const handleAddBookInputChange = (e, isValid) => {
        console.log(isValid);
        setBookInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            [e.target.name + 'Valid']: isValid,
        }));
    };

    const loadAuthorOptions = async (inputValue) => {
        return await authorServices.search(inputValue, 6, 1);
    };

    const handleChangeChooseAuthor = (authorInfo) => {
        setListSelectedAuthors((prev) => authorInfo);
    };

    const loadGenreOptions = async (inputValue) => {
        return await genreServices.search(inputValue, 6, 1);
    };

    const handleChangeChooseGenre = (genreInfo) => {
        setListSelectedGenres((prev) => genreInfo);
    };

    console.log(bookInfo);

    return (
        <DefaultAdminLayout>
            <h1 className="my-5 ml-2 text-2xl font-semibold">Add new book here</h1>
            <div className="bg-white w-full p-5">
                <form className="mx-auto">
                    <MyCustomInput
                        label="Title"
                        name="title"
                        type="text"
                        placeholder="Title..."
                        value={bookInfo.title}
                        onValueChange={handleAddBookInputChange}
                    />
                    <MyCustomInput
                        label="Description"
                        name="description"
                        type="textarea"
                        placeholder="Description..."
                        value={bookInfo.description}
                        validation={{ patternRegex: '', errorMessage: '', maxLength: 200 }}
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
                            >
                                <option value="Vietnamese">Vietnamese</option>
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
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Quantity
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="user_avatar"
                        >
                            Upload image files
                        </label>
                        <input
                            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                            type="file"
                            id="formFileMultiple"
                            multiple
                        />
                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">
                            You can upload multiple files here.
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
                            value={listSelectedAuthors}
                            cacheOptions
                            loadOptions={loadAuthorOptions}
                            defaultOptions
                        />
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
                            value={listSelectedGenres}
                            cacheOptions
                            loadOptions={loadGenreOptions}
                            defaultOptions
                        />
                    </div>
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                type="checkbox"
                                defaultValue=""
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                required=""
                            />
                        </div>
                        <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            I agree with the{' '}
                            <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
                                terms and conditions
                            </a>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Register new account
                    </button>
                </form>
            </div>
        </DefaultAdminLayout>
    );
}

export default AddNewBook;
