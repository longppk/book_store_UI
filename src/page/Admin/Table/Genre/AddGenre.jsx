import { useState } from 'react';
import { genreServices } from '../../../../apiServices';
import MyCustomInput from '../../../../components/MyCustomInput';
import { useNotify } from '../../../../hooks';
// date format yyyy-MM-dd
const listInputLabels = ['name'];
function AddGenre() {
    const notify = useNotify();
    const [genreInfo, setGenreInfo] = useState(() => ({
        name: '',
        nameValid: true,
    }));

    const handleAddVoucherInputChange = (e, isValid) => {
        setGenreInfo((prev) => ({
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
            if (genreInfo[label] === '') {
                formValid = false;
                errorMessage = 'This ' + label + ' field is required!';
            }

            if (genreInfo[label + 'Valid'] === false) {
                formValid = false;
            }
        });

        const submitForm = async () => {
            const res = await genreServices.addNewGenre(genreInfo.name);
            if (res && res.state === 'success') {
                notify(res.message);
                setGenreInfo((prev) => ({
                    ...prev,
                    name: '',
                    nameValid: true,
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
            <h1 className="my-5 ml-2 text-2xl font-semibold">Add new genre here</h1>
            <div className="bg-white w-full p-5">
                <form className="mx-auto">
                    <MyCustomInput
                        label="Genre Name"
                        name="name"
                        type="text"
                        placeholder="Genre name..."
                        value={genreInfo.name}
                        validation={{ patternRegex: '', errorMessage: '', maxLength: 30 }}
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

export default AddGenre;
