import Navbar from '@/components/Navbar';
import CodeLabel from '@/components/CodeLabel';
import CodeBlock from '@/components/CodeBlock';

const paginatedQuery = `const { data, error, isLoading, isError, isFetching, isPreviousData } = useQuery(
    queryKey: ['myQueryKey', { page: 1, pageSize: 10 } { keepPreviousData: true }], 
    queryFn: fetchDataFunction,
);`;

const infiniteQuery = `const { data, error, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery(
    queryKey: 'myQueryKey', 
    queryFn: fetchData,
    getNextPageParam: lastPage => lastPage.next ?? undefined,
});`;

function App() {
    return (
        <div className='h-full w-full p-[2rem] leading-8'>
            <Navbar />
            <div className='h-full w-full flex flex-col align-center justify-center mt-10 text-left overflow-hidden'>
                <h2 className='text-4xl font-bold mb-4'>Paginated Queries vs Infinite Queries</h2>
                <p className='text-gray-700 mb-4 text-lg'>
                    Explore the power of paginated and infinite queries with React Query to optimize data fetching in
                    your applications.
                </p>
                <p className='text-gray-700 mb-4 text-lg'>
                    <strong>Paginated Queries:</strong> Use <CodeLabel>useQuery</CodeLabel> to fetch specific pages of
                    data. Perfect for scenarios where you want to load data on-demand or in response to user actions.
                </p>
                <CodeBlock code={paginatedQuery} />
                <br />
                <p className='text-gray-700 mb-4 text-lg'>
                    <strong>Infinite Queries:</strong> Use <CodeLabel>useInfiniteQuery</CodeLabel> for dynamic,
                    continuous data loading. Ideal for scenarios like infinite scrolling, where you fetch new data
                    seamlessly as the user scrolls down.
                </p>
                <CodeBlock code={infiniteQuery} />
                <br />
                <p className='text-gray-700 mb-4 text-lg'>
                    Learn more about these powerful hooks and enhance the performance of your React applications with
                    efficient data fetching.
                </p>
            </div>
        </div>
    );
}

export default App;
