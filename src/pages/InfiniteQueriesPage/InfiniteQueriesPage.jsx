import { Fragment } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteInformation from '@/components/InfiniteInformation';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { Skeleton } from '@/components/ui/skeleton';
import pokeballLogo from '../../assets/pokeball.svg';

const fetchPokemonData = async id => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const json = await res.json();

    return json;
};

const fetchInfinitePokemon = async ({ queryKey, pageParam = 0 }) => {
    const [pokemon] = queryKey;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=15&offset=${pageParam}`;
    const res = await fetch(url);
    const json = await res.json();

    const pokemonSprites = await Promise.all(
        json.results.map(async pokemon => {
            const res = await fetchPokemonData(pokemon.name);
            return res.sprites;
        })
    );

    json.results.forEach((pokemon, index) => {
        pokemon.sprites = pokemonSprites[index];
    });

    return json;
};

const InfiniteQueriesPage = () => {
    const pokemonInfiniteQuery = useInfiniteQuery({
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

    const { data, error, isLoading, isError, fetchNextPage, hasNextPage } = pokemonInfiniteQuery;

    const dataLength = data?.pages.reduce((counter, page) => {
        return counter + page.results.length;
    }, 0);

    if (isLoading) {
        return (
            <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
                <img className='h-[20rem] animate-spin' src={pokeballLogo} alt='pokeball' />
            </div>
        );
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='p-[2rem]'>
            <Navbar />
            <InfiniteInformation />
            <div id='scrollbar-target' className='mt-10 mb-10 overflow-auto h-[59vh]'>
                <InfiniteScroll
                    className='grid grid-cols-3 gap-3'
                    dataLength={dataLength}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={Array.from({ length: 3 }, (_, index) => (
                        <Card className='grid place-items-center' key={index}>
                            <Skeleton className='h-[9rem] w-[100%] flex items-center justify-center'>
                                <img className='h-[6rem] animate-spin' src={pokeballLogo} alt='pokeball' />
                            </Skeleton>
                        </Card>
                    ))}
                    scrollableTarget='scrollbar-target'
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                    style={{ overflow: 'hidden' }}
                >
                    {data.pages.map((page, index) => (
                        <Fragment key={index}>
                            {page.results.map(pokemon => {
                                return (
                                    <Card key={pokemon.name}>
                                        <CardContent className='grid place-items-center place-content-center h-[8rem] p-0 mb-4'>
                                            <img src={pokemon.sprites.front_default} alt='' />
                                            <h1>{pokemon.name}</h1>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </Fragment>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default InfiniteQueriesPage;
