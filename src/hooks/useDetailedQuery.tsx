import { Dispatch, SetStateAction, useState } from "react"
import { DetailedQueryFields } from "../components/DetailedQuery"

export type UseDetailedQueryRes = {
    query: DetailedQueryFields,
    setQuery: Dispatch<SetStateAction<DetailedQueryFields>>,
}

export const useDetailedQuery = (isToSki: boolean) => {
    let initialDepartAfter;
    let initialArriveBefore;
    if (isToSki) {
        initialDepartAfter = new Date(2024, 1, 1, 6, 0, 0);
        initialArriveBefore = new Date(2024, 1, 1, 11, 0, 0);
    } else {
        initialDepartAfter = new Date(2024, 1, 1, 14, 0, 0);
        initialArriveBefore = new Date(2024, 1, 1, 23, 0, 0);
    }
    
    const initialQuery: DetailedQueryFields = {
        departAfter: initialDepartAfter, arriveBefore: initialArriveBefore,
        transitMinutes: 5,
        isTransitMinutesEmpty: false,
    };
    
    const [query, setQuery] = useState(initialQuery);

    return {
        query,
        setQuery,
    };
}