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

export const mailRequestAdmin = async (email) => {
    try {
        const res = await userRequest.get('/register-admin', {
            params: { email },
        });
        return res;
    } catch (error) {
        console.log('Get mail admin request error!');
        console.log(error);
    }
};

export const registerAdminAccount = async (code, email) => {
    try {
        const res = await userRequest.post('/register-admin', { code, email }, {});
        return res;
    } catch (error) {
        console.log('Register admin account error!');
        console.log(error);
    }
};
