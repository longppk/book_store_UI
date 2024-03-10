import { useEffect, useState } from 'react';
import { voucherServices } from '../../../../apiServices';
import MyCustomInput from '../../../../components/MyCustomInput';
import { useNotify } from '../../../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
// date format yyyy-MM-dd
const listInputLabels = ['code', 'percent', 'highestRate', 'endDate', 'quantity'];
function EditVoucher() {
    const { voucherId } = useParams();
    const navigate = useNavigate();
    const notify = useNotify();
    const [voucherInfo, setVoucherInfo] = useState(() => ({
        code: '',
        codeValid: true,
        percent: '',
        percentValid: true,
        highestRate: '',
        highestRateValid: true,
        endDate: '',
        endDateValid: true,
        endDateErrorMessage: '',
        quantity: '',
        quantityValid: true,
    }));

    useEffect(() => {
        const fetchVoucherInfo = async () => {
            const res = await voucherServices.getVoucherInfo(voucherId);
            // console.log(res);
            setVoucherInfo((prev) => ({
                ...prev,
                ...res,
            }));
        };

        fetchVoucherInfo();
    }, [voucherId]);

    const handleAddVoucherInputChange = (e, isValid) => {
        if (e.target.name === 'endDate') {
            setVoucherInfo((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
            return;
        }

        setVoucherInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            [e.target.name + 'Valid']: isValid,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formValid = true;
        let errorMessage = '';

        listInputLabels.forEach((label) => {
            if (voucherInfo[label] === '') {
                formValid = false;
                errorMessage = 'This ' + label + ' field is required!';
            }

            if (voucherInfo[label + 'Valid'] === false) {
                formValid = false;
            }
        });

        const submitForm = async () => {
            const res = await voucherServices.editVoucher(
                voucherId,
                voucherInfo.code,
                voucherInfo.percent,
                voucherInfo.highestRate,
                voucherInfo.quantity,
                voucherInfo.endDate,
            );
            if (res && res.state === 'success') {
                notify(res.message);
                navigate('/admin/table/voucher');
            } else if (res && res.state === 'error') {
                notify(res.message, 'error');
            } else {
                notify('Something went wrong, try again later!', 'error');
            }
        };

        if (!formValid) {
            notify(errorMessage, 'error');
        } else {
            submitForm();
        }
    };

    return (
        <>
            <h1 className="my-5 ml-2 text-2xl font-semibold">Edit voucher</h1>
            {voucherInfo.code !== '' ? (
                <div className="bg-white w-full p-5">
                    <form className="mx-auto">
                        <MyCustomInput
                            label="Code"
                            name="code"
                            type="text"
                            placeholder="Code..."
                            value={voucherInfo.code}
                            validation={{ patternRegex: '', errorMessage: '', maxLength: 10 }}
                            onValueChange={handleAddVoucherInputChange}
                        />
                        <MyCustomInput
                            label="Percent"
                            name="percent"
                            type="text"
                            placeholder="0.x..."
                            value={voucherInfo.percent}
                            validation={{
                                patternRegex: /^(0?\.\d{2}|1\.00)$/,
                                errorMessage: 'This number is not valid!',
                                maxLength: 4,
                            }}
                            onValueChange={handleAddVoucherInputChange}
                        />
                        <MyCustomInput
                            label="Highest Rate"
                            name="highestRate"
                            type="text"
                            placeholder="From 10000 to 999999..."
                            value={voucherInfo.highestRate}
                            validation={{
                                patternRegex: /^(1\d{4}|[2-9]\d{4})$/,
                                errorMessage: 'This number is not valid!',
                                maxLength: 6,
                            }}
                            onValueChange={handleAddVoucherInputChange}
                        />
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                End Date
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                                value={voucherInfo.endDate}
                                onChange={handleAddVoucherInputChange}
                            />
                            <div className="mt-2 ms-1 text-sm text-red-500 italic">
                                {voucherInfo.endDateValid === false && voucherInfo.endDateErrorMessage}
                            </div>
                        </div>
                        <MyCustomInput
                            label="Quantity"
                            name="quantity"
                            type="text"
                            placeholder="From 0 to 999999..."
                            value={voucherInfo.quantity}
                            validation={{
                                patternRegex: /^(?:[0-9]|[1-9][0-9]{0,4}|99999)$/,
                                errorMessage: 'This number is not valid!',
                                maxLength: 6,
                            }}
                            onValueChange={handleAddVoucherInputChange}
                        />

                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            ) : (
                <div role="status" className="bg-transparent w-full h-[500px] flex justify-center items-center">
                    <svg
                        aria-hidden="true"
                        className="size-20 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
        </>
    );
}

export default EditVoucher;
