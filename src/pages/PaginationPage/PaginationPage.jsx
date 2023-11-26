import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PaginationInformation from '@/components/PaginationInformation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Navbar from '@/components/Navbar';
import pokeballLogo from '../../assets/pokeball.svg';

const fetchPokemonData = async id => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const json = await res.json();

    return json;
};

const fetchPokemon = async ({ queryKey }) => {
    const [pokemonPage, { page }] = queryKey;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${page}`;
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

// TODO: Add Prefetching for pagination
const PaginationComponent = () => {
    const [page, setPage] = React.useState(0);
    const pokemonQuery = useQuery({
        queryKey: ['pokemonPage', { page }],
        queryFn: fetchPokemon,
        options: { keepPreviousData: true },
    });
    const { data, error, isLoading, isError, isFetching, isPreviousData } = pokemonQuery;

    return (
        <div>
            <Navbar />
            <PaginationInformation />
            <div className='mt-10 mb-10'>
                {isError && <div>{error.message}</div>}
                <div className='grid grid-cols-3 gap-3'>
                    {isLoading &&
                        Array.from({ length: 9 }, (_, index) => (
                            <Card className='grid place-items-center' key={index}>
                                <Skeleton className='h-[8rem] w-[100%] flex items-center justify-center'>
                                    <img className='h-[6rem] animate-spin' src={pokeballLogo} alt='pokeball' />
                                </Skeleton>
                            </Card>
                        ))}
                    {data &&
                        data.results.map(pokemon => (
                            <Card key={pokemon.name}>
                                <CardContent className='grid place-items-center h-[8rem]'>
                                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                                    <h2>{pokemon.name}</h2>
                                </CardContent>
                            </Card>
                        ))}
                </div>
            </div>
            <div className='flex flex-row justify-center items-center'>
                <Button onClick={() => setPage(page => page - 9)} disabled={page === 0}>
                    Previous
                </Button>
                <p className='ml-10 mr-10'>Page {isFetching ? '...' : page / 9}</p>
                <Button
                    onClick={() => setPage(page => page + 9)}
                    disabled={!data || data.length === 0 || isPreviousData}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default PaginationComponent;
