const API_BASE_URL = 'https://api.tcgdex.net/v2/en';

export type SearchCard = {
    id: string;
    localId: string;
    name: string;
    image?: string;
}

export type Set = {
    id: string;
    name: string;
    logo?: string;
    symbol?: string;
    cardCount: {
        total: number;
        official: number;
    }
}

type CardCount = {
    firstEd: number;
    holo: number;
    normal: number;
    official: number;
    reverse: number;
    total: number;
}

export type SingleSetData = {
    id: string;
    logo?: string;
    name: string;
    releaseDate: string;
    symbol?: string;
    cardCount: CardCount;
    cards: SearchCard[]
}

export const fetchCards = async (searchTerm: string): Promise<SearchCard[]> => {
    if (!searchTerm.trim()) return [];

    const searchParams = new URLSearchParams({ name: searchTerm });
    const url = `${API_BASE_URL}/cards?${searchParams.toString()}`

    console.log("Fetching cards from URL: ", url);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }
    
    const cards: SearchCard[] = await response.json();

    return cards;
}

export const fetchSets = async (): Promise<Set[]> => {
    const url = `${API_BASE_URL}/sets`;

    const response = await fetch(url);

    const sets: Set[] = await response.json();

    return sets;
}

export const fetchSingleSet = async (setId: string): Promise<SingleSetData> => {
    const url = `${API_BASE_URL}/sets/${setId}`;
    const response = await fetch(url);
    const singleSet: SingleSetData = await response.json();
    return singleSet;
}