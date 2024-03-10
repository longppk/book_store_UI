import { authorRequest } from '../utils/requests';

export const search = async (name, size, cPage) => {
    try {
        const res = await authorRequest.get('/search', {
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
        console.log('Get list author error!');
        console.log(error);
    }
};

export const searchWithoutTransform = async (name, size, cPage) => {
    try {
        const res = await authorRequest.get('/search', {
            params: { name, size, cPage },
        });
        return res;
    } catch (error) {
        console.log('Get list author error!');
        console.log(error);
    }
};

export const addNewAuthor = async (name, alias) => {
    try {
        const res = await authorRequest.post(
            '',
            {
                name,
                alias,
            },
            {},
        );
        return res;
    } catch (error) {
        console.log('Add new author error!');
        console.log(error);
    }
};

export const editAuthor = async (id, name, alias) => {
    try {
        const res = await authorRequest.put(
            `${id}`,
            {
                id,
                name,
                alias,
            },
            {},
        );
        return res;
    } catch (error) {
        console.log('Edit author error!');
        console.log(error);
    }
};

export const getAuthorInfo = async (id) => {
    try {
        const res = await authorRequest.get(`/info/${id}`, {});
        return res;
    } catch (error) {
        console.log('Get author info error!');
        console.log(error);
    }
};
