import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { Signup } from '../pages/Signup';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { MainLayout } from '../Layout/MainLayout';
import { CreateSnippet } from '../pages/CreateSnippet';
import { Canvas } from '../pages/Canvas';
import { NotFound } from '../pages/NotFound';
import { CodeSnippets } from '../pages/CodeSnippets';
import { FoldersPage } from '../pages/FolderPage';
import { ProfileSettings } from '../pages/Profile';

const router = createBrowserRouter([
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "", element: <Dashboard /> },
            { path: "profile", element: <ProfileSettings/>},
            { path: "create", element: <CreateSnippet /> },
            { path: "snippets", element: <CodeSnippets /> },
            { path: "snippets/:id", element: <Canvas /> },
            { path: "favorites", element: <CodeSnippets type='favorite' /> },
            { path: "notes", element: <CreateSnippet category='notes' /> },
            { path: "folder", element: <FoldersPage/>}
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }

])

export const AppRoutes = () => {
    return (
        <RouterProvider router={router} />
    );
};


