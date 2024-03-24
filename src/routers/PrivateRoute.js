import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/userSlice';
const PrivateRoute = ({ element: Element, ...rest }) => {
    const { isAuthenticated } = useSelector(selectUser);

    if (isAuthenticated) {
        return <Route {...rest} element={<Element />} />;
    } else {
        return <Navigate to="/authenticate" replace={true} />;
    }
};

export default PrivateRoute;
