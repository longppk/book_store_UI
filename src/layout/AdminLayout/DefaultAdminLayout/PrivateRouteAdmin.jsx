import { Route, Navigate } from 'react-router-dom';

function PrivateRouteAdmin(props) {
    let { element: Element, children, render, ...rest } = props;
    let auth = localStorage.getItem('isAuthenticated');
    return <Route {...rest} render={() => (auth ? <Element /> : <Navigate to="/admin/signIn?tab=signIn" />)} />;
}

export default PrivateRouteAdmin;
