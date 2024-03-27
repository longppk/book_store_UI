import { useLocation, useNavigate } from 'react-router-dom';
import Routing from './routers/Routing';
import { useEffect } from 'react';

function App() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    useEffect(() => {
        if (!pathname.includes('/admin') && role === 'ADMIN') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('role');
            window.location = '/authenticate';
        }
    }, []);
    return (
        <>
            <Routing />
        </>
    );
}

export default App;
