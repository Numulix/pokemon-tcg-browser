import { createContext, useContext } from "react";
import { SearchCard } from "../../services/tcgdex";

export const PokemonCardContext = createContext<SearchCard | undefined>(undefined);

export function usePokemonCardContext() {
    const card = useContext(PokemonCardContext);
    if (!card) {
        throw new Error("usePokemonCardContext must be used within a PokemonCardProvider");
    }
    return card;
}

