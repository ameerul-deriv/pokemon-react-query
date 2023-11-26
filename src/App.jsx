import { Fragment } from 'react';
import './App.css';
import Navbar from '@/components/Navbar';
import CodeLabel from '@/components/CodeLabel';

function App() {
    return (
        <Fragment>
            <Navbar />
            <div className='h-[50vh] w-full flex flex-col align-center justify-center mt-8 p-4 text-left'>
                <h2 className='text-4xl font-bold mb-4'>Paginated Queries vs Infinite Queries</h2>
                <p className='text-gray-700 mb-4 text-lg'>
                    Explore the power of paginated and infinite queries with React Query to optimize data fetching in
                    your applications.
                </p>
                <p className='text-gray-700 mb-4 text-lg'>
                    <strong>Paginated Queries:</strong> Use <CodeLabel>useQuery</CodeLabel> to fetch specific pages of
                    data. Perfect for scenarios where you want to load data on-demand or in response to user actions.
                </p>
                <p className='text-gray-700 mb-4 text-lg'>
                    <strong>Infinite Queries:</strong> Embrace <CodeLabel>useInfiniteQuery</CodeLabel> for dynamic,
                    continuous data loading. Ideal for scenarios like infinite scrolling, where you fetch new data
                    seamlessly as the user scrolls down.
                </p>
                <p className='text-gray-700 mb-4 text-lg'>
                    Learn more about these powerful hooks and enhance the performance of your React applications with
                    efficient data fetching.
                </p>
            </div>
        </Fragment>
    );
}

export default App;
