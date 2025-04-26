type Ability = {
    name: string;
    text: string;
    type: string;
}

type Attack = {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
}

type Weakness = {
    type: string;
    value: string;
}

type Legalities = {
    unlimited: string;
    standard: string;
    expanded: string;
}

type CardImage = {
    small: string;
    large: string;
}

export type CardObject = {
    id: string;
    name: string;
    supertype: string;
    subtypes: string[];
    hp: string;
    evolvesFrom: string;
    abilities: Ability[];
    attacks: Attack[];
    weaknesses: Weakness[];
    retreatCost: string[];
    number: string;
    artist: string;
    rarity: string;
    flavorText: string;
    nationalPokedexNumbers: number[];
    legalities: Legalities;
    images: CardImage;
}