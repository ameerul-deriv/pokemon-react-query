import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CodeLabel from './CodeLabel';
import CodeBlock from './CodeBlock';

const codeExample = `const Component = () => {
    const [page, setPage] = React.useState(0);
    const { data } = useQuery(['myQueryKey', { page: 1, pageSize: 10 }], fetchDataFunction);
    return (
        <div>
            {data.results.map(pokemon => (
                <div key={pokemon.name}>
                    <div>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <h1>{pokemon.name}</h1>
                    </div>
                </div>
            ))}
            <div>
                <button onClick={() => setPage(page => page - 1)} disabled={page === 0}>
                    Previous
                </button>
                <p className='ml-10 mr-10'>Page {page}</p>
                <button onClick={() => setPage(page => page + 1)} disabled={!data || data.length === 0}>
                    Next
                </button>
            </div>
        </div>
    );
}`;

const initialQuery = `const { data, isLoading } = useQuery(
    queryKey: 'myQueryKey', 
    queryFn: fetchDataFunction,
);`;

const paginatedQuery = `const { data, isLoading } = useQuery(
    queryKey: ['myQueryKey', { page: 1, pageSize: 10 }], 
    queryFn: fetchDataFunction,
);`;

const keepPreviousData = `const { data, isLoading } = useQuery(
    queryKey: ['myQueryKey', { page: 1, pageSize: 10 } { keepPreviousData: true }], 
    queryFn: fetchDataFunction,
);`;

const PaginationInformation = () => {
    const information = [
        {
            title: 'What is pagination?',
            content: [
                <span key={0}>
                    In React Query, pagination refers to the process of <CodeLabel>fetching</CodeLabel> and{' '}
                    <CodeLabel>displaying</CodeLabel> data in chunks or pages, rather than loading the entire dataset at
                    once. This helps optimize performance by reducing the initial load time and only fetching additional
                    data when needed.
                </span>,
                <span key={1}>
                    The <CodeLabel>useQuery</CodeLabel> hook in <CodeLabel>React Query</CodeLabel> plays a crucial role
                    in implementing pagination.
                </span>,
            ],
        },
        {
            title: 'Initial Query vs Paginated Query',
            content: [
                <span key={0}>
                    When the component mounts or when triggered, the <CodeLabel>useQuery</CodeLabel> hook is used to
                    fetch the initial set of data from the API.
                </span>,
                <CodeBlock key={1} code={initialQuery} />,
                <span key={2}>
                    To implement pagination, React Query allows you to pass additional parameters to the{' '}
                    <CodeLabel>useQuery</CodeLabel> hook, such as <CodeLabel>page</CodeLabel> or{' '}
                    <CodeLabel>pageSize</CodeLabel>. These parameters can be part of the query key or passed as options.
                </span>,
                <CodeBlock key={3} code={paginatedQuery} />,
            ],
        },
        {
            title: 'How to display the data and paginate?',
            content: [
                <span key={0}>
                    To display the data, all you need is the data object returned from the{' '}
                    <CodeLabel>useQuery</CodeLabel> hook. The data object contains the data returned from the API call.
                </span>,
                <span key={1}>
                    To paginate, we need to create some states to handle the current page. The current page is used to
                    determine which page of data to display.
                </span>,
                <span key={2}>
                    To get the next page, a button is used to increment or decrement the pages state to fetch the next
                    or previous page of data by using the <CodeLabel>setPage</CodeLabel> function.
                </span>,
                <CodeBlock key={3} code={codeExample} />,
            ],
        },
        {
            title: 'What does keepPreviousData do?',
            content: [
                <span key={0}>
                    When the page state is incremented or decremented, the useQuery hook will{' '}
                    <CodeLabel>refetch</CodeLabel> the data from the API. This is because the query key has changed.
                </span>,
                <span key={1}>
                    To prevent this, the <CodeLabel>keepPreviousData</CodeLabel> option is used to tell React Query to
                    keep the previous data when the query key changes.
                </span>,
                <CodeBlock key={2} code={keepPreviousData} />,
                <span key={3}>
                    By passing <CodeLabel>keepPreviousData: true</CodeLabel> as a configuration option on the query,
                    whenever the query key changes, the query will continue providing the last query`s data until the
                    data for the new query key is available. Then, React Query will seamlessly transition to the new
                    data.
                </span>,
            ],
        },
    ];

    return (
        <Accordion type='single' collapsible className='w-full text-left mt-5'>
            {information.map((info, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className='text-lg font-semibold text-left'>{info.title}</AccordionTrigger>
                    {info.content.map((content, index) => (
                        <AccordionContent key={index} className='text-base leading-8'>
                            {content}
                        </AccordionContent>
                    ))}
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default PaginationInformation;
