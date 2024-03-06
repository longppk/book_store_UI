import { authorRequest, bookRequest, genreRequest } from '../utils/requests';

export const search = async (title, size, cPage) => {
    try {
        const res = await bookRequest.get('/search', {
            params: { title, size, cPage },
        });
        return res;
    } catch (error) {
        console.log('Get list book error!');
        console.log(error);
    }
};

export const addNewBook = async (formData) => {
    try {
        const res = await bookRequest.post('', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        console.log('Add new book error!');
    }
};

export const editBook = async (bookId, formData) => {
    try {
        const res = await bookRequest.put(`${bookId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        console.log('Edit book error!');
    }
};

export const deleteBooks = async (bookIds) => {
    try {
        const res = await bookRequest.post(
            `/delete`,
            { bookIds },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        return res;
    } catch (error) {
        console.log(error);
        console.log('Delete book error!');
    }
};

export const getBookInfo = async (bookId) => {
    try {
        const res = await bookRequest.get(`/${bookId}`, {});
        return res;
    } catch (error) {
        console.log(error);
        console.log('Get book info error!');
    }
};

export const getListGenresByBookId = async (bookId) => {
    try {
        const res = await genreRequest.get(`/${bookId}`, {
            transformResponse: [
                function (data) {
                    let newData = JSON.parse(data);
                    let rData = newData.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));

                    return rData;
                },
            ],
        });
        return res;
    } catch (error) {
        console.log(error);
        console.log('Get list genres by book id error!');
    }
};

export const getListAuthorsByBookId = async (bookId) => {
    try {
        const res = await authorRequest.get(`/${bookId}`, {
            transformResponse: [
                function (data) {
                    let newData = JSON.parse(data);
                    let rData = newData.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));

                    return rData;
                },
            ],
        });
        return res;
    } catch (error) {
        console.log(error);
        console.log('Get list authors by book id error!');
    }
};

export const getAllOldImages = async (bookId) => {
    try {
        const res = await bookRequest.get(`/images/${bookId}`, {});
        return res;
    } catch (error) {
        console.log(error);
        console.log('Get list old image by book id error!');
    }
};
