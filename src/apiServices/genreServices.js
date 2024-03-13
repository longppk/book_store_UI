import { genreRequest } from '../utils/requests';

export const search = async (name, size, cPage) => {
    try {
        const res = await genreRequest.get('/search', {
            params: { name, size, cPage },
            transformResponse: [
                function (data) {
                    let newData = JSON.parse(data);
                    let rData = newData.data.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));

                    return rData;
                },
            ],
        });
        return res;
    } catch (error) {
        console.log('Get list genre error!');
        console.log(error);
    }
};

export const searchWithoutTransform = async (name, size, cPage) => {
    try {
        const res = await genreRequest.get('/search', {
            params: { name, size, cPage },
        });
        return res;
    } catch (error) {
        console.log('Get list genre error!');
        console.log(error);
    }
};

export const getGenreInfo = async (id) => {
    try {
        const res = await genreRequest.get(`/info/${id}`, {});
        return res;
    } catch (error) {
        console.log('Get genre ifo error!');
        console.log(error);
    }
};

export const editGenre = async (id, name) => {
    try {
        const res = await genreRequest.put(
            `/${id}`,
            {
                id,
                name,
            },
            {},
        );
        return res;
    } catch (error) {
        console.log('Edit genre error!');
        console.log(error);
    }
};

export const addNewGenre = async (name) => {
    try {
        const res = await genreRequest.post(
            '',
            {
                name,
            },
            {},
        );
        return res;
    } catch (error) {
        console.log('Add new genre error!');
        console.log(error);
    }
};
