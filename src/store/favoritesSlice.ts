import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface FavoritesState {
    ids: string[];
}

const initialState: FavoritesState = {
    ids: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<string>) => {
            const idToAdd = action.payload;
            if (!state.ids.includes(idToAdd)) {
                state.ids.push(idToAdd);
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            const idToRemove = action.payload;
            state.ids = state.ids.filter((id) => id !== idToRemove);
        },
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const idToToggle = action.payload;
            const index = state.ids.indexOf(idToToggle);
            if (index === -1) {
                state.ids.push(idToToggle);
            }
            else {
                state.ids.splice(index, 1);
            }
        },
        clearFavorites: (state) => {
            state.ids = [];
        }
    }
})

export const selectFavorites = (state: RootState): string[] => state.favorites.ids;
export const selectIsFavorite = (cardId: string) => (state: RootState): boolean => {
    return state.favorites.ids.includes(cardId);
}

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;