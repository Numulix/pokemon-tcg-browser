import { usePokemonCardContext } from "./pokemonCardContext";

interface PokemonCardNumberProps {
    officialNumber: number;
}

function PokemonCardNumber({ officialNumber }: PokemonCardNumberProps) {
    const { localId } = usePokemonCardContext();

    return (
        <p className="text-xs text-center text-gray-500">{localId} / {officialNumber}</p>
    )

}

export default PokemonCardNumber;