import PropTypes from 'prop-types';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa6';

function StatisticalCard({ color, icon, title, value, footer }) {
    let iconColor = '';
    switch (color) {
        case 'pink':
            iconColor = 'bg-pink-500';
            break;
        case 'blue':
            iconColor = 'bg-blue-500';
            break;
        case 'yellow':
            iconColor = 'bg-yellow-500';
            break;
        default:
            iconColor = 'bg-purple-500';
    }
    return (
        <div className="p-5 bg-white rounded-xl shadow-md">
            <div className="mb-3 flex items-start place-content-between">
                <div className="font-semibold">
                    <p className="text-gray-400">{title}</p>
                    <p className="text-2xl text-black">{value}</p>
                </div>
                <div
                    className={`w-12 h-12 rounded-full text-white text-2xl flex justify-center items-center ${iconColor}`}
                >
                    {icon}
                </div>
            </div>
            <div className="flex items-center">
                {footer.color === 'green' ? (
                    <div className="p-1 flex items-center bg-green-200 text-xs text-green-500 rounded-md">
                        <FaArrowUp className="mr-1" />
                        <p>{footer.value}</p>
                    </div>
                ) : (
                    <div className="p-1 flex items-center bg-red-200 text-xs text-red-500 rounded-md">
                        <FaArrowDown className="mr-1" />
                        <p>{footer.value}</p>
                    </div>
                )}
                <p className="ml-3 text-sm text-gray-400">{footer.label}</p>
            </div>
        </div>
    );
}

StatisticalCard.defaultProps = {
    footer: {
        color: 'green',
        value: '',
        label: '',
    },
};

StatisticalCard.prototype = {
    color: PropTypes.oneOf[('pink', 'purple', 'blue', 'yellow')],
    icon: PropTypes.node,
    title: PropTypes.string,
    value: PropTypes.string,
    footer: PropTypes.object,
};

export default StatisticalCard;
