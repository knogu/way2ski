import {Dispatch, SetStateAction, useState} from "react"
import { DetailedQueryFields } from "../components/DetailedQuery"

export type UseDetailedQueryRes = {
    query: DetailedQueryFields,
    setQuery: Dispatch<SetStateAction<DetailedQueryFields>>,
}

export const useDetailedQuery = (isToSki: boolean, transitStations: string[]) => {
    let initialDepartAfter;
    let initialArriveBefore;
    if (isToSki) {
        initialDepartAfter = new Date(2024, 1, 1, 5, 0, 0);
        initialArriveBefore = new Date(2024, 1, 1, 11, 0, 0);
    } else {
        initialDepartAfter = new Date(2024, 1, 1, 14, 0, 0);
        initialArriveBefore = new Date(2024, 1, 1, 23, 0, 0);
    }

    const initialQuery: DetailedQueryFields = {
        departAfter: initialDepartAfter,
        arriveBefore: initialArriveBefore,
    };

    const [query, setQuery] = useState<DetailedQueryFields>(initialQuery);

    const initialStaNameToTransitMinutes:{ [key: string]: number } = {
        "東京": 10,
        "越後湯沢": 5,
    }
    const [staNameToTransitMinutes, setStaNameToTransitMinutes] = useState(initialStaNameToTransitMinutes);

    return {
        query,
        setQuery,
        staNameToTransitMinutes,
        setStaNameToTransitMinutes,
    };
}
