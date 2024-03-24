import { useState } from 'react';
import { userServices } from '../../apiServices';
import { useNavigate } from 'react-router-dom';
import { useNotify } from '../../hooks';

const validation = {
    username: {
        maxLength: 20,
    },
    email: {
        patternRegex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        errorMessage: 'Your email is not valid!!!',
    },
    password: {
        patternRegex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
        errorMessage: 'Minimum eight characters, at least a number, and at least a special character.',
        maxLength: 20,
    },
};

const lengthErrorMessage = (l) => {
    return 'This field has a maximum of ' + l + ' characters.';
};

const validInput = (value, validation = {}) => {
    if (value !== '') {
        if (validation.maxLength && value.length >= validation.maxLength) {
            return { valid: false, messageError: lengthErrorMessage(validation.maxLength) };
        } else {
            const regex = new RegExp(validation.patternRegex);
            if (!regex.test(value)) {
                return { valid: false, messageError: validation.errorMessage };
            } else {
                return { valid: true, messageError: '' };
            }
        }
    } else {
        return { valid: false, messageError: 'This field is blank!' };
    }
};

const maskEmail = (email) => {
    // Split email address into local part and domain part
    const [localPart, domain] = email.split('@');

    // If local part has less than 4 characters, return the original email
    if (localPart.length <= 4) {
        return email;
    }

    // Get the first two characters of the local part
    const firstTwoChars = localPart.substring(0, 2);

    // Create the masked local part with asterisks
    const maskedLocalPart = firstTwoChars + '*'.repeat(localPart.length - 4) + localPart.slice(-2);

    // Return the masked email address
    return maskedLocalPart + '@' + domain;
};

const fields = ['email'];
const otpFields = ['one', 'two', 'three', 'four', 'five', 'six'];

