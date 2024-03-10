import { useEffect, useState } from 'react';
import { authorServices } from '../../../../apiServices';
import MyCustomInput from '../../../../components/MyCustomInput';
import { useNotify } from '../../../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
// date format yyyy-MM-dd
const listInputLabels = ['name', 'alias'];
function EditAuthor() {
    const notify = useNotify();
    const navigate = useNavigate();
    const { authorId } = useParams();
    const [authorInfo, setAuthorInfo] = useState(() => ({
        name: '',
        nameValid: true,
        alias: '',
        aliasValid: true,
    }));

    useEffect(() => {
        const fetchAuthorInfo = async () => {
            const res = await authorServices.getAuthorInfo(authorId);
            setAuthorInfo((prev) => ({
                ...prev,
                ...res,
            }));
        };

        fetchAuthorInfo();
    }, [authorId]);

    const handleAddVoucherInputChange = (e, isValid) => {
        setAuthorInfo((prev) => ({
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
            if (authorInfo[label] === '') {
                formValid = false;
                errorMessage = 'This ' + label + ' field is required!';
            }

            if (authorInfo[label + 'Valid'] === false) {
                formValid = false;
            }
        });

        const submitForm = async () => {
            const res = await authorServices.editAuthor(authorId, authorInfo.name, authorInfo.alias);
            if (res && res.state === 'success') {
                notify(res.message);
                navigate('/admin/table/author');
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
            <h1 className="my-5 ml-2 text-2xl font-semibold">Add new author here</h1>
            <div className="bg-white w-full p-5">
                <form className="mx-auto">
                    <MyCustomInput
                        label="Author Name"
                        name="name"
                        type="text"
                        placeholder="Author name..."
                        value={authorInfo.name}
                        validation={{ patternRegex: '', errorMessage: '', maxLength: 30 }}
                        onValueChange={handleAddVoucherInputChange}
                    />
                    <MyCustomInput
                        label="Alias"
                        name="alias"
                        type="text"
                        placeholder="Author's alias..."
                        value={authorInfo.alias}
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

export default EditAuthor;
