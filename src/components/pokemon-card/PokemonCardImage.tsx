import { usePokemonCardContext } from "./pokemonCardContext";

const imagePlaceholderUrl = 'https://placehold.co/240x330/eee/ccc?text=No+Image';

function PokemonCardImage () {

    const { image, name } = usePokemonCardContext();

    return (
        <img 
            src={image ? `${image}/low.webp` : imagePlaceholderUrl}
            className="w-full h-auto rounded mb-2 object-contain"
            alt={`${name} card image`}
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.src = imagePlaceholderUrl;
                }
            }
            loading="lazy"
        />
    )
}

export default PokemonCardImage;