import { usePokemonCardContext } from "./pokemonCardContext";

interface PokemonCardNumberProps {
    officialNumber: number;
}

function PokemonCardNumber({ officialNumber }: PokemonCardNumberProps) {
    const { number } = usePokemonCardContext();

    return (
        <p className="text-xs text-center">{number} / {officialNumber}</p>
    )

}

export default PokemonCardNumber;