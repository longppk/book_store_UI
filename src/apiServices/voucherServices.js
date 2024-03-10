import { voucherRequest } from '../utils/requests';

export const search = async (code, size, cPage) => {
    try {
        const res = await voucherRequest.get('/search', {
            params: { code, size, cPage },
        });
        return res;
    } catch (error) {
        console.log('Get list voucher error!');
        console.log(error);
    }
};

export const getVoucherInfo = async (voucherId) => {
    try {
        const res = await voucherRequest.get(`/${voucherId}`, {});
        return res;
    } catch (error) {
        console.log('Get voucher info error!');
        console.log(error);
    }
};

export const addNewVoucher = async (code, percent, highestRate, quantity, endDate) => {
    try {
        const res = await voucherRequest.post(
            '',
            {
                code,
                percent,
                highestRate,
                quantity,
                endDate,
            },
            {},
        );
        return res;
    } catch (error) {
        console.log('Add new voucher voucher error!');
        console.log(error);
    }
};

export const editVoucher = async (id, code, percent, highestRate, quantity, endDate) => {
    try {
        const res = await voucherRequest.put(
            `/${id}`,
            {
                id,
                code,
                percent,
                highestRate,
                quantity,
                endDate,
            },
            {},
        );
        return res;
    } catch (error) {
        console.log('Edit voucher voucher error!');
        console.log(error);
    }
};
