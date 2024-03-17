import { orderRequest } from '../utils/requests';

export const search = async (q, size, cPage) => {
    try {
        const res = await orderRequest.get('/search', {
            params: { q, size, cPage },
        });
        return res;
    } catch (error) {
        console.log('Get list order error!');
        console.log(error);
    }
};

export const getOrderInfo = async (orderInfo) => {
    try {
        const res = await orderRequest.get(`/${orderInfo}`, {});
        return res;
    } catch (error) {
        console.log('Get order info error!');
        console.log(error);
    }
};

export const updateOrderStatus = async (orderInfo, status) => {
    try {
        const res = await orderRequest.put(
            `/${orderInfo}`,
            {
                status,
            },
            {},
        );
        return res;
    } catch (error) {
        console.log('Get order info error!');
        console.log(error);
    }
};
