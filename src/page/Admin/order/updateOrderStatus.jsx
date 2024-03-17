import { useEffect, useState } from 'react';
import { orderServices } from '../../../apiServices';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { useNotify } from '../../../hooks';

function UpdateOrderStatus() {
    const { orderId } = useParams();
    const [orderInfo, setOrderInfo] = useState();
    const listStatus = ['pending', 'transferred to shipper', 'shipping', 'taken'];
    const notify = useNotify();
    useEffect(() => {
        const fetchOrderInfo = async () => {
            const res = await orderServices.getOrderInfo(orderId);
            setOrderInfo(res);
        };

        fetchOrderInfo();
    }, [orderId]);

    const handleSelectStatus = (e) => {
        setOrderInfo((prev) => ({
            ...prev,
            status: e.target.value,
        }));
    };

    const handleStatusClick = (status) => {
        setOrderInfo((prev) => ({
            ...prev,
            status: status,
        }));
    };

    const handleSubmit = () => {
        const updateOrderStatus = async () => {
            const res = await orderServices.updateOrderStatus(orderId, orderInfo.status);
            if (res && res.state === 'success') {
                notify(res.message);
                // setOrderInfo(res.data);
            } else {
                notify('Something went wrong!', 'error');
            }
        };

        updateOrderStatus();
    };
    return (
        <div className="bg-white w-full p-5 mt-5">
            <h1 className="text-2xl font-bold mb-5">Update order status</h1>
            {orderInfo ? (
                <>
                    <div>
                        <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
                            {listStatus.map((status, index) => {
                                if (status === orderInfo.status) {
                                    return (
                                        <li
                                            key={status}
                                            className="cursor-pointer flex items-center text-blue-600 dark:text-blue-500 space-x-2.5 rtl:space-x-reverse"
                                            onClick={() => handleStatusClick(status)}
                                        >
                                            <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                                                {index + 1}
                                            </span>
                                            <span>
                                                <h3 className="font-medium leading-tight">{status}</h3>
                                            </span>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li
                                            key={status}
                                            className="cursor-pointer flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse"
                                            onClick={() => handleStatusClick(status)}
                                        >
                                            <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                                {index + 1}
                                            </span>
                                            <span>
                                                <h3 className="font-medium leading-tight">{status}</h3>
                                            </span>
                                        </li>
                                    );
                                }
                            })}
                        </ol>
                    </div>

                    <ul>
                        <li className="w-full flex my-7">
                            <div className="w-1/4 text-right text-gray-400">Id: </div>
                            <p className="w-3/4 ml-7">{orderInfo.id}</p>
                        </li>
                        <li className="w-full flex my-7">
                            <div className="w-1/4 text-right text-gray-400">Address: </div>
                            <p className="w-3/4 ml-7">{orderInfo.address}</p>
                        </li>
                        <li className="w-full flex my-7">
                            <div className="w-1/4 text-right text-gray-400">Status: </div>
                            <select
                                className="w-3/4 ml-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={orderInfo.status}
                                onChange={handleSelectStatus}
                            >
                                {listStatus.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </li>
                        <li className="w-full flex my-7 text-gray-400">
                            <div className="w-1/4 text-right"></div>

                            <button
                                type="button"
                                className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </li>
                    </ul>
                </>
            ) : (
                <Skeleton className="w-full" height={300} />
            )}
        </div>
    );
}

export default UpdateOrderStatus;
