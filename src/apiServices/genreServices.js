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
