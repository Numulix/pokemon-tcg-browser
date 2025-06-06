import { CardObject } from "../types/cardTypes";
import { Set } from "../types/setTypes";

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

export const fetchSets = async (): Promise<Set[]> => {
    const url = `${BASE_URL}/sets`;
    const response = await fetch(url, { headers: headersConfig });

    console.log("POKEMON TCG API: Fetching sets ", url);

    const result = await response.json();

    return result.data as Set[];
}

export const fetchSetCards = async (setId: string): Promise<CardObject[]> => {
    const keywordMatch = `set.id:${setId}`;
    const searchParams = new URLSearchParams({ q: keywordMatch });

    const url = `${BASE_URL}/cards?${searchParams.toString()}`;

    const response = await fetch(url, { headers: headersConfig });

    console.log("POKEMON TCG API: Fetching set cards ", url);

    const result = await response.json();

    return result.data as CardObject[];
}