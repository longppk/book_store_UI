import { useState } from 'react';
import { voucherServices } from '../../../../apiServices';
import MyCustomInput from '../../../../components/MyCustomInput';
import { useNotify } from '../../../../hooks';
// date format yyyy-MM-dd
const listInputLabels = ['code', 'percent', 'highestRate', 'endDate', 'quantity'];
function AddVoucher() {
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
            const res = await voucherServices.addNewVoucher(
                voucherInfo.code,
                voucherInfo.percent,
                voucherInfo.highestRate,
                voucherInfo.quantity,
                voucherInfo.endDate,
            );
            if (res && res.state === 'success') {
                notify(res.message);
                setVoucherInfo((prev) => ({
                    ...prev,
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
            <h1 className="my-5 ml-2 text-2xl font-semibold">Add new voucher here</h1>
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
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
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
        </>
    );
}

export default AddVoucher;
