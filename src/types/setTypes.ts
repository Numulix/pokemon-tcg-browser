import { Legalities } from "./cardTypes";

type SetImage = {
    symbol: string;
    logo: string;
}

export type Set = {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: Legalities;
    ptcgoCode: string;
    releaseDate: string;
    updatedAt: string;
    images: SetImage;
}