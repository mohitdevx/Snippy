import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

export const UserAuthRoute = ({ children }) => {
    const { loading, isAuthenticated } = useAuth();

    // While checking session
    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-white text-lg">
                Checking authentication...
            </div>
        );
    }

    // Not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Authenticated
    return children;
};
