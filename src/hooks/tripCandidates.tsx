import { useEffect, useState } from "react"
import { QueryProps, QueryCmp, Query } from "../components/Query"
import { genTripCandidateListProps } from "../types/Line"

export const useTripCandidates = () => {
    const initialDepartAfter = new Date(2024, 1, 1, 14, 0, 0);
    const initialArriveBefore = new Date(2024, 1, 1, 23, 0, 0);
    const initialQuery: Query = {
        departAfter: initialDepartAfter, arriveBefore: initialArriveBefore,
        transitMinutes: 5,
        isTransitMinutesValid: true,
    };
    
    const [query, setQuery] = useState(initialQuery);

    const initialCands = genTripCandidateListProps(initialQuery)
    const [tripCandidateList, setTripCandidateList] = useState(initialCands);

    useEffect(() => {
        const cands = genTripCandidateListProps(query);
        setTripCandidateList(cands);
    }, [query])

    return { query, setQuery, tripCandidateList, setTripCandidateList }
}