function AdminSignUp() {
    const [signUpInfo, setSignUpInfo] = useState(() => ({
        email: '',
        emailErrorMessage: '',
    }));
    const [otpCode, setOtpCode] = useState(() => ({
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        six: '',
    }));
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();
    const notify = useNotify();

    const handleOptCodeChange = (e) => {
        const regex = new RegExp('[0-9]');
        if (regex.test(e.target.value)) {
            setOtpCode((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
            const indexNextField = otpFields.indexOf(e.target.name);
            if (indexNextField !== -1 && indexNextField + 1 < otpFields.length) {
                const nextfield = document.querySelector(`input[name=${otpFields[indexNextField + 1]}]`);

                // If found, focus the next field
                if (nextfield !== null) {
                    nextfield.focus();
                }
            }
        } else {
            setOtpCode((prev) => ({
                ...prev,
                [e.target.name]: '',
            }));
        }
    };

    const handleInputChange = (e) => {
        setSignUpInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const submitFormSendMail = () => {
        let formValid = true;
        fields.forEach((field) => {
            const { valid, messageError } = validInput(signUpInfo[field], validation[field]);
            if (!valid) {
                setSignUpInfo((prev) => ({
                    ...prev,
                    [field + 'ErrorMessage']: messageError,
                }));
                formValid = false;
            } else {
                setSignUpInfo((prev) => ({
                    ...prev,
                    [field + 'ErrorMessage']: '',
                }));
            }
        });

        const sendMail = async () => {
            const res = await userServices.mailRequestAdmin(signUpInfo.email);
            if (res) {
                if (res.state === 'success') {
                    setIsOtpSent(true);
                } else {
                    notify(res.message, 'error');
                }
            } else {
                notify('Something went wrong!', 'error');
            }
        };

        if (formValid) {
            sendMail();
        }
    };

    const submitFormOtpCode = () => {
        let formValid = true;
        otpFields.forEach((f) => {
            if (otpCode[f] === '') {
                formValid = false;
            }
        });

        const registerNewAdminAccount = async (code) => {
            const res = await userServices.registerAdminAccount(code, signUpInfo.email);
            if (res && res.state === 'success') {
                notify('Check your email signIn with us!');
                navigate('/admin/signIn');
            }
            console.log(res);
        };

        if (formValid) {
            const code = otpCode.one + otpCode.two + otpCode.three + otpCode.four + otpCode.five + otpCode.six;
            registerNewAdminAccount(code);
        }
    };

    const handleSubmit = () => {
        if (!isOtpSent) {
            submitFormSendMail();
        } else {
            submitFormOtpCode();
        }
    };

    return (
        <>
            <div className="bg-white relative lg:py-20">
                <div
                    className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
  xl:px-5 lg:flex-row"
                >
                    <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
                        <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
                            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                                <img
                                    src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png"
                                    className="btn-"
                                    alt="ss"
                                />
                            </div>
                        </div>
                        <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
                            <div
                                className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
        relative z-10"
                            >
                                <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                                    Sign up for an account
                                </p>
                                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                    <div className="relative">
                                        {isOtpSent ? (
                                            <div className="w-full">
                                                <div className="bg-white h-64 py-3 rounded text-center">
                                                    <h1 className="text-2xl font-bold">OTP Verification</h1>
                                                    <div className="flex flex-col mt-4">
                                                        <span>Enter the OTP you received at</span>
                                                        <span className="font-bold">{maskEmail(signUpInfo.email)}</span>
                                                    </div>
                                                    <div className="flex flex-row justify-center text-center px-2 mt-5">
                                                        <input
                                                            className="m-2 border h-10 w-10 text-center form-control rounded"
                                                            type="text"
                                                            name="one"
                                                            value={otpCode.one}
                                                            maxLength={1}
                                                            onChange={handleOptCodeChange}
                                                        />
                                                        <input
                                                            className="m-2 border h-10 w-10 text-center form-control rounded"
                                                            type="text"
                                                            name="two"
                                                            value={otpCode.two}
                                                            maxLength={1}
                                                            onChange={handleOptCodeChange}
                                                        />
                                                        <input
                                                            className="m-2 border h-10 w-10 text-center form-control rounded"
                                                            type="text"
                                                            name="three"
                                                            value={otpCode.three}
                                                            maxLength={1}
                                                            onChange={handleOptCodeChange}
                                                        />
                                                        <input
                                                            className="m-2 border h-10 w-10 text-center form-control rounded"
                                                            type="text"
                                                            name="four"
                                                            value={otpCode.four}
                                                            maxLength={1}
                                                            onChange={handleOptCodeChange}
                                                        />
                                                        <input
                                                            className="m-2 border h-10 w-10 text-center form-control rounded"
                                                            type="text"
                                                            name="five"
                                                            value={otpCode.five}
                                                            maxLength={1}
                                                            onChange={handleOptCodeChange}
                                                        />
                                                        <input
                                                            className="m-2 border h-10 w-10 text-center form-control rounded"
                                                            type="text"
                                                            name="six"
                                                            value={otpCode.six}
                                                            maxLength={1}
                                                            onChange={handleOptCodeChange}
                                                        />
                                                    </div>
                                                    <div className="flex justify-center text-center mt-5">
                                                        <button className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                                                            <span className="font-bold" onClick={submitFormSendMail}>
                                                                Resend OTP
                                                            </span>
                                                            <i className="bx bx-caret-right ml-1" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                                                    Email
                                                </p>
                                                <input
                                                    placeholder="123@ex.com"
                                                    type="text"
                                                    name="email"
                                                    value={signUpInfo.email}
                                                    className="border placeholder-gray-400 focus:outline-none
                       focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                       border-gray-300 rounded-md"
                                                    onChange={handleInputChange}
                                                />
                                                <div className="mt-2 text-sm italic text-red-500">
                                                    {signUpInfo.emailErrorMessage}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <button
                                            className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
              rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <svg
                                viewBox="0 0 91 91"
                                className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300
        fill-current"
                            >
                                <g stroke="none" strokeWidth={1} fillRule="evenodd">
                                    <g fillRule="nonzero">
                                        <g>
                                            <g>
                                                <circle cx="3.261" cy="3.445" r="2.72" />
                                                <circle cx="15.296" cy="3.445" r="2.719" />
                                                <circle cx="27.333" cy="3.445" r="2.72" />
                                                <circle cx="39.369" cy="3.445" r="2.72" />
                                                <circle cx="51.405" cy="3.445" r="2.72" />
                                                <circle cx="63.441" cy="3.445" r="2.72" />
                                                <circle cx="75.479" cy="3.445" r="2.72" />
                                                <circle cx="87.514" cy="3.445" r="2.719" />
                                            </g>
                                            <g transform="translate(0 12)">
                                                <circle cx="3.261" cy="3.525" r="2.72" />
                                                <circle cx="15.296" cy="3.525" r="2.719" />
                                                <circle cx="27.333" cy="3.525" r="2.72" />
                                                <circle cx="39.369" cy="3.525" r="2.72" />
                                                <circle cx="51.405" cy="3.525" r="2.72" />
                                                <circle cx="63.441" cy="3.525" r="2.72" />
                                                <circle cx="75.479" cy="3.525" r="2.72" />
                                                <circle cx="87.514" cy="3.525" r="2.719" />
                                            </g>
                                            <g transform="translate(0 24)">
                                                <circle cx="3.261" cy="3.605" r="2.72" />
                                                <circle cx="15.296" cy="3.605" r="2.719" />
                                                <circle cx="27.333" cy="3.605" r="2.72" />
                                                <circle cx="39.369" cy="3.605" r="2.72" />
                                                <circle cx="51.405" cy="3.605" r="2.72" />
                                                <circle cx="63.441" cy="3.605" r="2.72" />
                                                <circle cx="75.479" cy="3.605" r="2.72" />
                                                <circle cx="87.514" cy="3.605" r="2.719" />
                                            </g>
                                            <g transform="translate(0 36)">
                                                <circle cx="3.261" cy="3.686" r="2.72" />
                                                <circle cx="15.296" cy="3.686" r="2.719" />
                                                <circle cx="27.333" cy="3.686" r="2.72" />
                                                <circle cx="39.369" cy="3.686" r="2.72" />
                                                <circle cx="51.405" cy="3.686" r="2.72" />
                                                <circle cx="63.441" cy="3.686" r="2.72" />
                                                <circle cx="75.479" cy="3.686" r="2.72" />
                                                <circle cx="87.514" cy="3.686" r="2.719" />
                                            </g>
                                            <g transform="translate(0 49)">
                                                <circle cx="3.261" cy="2.767" r="2.72" />
                                                <circle cx="15.296" cy="2.767" r="2.719" />
                                                <circle cx="27.333" cy="2.767" r="2.72" />
                                                <circle cx="39.369" cy="2.767" r="2.72" />
                                                <circle cx="51.405" cy="2.767" r="2.72" />
                                                <circle cx="63.441" cy="2.767" r="2.72" />
                                                <circle cx="75.479" cy="2.767" r="2.72" />
                                                <circle cx="87.514" cy="2.767" r="2.719" />
                                            </g>
                                            <g transform="translate(0 61)">
                                                <circle cx="3.261" cy="2.846" r="2.72" />
                                                <circle cx="15.296" cy="2.846" r="2.719" />
                                                <circle cx="27.333" cy="2.846" r="2.72" />
                                                <circle cx="39.369" cy="2.846" r="2.72" />
                                                <circle cx="51.405" cy="2.846" r="2.72" />
                                                <circle cx="63.441" cy="2.846" r="2.72" />
                                                <circle cx="75.479" cy="2.846" r="2.72" />
                                                <circle cx="87.514" cy="2.846" r="2.719" />
                                            </g>
                                            <g transform="translate(0 73)">
                                                <circle cx="3.261" cy="2.926" r="2.72" />
                                                <circle cx="15.296" cy="2.926" r="2.719" />
                                                <circle cx="27.333" cy="2.926" r="2.72" />
                                                <circle cx="39.369" cy="2.926" r="2.72" />
                                                <circle cx="51.405" cy="2.926" r="2.72" />
                                                <circle cx="63.441" cy="2.926" r="2.72" />
                                                <circle cx="75.479" cy="2.926" r="2.72" />
                                                <circle cx="87.514" cy="2.926" r="2.719" />
                                            </g>
                                            <g transform="translate(0 85)">
                                                <circle cx="3.261" cy="3.006" r="2.72" />
                                                <circle cx="15.296" cy="3.006" r="2.719" />
                                                <circle cx="27.333" cy="3.006" r="2.72" />
                                                <circle cx="39.369" cy="3.006" r="2.72" />
                                                <circle cx="51.405" cy="3.006" r="2.72" />
                                                <circle cx="63.441" cy="3.006" r="2.72" />
                                                <circle cx="75.479" cy="3.006" r="2.72" />
                                                <circle cx="87.514" cy="3.006" r="2.719" />
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <svg
                                viewBox="0 0 91 91"
                                className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500
        fill-current"
                            >
                                <g stroke="none" strokeWidth={1} fillRule="evenodd">
                                    <g fillRule="nonzero">
                                        <g>
                                            <g>
                                                <circle cx="3.261" cy="3.445" r="2.72" />
                                                <circle cx="15.296" cy="3.445" r="2.719" />
                                                <circle cx="27.333" cy="3.445" r="2.72" />
                                                <circle cx="39.369" cy="3.445" r="2.72" />
                                                <circle cx="51.405" cy="3.445" r="2.72" />
                                                <circle cx="63.441" cy="3.445" r="2.72" />
                                                <circle cx="75.479" cy="3.445" r="2.72" />
                                                <circle cx="87.514" cy="3.445" r="2.719" />
                                            </g>
                                            <g transform="translate(0 12)">
                                                <circle cx="3.261" cy="3.525" r="2.72" />
                                                <circle cx="15.296" cy="3.525" r="2.719" />
                                                <circle cx="27.333" cy="3.525" r="2.72" />
                                                <circle cx="39.369" cy="3.525" r="2.72" />
                                                <circle cx="51.405" cy="3.525" r="2.72" />
                                                <circle cx="63.441" cy="3.525" r="2.72" />
                                                <circle cx="75.479" cy="3.525" r="2.72" />
                                                <circle cx="87.514" cy="3.525" r="2.719" />
                                            </g>
                                            <g transform="translate(0 24)">
                                                <circle cx="3.261" cy="3.605" r="2.72" />
                                                <circle cx="15.296" cy="3.605" r="2.719" />
                                                <circle cx="27.333" cy="3.605" r="2.72" />
                                                <circle cx="39.369" cy="3.605" r="2.72" />
                                                <circle cx="51.405" cy="3.605" r="2.72" />
                                                <circle cx="63.441" cy="3.605" r="2.72" />
                                                <circle cx="75.479" cy="3.605" r="2.72" />
                                                <circle cx="87.514" cy="3.605" r="2.719" />
                                            </g>
                                            <g transform="translate(0 36)">
                                                <circle cx="3.261" cy="3.686" r="2.72" />
                                                <circle cx="15.296" cy="3.686" r="2.719" />
                                                <circle cx="27.333" cy="3.686" r="2.72" />
                                                <circle cx="39.369" cy="3.686" r="2.72" />
                                                <circle cx="51.405" cy="3.686" r="2.72" />
                                                <circle cx="63.441" cy="3.686" r="2.72" />
                                                <circle cx="75.479" cy="3.686" r="2.72" />
                                                <circle cx="87.514" cy="3.686" r="2.719" />
                                            </g>
                                            <g transform="translate(0 49)">
                                                <circle cx="3.261" cy="2.767" r="2.72" />
                                                <circle cx="15.296" cy="2.767" r="2.719" />
                                                <circle cx="27.333" cy="2.767" r="2.72" />
                                                <circle cx="39.369" cy="2.767" r="2.72" />
                                                <circle cx="51.405" cy="2.767" r="2.72" />
                                                <circle cx="63.441" cy="2.767" r="2.72" />
                                                <circle cx="75.479" cy="2.767" r="2.72" />
                                                <circle cx="87.514" cy="2.767" r="2.719" />
                                            </g>
                                            <g transform="translate(0 61)">
                                                <circle cx="3.261" cy="2.846" r="2.72" />
                                                <circle cx="15.296" cy="2.846" r="2.719" />
                                                <circle cx="27.333" cy="2.846" r="2.72" />
                                                <circle cx="39.369" cy="2.846" r="2.72" />
                                                <circle cx="51.405" cy="2.846" r="2.72" />
                                                <circle cx="63.441" cy="2.846" r="2.72" />
                                                <circle cx="75.479" cy="2.846" r="2.72" />
                                                <circle cx="87.514" cy="2.846" r="2.719" />
                                            </g>
                                            <g transform="translate(0 73)">
                                                <circle cx="3.261" cy="2.926" r="2.72" />
                                                <circle cx="15.296" cy="2.926" r="2.719" />
                                                <circle cx="27.333" cy="2.926" r="2.72" />
                                                <circle cx="39.369" cy="2.926" r="2.72" />
                                                <circle cx="51.405" cy="2.926" r="2.72" />
                                                <circle cx="63.441" cy="2.926" r="2.72" />
                                                <circle cx="75.479" cy="2.926" r="2.72" />
                                                <circle cx="87.514" cy="2.926" r="2.719" />
                                            </g>
                                            <g transform="translate(0 85)">
                                                <circle cx="3.261" cy="3.006" r="2.72" />
                                                <circle cx="15.296" cy="3.006" r="2.719" />
                                                <circle cx="27.333" cy="3.006" r="2.72" />
                                                <circle cx="39.369" cy="3.006" r="2.72" />
                                                <circle cx="51.405" cy="3.006" r="2.72" />
                                                <circle cx="63.441" cy="3.006" r="2.72" />
                                                <circle cx="75.479" cy="3.006" r="2.72" />
                                                <circle cx="87.514" cy="3.006" r="2.719" />
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminSignUp;
