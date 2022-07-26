import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// isAuthenticated
function PublicRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={
                ({ location }) => (
                    !true ? (
                        children
                    ) : (
                        <Navigate
                            to={{
                                pathname: '/staff',
                                state: { from: location }
                            }}
                        />
                    ))
            }
        />
    );
}

export default PublicRoute;