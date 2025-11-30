import { useAuth } from "../Auth/AuthContext";

export const Home = () => {
    const { user } = useAuth();

    return (
        <h1 className="text-white text-xl">
            Welcome, {user?.fullname?.firstname} 👋
        </h1>
    );
};
