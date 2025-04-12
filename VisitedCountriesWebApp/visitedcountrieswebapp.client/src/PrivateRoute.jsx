import { Navigate } from 'react-router-dom';

function PrivateRoute({ authenticated, children }) {
    if (!authenticated) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default PrivateRoute;
