import { bookRequest } from '../utils/requests';

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
        console.log('Add movie error!');
    }
};
