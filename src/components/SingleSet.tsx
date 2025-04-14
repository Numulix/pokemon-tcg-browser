import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router";
import { fetchSingleSet, SearchCard, SingleSetData } from "../services/tcgdex";

function SingleSet () {
    const { setId } = useParams<{ setId: string }>();

    const {
        data: setDetails,
        isLoading,
        isError,
        error
    } = useQuery<SingleSetData, Error>({
        queryKey: ['set', setId],
        queryFn: () => fetchSingleSet(setId || ""),
        enabled: !!setId,
        staleTime: 5 * 60 * 1000 // 5 minutes
    })

    return (
        <div className="w-full bg-white bg-opacity-95 rounded-lg shadow-xl p-6">
            <NavLink to="/sets" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Sets List</NavLink>

            {isLoading && <p className="text-center text-gray-600 mt-10">Loading set details...</p>}

            {isError && (
                <p className="text-center text-red-600 bg-red-100 p-3 rounded-lg mt-10">
                    Error loading set: {error instanceof Error ? error.message : "Unknown error"}
                </p>
            )}

            {!isLoading && !isError && setDetails && (
                <div>
                    <div className="flex flex-col sm:flex-row items-center mb-6 border-b pb-4">
                        {setDetails.logo && (
                            <img
                                src={`${setDetails.logo}.png`}
                                alt={`${setDetails.name} logo`}
                                className="w-20 h-20 object-contain mb-3 sm:mb-0 sm:mr-4"
                                onError={(e) => { e.currentTarget.style.display = 'none' }}
                            />
                        )}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-left">{setDetails.name}</h1>
                            <p className="text-gray-600 text-center sm:text-left">Released: {new Date(setDetails.releaseDate).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-inner">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Set statistics</h2>
                        <p>Official cards: {setDetails.cardCount.official}</p>
                        <p>Total cards: {setDetails.cardCount.total}</p>
                        <p>Holo rares: {setDetails.cardCount.holo}</p>
                        <p>Reverse holos: {setDetails.cardCount.reverse}</p>
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Cards in this set: {setDetails.cardCount.total}</h2>
                    <div className="grid grid-cols 2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {setDetails.cards.map((card: SearchCard) => (
                            <div key={card.id} className="border rounded-lg p-2 shadow hover:shadow-md transition-shadow flex flex-col items-center bg-gray-50">
                                <img 
                                    src={card.image ? `${card.image}/low.webp` : 'https://placehold.co/240x330/eee/ccc?text=No+Image'}
                                    alt={card.name}
                                    className="w-full h-auto rounded mb-2 object-contain"
                                    onError={(e) => {
                                        const target = e.target as HTMLInputElement;
                                        target.onerror = null;
                                        target.src = 'https://placehold.co/240x330/eee/ccc?text=No+Image';
                                    }}
                                    loading="lazy"
                                />
                                <p className="text-xs font-semibold text-center text-gray-700 mt-1">{card.name}</p>
                                <p className="text-xs text-center text-gray-500">{card.localId} / {setDetails.cardCount.official}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SingleSet;