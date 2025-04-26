import { CardObject } from "../types/cardTypes";

const BASE_URL = "https://api.pokemontcg.io/v2"
const ITEMS_PER_PAGE = 15;
const API_KEY = import.meta.env.VITE_POKEMON_TCG_API_KEY;

const headersConfig = {
    'X-Api-Key': API_KEY
}

export const fetchCards = async (searchTerm: string, page: number = 1): Promise<CardObject[]> => {
    if (!searchTerm.trim()) return [];

    const keywordMatch = `name:${searchTerm}*`
    const searchParams = new URLSearchParams({ q: keywordMatch, page: String(page), pageSize: String(ITEMS_PER_PAGE) });
    const url = `${BASE_URL}/cards?${searchParams.toString()}`;

    console.log("POKEMON TCG API: Fetching url: ", url);

    const response = await fetch(url, { headers: headersConfig });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    return result.data as CardObject[];
}