import { SearchCard } from "../../services/tcgdex";
import { PokemonCardContext } from "./pokemonCardContext";
import PokemonCardImage from "./PokemonCardImage";
import PokemonCardName from "./PokemonCardName";
import PokemonCardNumber from "./PokemonCardNumber";

interface PokemonCardProps {
    card: SearchCard;
    children?: React.ReactNode;
}

function PokemonCard ({ card, children }: PokemonCardProps) {
    return (
        <PokemonCardContext.Provider value={card}>
            <div className="border rounded-lg p-2 shadow hover:shadow-md transition-shadow duration-200 flex flex-col items-center bg-gray-50">
                {children}
            </div>
        </PokemonCardContext.Provider>
    )
}

PokemonCard.Image = PokemonCardImage;
PokemonCard.Name = PokemonCardName;
PokemonCard.Number = PokemonCardNumber;

export default PokemonCard;