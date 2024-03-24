import { Route, Navigate } from 'react-router-dom';

function PrivateAdminRoute({ children }) {
    const role = localStorage.getItem('role');
    const authenticated = localStorage.getItem('isAuthenticated');
    console.log(typeof authenticated);
    let auth = false;
    if (role === 'ADMIN' && authenticated === 'true') {
        auth = true;
    }
    console.log(auth);
    console.log(typeof auth);
    return auth ? <>{children}</> : <Navigate to="/admin/signIn?tab=signIn" />;
}

export default PrivateAdminRoute;
