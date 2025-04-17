import { usePokemonCardContext } from "./pokemonCardContext";

function PokemonCardName() {
    const { name } = usePokemonCardContext();
    return (
        <p className="text-sm font-semibold text-center text-gray-700">{name}</p>
    )
}

export default PokemonCardName;