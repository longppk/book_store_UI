import { userRequest } from '../utils/requests';

export const search = async (q, size, cPage) => {
    try {
        const res = await userRequest.get('/search', {
            params: { q, size, cPage },
        });
        return res;
    } catch (error) {
        console.log('Get list user error!');
        console.log(error);
    }
};
