import { CardObject } from "../../types/cardTypes";
import { PokemonCardContext } from "./pokemonCardContext";
import PokemonCardFavorite from "./PokemonCardFavorite";
import PokemonCardImage from "./PokemonCardImage";
import PokemonCardName from "./PokemonCardName";
import PokemonCardNumber from "./PokemonCardNumber";

interface PokemonCardProps {
    card: CardObject;
    children?: React.ReactNode;
}

function PokemonCard ({ card, children }: PokemonCardProps) {
    return (
        <PokemonCardContext.Provider value={card}>
            <div className="card card-border border-base-300 rounded-lg p-2 hover:scale-125 hover:z-20 transform transition duration-500 flex flex-col items-center bg-base-200">
                {children}
            </div>
        </PokemonCardContext.Provider>
    )
}

PokemonCard.Image = PokemonCardImage;
PokemonCard.Name = PokemonCardName;
PokemonCard.Number = PokemonCardNumber;
PokemonCard.Favorite = PokemonCardFavorite;

export default PokemonCard;