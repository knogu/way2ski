import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { QueryProps, QueryCmp, Query } from "../components/Query"
import { genTripCandidateListProps } from "../types/Line"
import { TripCandidateProps } from "../components/TripCandidate"
import { PlaceDateQuery } from "../components/PlaceDateQuery"

export type useTripCandidatesRes = {
    query: Query,
    setQuery: Dispatch<SetStateAction<Query>>,
    tripCandidateList: TripCandidateProps[],
    setTripCandidateList: Dispatch<SetStateAction<TripCandidateProps[]>>,
}

export const useTripCandidates = (placeDateQuery: PlaceDateQuery, isToSki: boolean) => {
    let initialDepartAfter;
    let initialArriveBefore;
    if (isToSki) {
        initialDepartAfter = new Date(2024, 1, 1, 6, 0, 0);
        initialArriveBefore = new Date(2024, 1, 1, 11, 0, 0);
    } else {
        initialDepartAfter = new Date(2024, 1, 1, 14, 0, 0);
        initialArriveBefore = new Date(2024, 1, 1, 23, 0, 0);
    }
    
    const initialQuery: Query = {
        departAfter: initialDepartAfter, arriveBefore: initialArriveBefore,
        transitMinutes: 5,
        isTransitMinutesEmpty: false,
    };
    
    const [query, setQuery] = useState(initialQuery);

    const initialCands = genTripCandidateListProps(placeDateQuery, isToSki, initialQuery)
    const [tripCandidateList, setTripCandidateList] = useState(initialCands);

    useEffect(() => {
        const query = initialQuery;
        setQuery(query);
        const cands = genTripCandidateListProps(placeDateQuery, isToSki, query);
        setTripCandidateList(cands);
    }, [isToSki])

    useEffect(() => {
        const cands = genTripCandidateListProps(placeDateQuery ,isToSki, query);
        setTripCandidateList(cands);
    }, [query, placeDateQuery]) // placeDateQuery指定せずに再計算、再描画できないか？

    const ret: useTripCandidatesRes = { 
        query: query,
        setQuery: setQuery,
        tripCandidateList: tripCandidateList,
        setTripCandidateList: setTripCandidateList,
    }

    return ret;
}