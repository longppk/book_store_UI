import { Navigate } from 'react-router-dom';

function PrivateAdminRoute({ children }) {
    const role = localStorage.getItem('role');
    const authenticated = localStorage.getItem('isAuthenticated');
    let auth = false;
    if (role === 'ADMIN' && authenticated === 'true') {
        auth = true;
    }

    return auth ? <>{children}</> : <Navigate to="/admin/signIn?tab=signIn" />;
}

export default PrivateAdminRoute;
