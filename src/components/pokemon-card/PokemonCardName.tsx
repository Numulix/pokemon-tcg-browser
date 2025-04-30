import { usePokemonCardContext } from "./pokemonCardContext";

function PokemonCardName() {
    const { name } = usePokemonCardContext();
    return (
        <p className="text-md font-semibold text-center">{name}</p>
    )
}

export default PokemonCardName;