import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PaginationComponent from './pages/PaginationPage/PaginationPage.jsx';
import InfiniteQueriesComponent from './pages/InfiniteQueriesPage/InfiniteQueriesPage.jsx';

const queryClient = new QueryClient();
const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/pagination', element: <PaginationComponent /> },
    { path: '/infinite', element: <InfiniteQueriesComponent /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>
);
