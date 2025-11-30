import { Outlet } from "react-router-dom";
import { Layout } from "./Layout";

export const MainLayout = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}