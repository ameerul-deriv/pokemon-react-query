import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Fragment } from 'react';
import CodeBlock from './CodeBlock';
import CodeLabel from './CodeLabel';

const codeExample = `const fetchDataFunction = async ({ queryKey, pageParam = 0 }) => {
    const [myQueryKey] = queryKey;
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=15&offset=💲{pageParam}';
    const res = await fetch(url);
    return res.json();
};`;

const exampleCode2 = `const { data, isLoading, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    queryKey: 'myQueryKey', 
    queryFn: fetchData,
});

return (
    <div>
        {isLoading ? <div>Loading...</div> : null}
        {data.pages.map(page => (
            <div key={page.next}>
                {page.results.map(pokemon => (
                    <div key={pokemon.name}>
                        <div>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            <h1>{pokemon.name}</h1>
                        </div>
                    </div>
                ))}
            </div>
        ))}
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetching}>
            {isFetching ? 'Loading...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
        </button>
    </div>
);`;

const exampleCode3 = `const { data, isLoading, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    queryKey: 'myQueryKey', 
    queryFn: fetchData,
    getNextPageParam: lastPage => lastPage.next ?? undefined,
});`;

const exampleCode4 = `const pokemonInfiniteQuery = useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: fetchInfinitePokemon,
    getNextPageParam: lastPage => {
        if (lastPage.next) {
            const urlParams = new URLSearchParams(new URL(lastPage.next).search);
            const offset = parseInt(urlParams.get('offset'));
            return offset;
        }
        return undefined;
    },
});
`;

const exampleInfiniteQuery = `const { data, isLoading } = useInfiniteQuery(
    queryKey: 'myQueryKey', 
    queryFn: fetchDataFunction,
);
`;

