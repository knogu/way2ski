import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { DetailedQueryProps, DetailedQuery, DetailedQueryFields } from "../components/DetailedQuery"
import { genTripCandidateListProps } from "../types/Line"
import { TripCandidateProps } from "../components/TripCandidate"
import { PlaceDateQueryProps } from "../components/PlaceDateQuery"

export type useTripCandidatesRes = {
    query: DetailedQueryFields,
    setQuery: Dispatch<SetStateAction<DetailedQueryFields>>,
    tripCandidateList: TripCandidateProps[],
    setTripCandidateList: Dispatch<SetStateAction<TripCandidateProps[]>>,
}

export const useTripCandidates = (placeDateQuery: PlaceDateQueryProps, isToSki: boolean) => {
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
