import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import PokemonCard from './pokemon-card/PokemonCard';
import { useInfiniteCardSearch } from '../hooks/useInfiniteCardSearch';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState<string>("");
  const observer = useRef<IntersectionObserver | null>(null);

  const {
    data: results,
    isLoading,
    isError,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteCardSearch(submittedSearchTerm);

  useEffect(() => {
    const currentObserver = observer.current;

    // Prevent lingering observers
    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, []);

  const handleSearchSubmit = () => {
    const trimmedSearchTerm = searchTerm.trim();
    setSubmittedSearchTerm(trimmedSearchTerm); // Update submitted term, triggers query if enabled
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  }

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
  
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
  
      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isLoading]
  )


  const showNoResults = !isLoading && !isError && submittedSearchTerm && results?.pages.length === 0;

  return (
    <>
        <div className="bg-base-100 bg-opacity-95 rounded-lg shadow-xl p-6 mt-10">
          <h1 className='text-3xl font-bold mb-6 text-center'>Pokemon TCG Search</h1>

          <div className='flex flex-col sm:flex-row gap-2 mb-6'>
            <input 
              type="text" 
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder='Enter card name (e.g. Pikachu, Charizard....)'
              className='flex-grow px-4 py-2 border border-gray-300 rounded-lg input'
              disabled={isLoading || isFetching}
            />
            <button
              onClick={handleSearchSubmit}
              className={`px-6 py-2 rounded-lg font-semibold focus:outline-none focus:ring-2 btn btn-primary ${(isLoading || isFetching) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={isLoading || isFetching}
            >
              {isLoading || isFetching ? 'Searching...' : 'Search'}
            </button>
          </div>

          <div className='mt-6 min-h-[200px]'>
            {isLoading && (
              <div className='flex flex-row justify-center items-center'>
                 <span className='loading loading-spinner loading-lg'></span>
              </div>
            )}

            {isError && (
              <p className='text-center text-red-600 bg-red-100 p-3 rounded-lg'>
                Error: {error instanceof Error ? error.message : 'Failed to fetch data'}
              </p>
            )}

            {!isLoading && !isError && results && results.pages.length > 0 && (
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {results.pages.map((group, i) => (
                  <Fragment key={i}>
                    {group.map((card) => (
                      <PokemonCard key={card.id} card={card}>
                        <div ref={lastElementRef}></div>
                        <PokemonCard.Favorite />
                        <PokemonCard.Image />
                        <PokemonCard.Name />
                      </PokemonCard>
                    ))}
                  </Fragment>
                ))}
              </div>
            )}

            {isFetching && !isLoading && (
              <div className='flex flex-row justify-center items-center mt-4'>
                <p>Loading more cards <span className='loading loading-infinity loading-lg'></span></p>
              </div>
            )}

            {showNoResults && (
             <p className="text-center text-gray-500">No results found for "{submittedSearchTerm}".</p>
            )}

            {!isLoading && !isError && !submittedSearchTerm && (
             <p className="text-center text-gray-500">Enter a card name to start searching.</p>
            )} 
          </div>
        </div>
    </>
  )
}

export default App