const exampleData = {
    count: 1292,
    next: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=3',
    previous: null,
    results: [
        {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
        {
            name: 'ivysaur',
            url: 'https://pokeapi.co/api/v2/pokemon/2/',
        },
        {
            name: 'venusaur',
            url: 'https://pokeapi.co/api/v2/pokemon/3/',
        },
    ],
};

const exampleData2 = {
    pages: [
        {
            count: 1292,
            next: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=3',
            previous: null,
            results: [
                {
                    name: 'bulbasaur',
                    url: 'https://pokeapi.co/api/v2/pokemon/1/',
                },
                {
                    name: 'ivysaur',
                    url: 'https://pokeapi.co/api/v2/pokemon/2/',
                },
                {
                    name: 'venusaur',
                    url: 'https://pokeapi.co/api/v2/pokemon/3/',
                },
            ],
        },
        {
            count: 1292,
            next: 'https://pokeapi.co/api/v2/pokemon?offset=3&limit=3',
            previous: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=3',
            results: [
                {
                    name: 'charmander',
                    url: 'https://pokeapi.co/api/v2/pokemon/4/',
                },
                {
                    name: 'charmeleon',
                    url: 'https://pokeapi.co/api/v2/pokemon/5/',
                },
                {
                    name: 'charizard',
                    url: 'https://pokeapi.co/api/v2/pokemon/6/',
                },
            ],
        },
    ],
    pageParams: [undefined, 3],
};

const InfiniteInformation = () => {
    const information = [
        {
            title: 'What are infinite queries?',
            content: [
                <span key={0}>
                    In <CodeLabel>React Query</CodeLabel>, infinite queries refer to a pattern where data is fetched in
                    chunks or pages dynamically as the user scrolls or as needed, creating a continuous or{' '}
                    <CodeLabel>“infinite“</CodeLabel> stream of data. This approach is particularly useful for scenarios
                    where the entire dataset is large, and loading all the data at once would be impractical or slow.
                </span>,
                <CodeBlock key={1} code={exampleInfiniteQuery} />,
                <span key={2}>
                    <CodeLabel>useInfiniteQuery</CodeLabel> is similar to <CodeLabel>useQuery</CodeLabel> in that both
                    take a query key and query function, and both return <CodeLabel>data</CodeLabel>,{' '}
                    <CodeLabel>isLoading</CodeLabel>, <CodeLabel>isError</CodeLabel>, and{' '}
                    <CodeLabel>isFetching</CodeLabel> states. However, there are some important differences.
                </span>,
                <span key={3}>
                    First, <CodeLabel>useInfiniteQuery`s</CodeLabel> query function receives an extra value in its
                    argument called <CodeLabel>pageParam</CodeLabel>. Like the <CodeLabel>queryKey</CodeLabel> value, we
                    can use <CodeLabel>pageParam</CodeLabel> to make the appropriate request to get that page. For
                    example, if we are using the <CodeLabel>pageParam</CodeLabel> value to make a request to an API, we
                    can use it to set the offset or page number.
                </span>,
                <CodeBlock key={4} code={codeExample} />,
            ],
        },
        {
            title: 'How does it work?',
            content: [
                <span key={0}>
                    Similar to <CodeLabel>useQuery</CodeLabel>, <CodeLabel>useInfiniteQuery</CodeLabel> fetches an
                    initial set of data. However, it retrieves only the first chunk or page of data, not the entire
                    dataset.
                </span>,
                <span key={1}>
                    In addition to the initial data, <CodeLabel>useInfiniteQuery</CodeLabel> provides several useful
                    properties and functions. For instance, <CodeLabel>fetchNextPage</CodeLabel> can be used to fetch
                    the next page of data, either manually or automatically when the user scrolls to the bottom of the
                    page.
                </span>,
                <span key={2}>
                    Another useful property is <CodeLabel>hasNextPage</CodeLabel>, which indicates whether there is more
                    data to fetch.
                </span>,
                <span key={3}>
                    Lastly, the <CodeLabel>isFetching</CodeLabel> property can be used to determine if a fetch operation
                    is currently in progress.
                </span>,
                <CodeBlock
                    key={4}
                    code={`const { data, isLoading, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery('myQueryKey', fetchDataFunction);`}
                />,
                <span key={5}>
                    The data returned by the <CodeLabel>useInfiniteQuery</CodeLabel> hook is an object with a pages
                    property that contains an array of pages. Each page contains an array of results.
                </span>,
                <CodeBlock key={6} code={exampleCode2} />,
            ],
        },
        {
            title: 'getNextPageParam',
            content: [
                <span key={0}>
                    Previously, we used <CodeLabel>fetchNextPage</CodeLabel> to fetch the next page of data. However, we
                    can also use <CodeLabel>getNextPageParam</CodeLabel> to fetch the next page of data. The{' '}
                    <CodeLabel>getNextPageParam</CodeLabel> function receives the last page of data as an argument and
                    returns the next page of data. If there is no next page, it returns undefined.
                </span>,
                <span key={1}>
                    <CodeLabel>React Query</CodeLabel>, under the hood, calls <CodeLabel>getNextPageParam</CodeLabel> to
                    determine the parameter for the next page automatically. This parameter is used in subsequent calls
                    to <CodeLabel>fetchPageFunction</CodeLabel> to fetch the next page of data.
                </span>,
                <CodeBlock key={2} code={exampleCode3} />,
                <span key={3}>
                    <CodeLabel>getNextPageParam</CodeLabel> is a callback function that you provide to{' '}
                    <CodeLabel>useInfiniteQuery</CodeLabel>. It takes the last page`s data as a parameter and returns
                    the parameter needed to fetch the next page.
                </span>,
                <span key={4}>
                    In the context of a paginated API, <CodeLabel>getNextPageParam</CodeLabel> might extract and return
                    information from the last item in the current page to construct the parameter for the next page,
                    such as an ID or an offset.
                </span>,
                <span key={5}>
                    By providing a well-defined <CodeLabel>getNextPageParam</CodeLabel> function, you allow React Query
                    to efficiently <CodeLabel>manage</CodeLabel> and <CodeLabel>automate</CodeLabel> the process of
                    paginating through your data, simplifying the implementation of infinite scroll or paginated UIs.
                </span>,
                <span key={6}>
                    You can use <CodeLabel>fetchNextPage</CodeLabel> without explicity defining{' '}
                    <CodeLabel>getNextPageParam</CodeLabel>, but the behavior may differ depending on your API response
                    structure.
                </span>,
                <span key={7}>
                    Doing so assumes that your API response structure aligns with React Query`s expectations for
                    automatic pagination. If your API response structure <CodeLabel>deviates</CodeLabel>, providing a
                    custom <CodeLabel>getNextPageParam</CodeLabel> function is recommended for more{' '}
                    <CodeLabel>control</CodeLabel> and <CodeLabel>flexibility</CodeLabel>.
                </span>,
                <span key={8}>
                    Below is an example of how I used <CodeLabel>getNextPageParam</CodeLabel> to extract the{' '}
                    <CodeLabel>offset</CodeLabel> from the next page URL.
                </span>,
                <CodeBlock key={9} code={exampleCode4} />,
                <span key={10}>
                    Why I did this is because the API response structure did not align with React Query`s expectations
                    for automatic pagination. The API response structure is shown below.
                </span>,
            ],
        },
        {
            title: 'Data received from useQuery vs useInfiniteQuery',
            content: [
                <span key={0}>
                    The data returned by the <CodeLabel>useQuery</CodeLabel> hook is an object with a pages property
                    that contains an array of pages. Each page contains an array of results.
                </span>,
                <CodeBlock key={1} code={JSON.stringify(exampleData, null, 2)} />,
                <span key={2}>
                    The data returned by the <CodeLabel>useInfiniteQuery</CodeLabel> hook is an object with a pages
                    property that contains an array of pages. Each page contains an array of results.
                </span>,
                <CodeBlock key={3} code={JSON.stringify(exampleData2, null, 2)} />,
            ],
        },
        {
            title: 'How does it update the cached data?',
            content: [
                <span key={0}>
                    In React Query, when using <CodeLabel>useInfiniteQuery</CodeLabel>, the library automatically
                    handles updates to the cached data when you fetch new pages. If there are changes to the data in
                    subsequent pages, React Query ensures that the cached data is updated accordingly.
                </span>,
                <span key={1}>Here`s how React Query manages this:</span>,
                <Fragment key={2}>
                    <strong>1. Caching Mechanism:</strong>
                    <br />
                    React Query maintains a cache of the data fetched through queries. This cache is{' '}
                    <CodeLabel>updated</CodeLabel> and <CodeLabel>managed</CodeLabel> by React Query itself.
                </Fragment>,
                <Fragment key={2}>
                    <strong>2. Fetching New Pages:</strong>
                    <br />
                    When you call <CodeLabel>fetchNextPage</CodeLabel> to fetch additional pages, React Query sends a
                    request to the server to get the new data.
                </Fragment>,
                <Fragment key={3}>
                    <strong>3. Merging Data:</strong>
                    <br />
                    The new data is <CodeLabel>merged</CodeLabel> with the existing data in the cache. React Query
                    intelligently updates the cache by <CodeLabel>appending</CodeLabel> the new data to the existing
                    pages.
                </Fragment>,
                <Fragment key={4}>
                    <strong>4. Re-rendering Components:</strong>
                    <br />
                    After the cache is updated, React Query triggers a <CodeLabel>re-render</CodeLabel> of the
                    components using the data. This allows your UI to reflect the changes in the data.
                </Fragment>,
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

export default InfiniteInformation;
