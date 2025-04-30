import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { MouseEvent } from "react";
import { usePokemonCardContext } from "./pokemonCardContext";
import { selectIsFavorite, toggleFavorite } from "../../store/favoritesSlice";

function PokemonCardFavorite() {
    const { id } = usePokemonCardContext();
    const dispatch = useDispatch<AppDispatch>();
    const isFavorite = useSelector(selectIsFavorite(id));

    const handleToggleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleFavorite(id));
    }

    return (
            <button
                onClick={handleToggleFavorite}
                className={`p-1 mb-2 rounded-full border transition-colors duration-200 z-10 ${
                    isFavorite
                        ? 'text-yellow-400 hover:text-yellow-500' // Style for favorited
                        : 'text-gray-300 hover:text-yellow-400' // Style for not favorited
                } bg-opacity-50 hover:bg-opacity-75`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006Z" clipRule="evenodd" />
                </svg>
            </button>
    )
}

export default PokemonCardFavorite;