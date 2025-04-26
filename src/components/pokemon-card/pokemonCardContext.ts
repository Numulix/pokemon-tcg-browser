import { createContext, useContext } from "react";
import { CardObject } from "../../types/cardTypes";

export const PokemonCardContext = createContext<CardObject | undefined>(undefined);

export function usePokemonCardContext() {
    const card = useContext(PokemonCardContext);
    if (!card) {
        throw new Error("usePokemonCardContext must be used within a PokemonCardProvider");
    }
    return card;
}

