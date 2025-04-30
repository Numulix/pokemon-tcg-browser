import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router";
import PokemonCard from "./pokemon-card/PokemonCard";
import { CardObject } from "../types/cardTypes";
import { fetchSetCards } from "../services/pokemonTcgApi";

function SingleSet () {
    const { setId } = useParams<{ setId: string }>();

    const {
        data: setCards,
        isLoading,
        isError,
        error
    } = useQuery<CardObject[], Error>({
        queryKey: ['set', setId],
        queryFn: () => fetchSetCards(setId || ""),
        enabled: !!setId,
        staleTime: 5 * 60 * 1000 // 5 minutes
    })

    return (
        <div className="w-full bg-base-100 bg-opacity-95 rounded-lg shadow-xl p-6">
            <NavLink to="/sets" className="link link-accent hover:underline mb-4 inline-block">&larr; Back to Sets List</NavLink>

            {isLoading && <p className="text-center mt-10">Loading set details...</p>}

            {isError && (
                <p className="text-center text-red-600 bg-red-100 p-3 rounded-lg mt-10">
                    Error loading set: {error instanceof Error ? error.message : "Unknown error"}
                </p>
            )}

            {!isLoading && !isError && setCards && (
                <div>
                    <div className="flex flex-col sm:flex-row items-center mb-6 border-b pb-4">
                        {setCards[0].set.images.logo && (
                            <img
                                src={`${setCards[0].set.images.logo}`}
                                alt={`${setCards[0].set.name} logo`}
                                className="w-20 h-20 object-contain mb-3 sm:mb-0 sm:mr-4"
                                onError={(e) => { e.currentTarget.style.display = 'none' }}
                            />
                        )}
                        <div>
                            <h1 className="text-3xl font-bold text-center sm:text-left">{setCards[0].set.name}</h1>
                            <p className="text-center sm:text-left">Released: {new Date(setCards[0].set.releaseDate).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="mb-6 bg-base-200 border border-base-300 p-4 rounded-lg shadow-inner">
                        <h2 className="text-xl font-semibold mb-2">Set count</h2>
                        <p>Official cards: {setCards[0].set.total}</p>
                    </div>

                    <h2 className="text-2xl font-semibold mb-4">Cards in this set: {setCards[0].set.total}</h2>
                    <div className="grid grid-cols 2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {setCards.map((card: CardObject) => (
                            <PokemonCard key={card.id} card={card}>
                                <PokemonCard.Image />
                                <PokemonCard.Name />
                                <PokemonCard.Number officialNumber={setCards[0].set.total} />
                            </PokemonCard>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SingleSet;