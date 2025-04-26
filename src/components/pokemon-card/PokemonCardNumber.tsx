import { usePokemonCardContext } from "./pokemonCardContext";

interface PokemonCardNumberProps {
    officialNumber: number;
}

function PokemonCardNumber({ officialNumber }: PokemonCardNumberProps) {
    const { number } = usePokemonCardContext();

    return (
        <p className="text-xs text-center text-gray-500">{number} / {officialNumber}</p>
    )

}

export default PokemonCardNumber;