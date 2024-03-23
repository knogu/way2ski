import {DetailedQuery} from "./DetailedQuery";
import {TripCandidateList} from "./TripCandidateList";
import React, { useState, useEffect } from "react";
import { useDetailedQuery } from '../hooks/useDetailedQuery';
import {LineList2TripCandidateListProp} from "../types/Line";
import './OneWay.css';
import {PlaceDateQueryProps} from "./PlaceDateQuery";
import {useClient} from "./use-client";
import {WayService} from "../gen/way/v1/way-WayService_connectquery";
import {GetLinesRequest, GetLinesResponse, Leg} from "../gen/way/v1/way_pb";

const convPlaceDateQueryToGetLinesReq = (query: PlaceDateQueryProps) => {
    const request = new GetLinesRequest();
    request.hometownStation = query.hometownStation;
    request.skiResort = query.skiResort;
    request.isHoliday = query.isHoliday;
    return request;
}

const extractTransiteStations = (legs: Leg[]) => {
    const ret: string[] = [];
    for (let i = 0; i < legs.length - 1; i++) {
        ret.push(legs[i].arrivalStation)
    }
    return ret
}

export const OneWay = (placeDateQuery: PlaceDateQueryProps) => {
    const client = useClient(WayService);
    let temp: GetLinesResponse = new GetLinesResponse();
    let [getLinesResponse, setGetLinesResponse] = useState<GetLinesResponse>(temp);

    const send = async (request: GetLinesRequest) => {
        client.getLines(request).then((resp) => {
            setGetLinesResponse(resp)
        });
    };

    useEffect(() => {
        if (placeDateQuery.isHometownStationValid) {
            send(convPlaceDateQueryToGetLinesReq(placeDateQuery))
        }
    }, [placeDateQuery]);

    const [isToSki, setIsToSki] = useState<boolean>(true);

    const handleClickToSki = () => {
        setIsToSki(true);
    };

    const handleClickHome = () => {
        setIsToSki(false);
    };

    let useTripCandidateResToSki = useDetailedQuery(true, extractTransiteStations(getLinesResponse.allLegsToSki));
    let useTripCandidateResHome = useDetailedQuery(false, extractTransiteStations(getLinesResponse.allLegsHome));
    let candsToSki = LineList2TripCandidateListProp(
                                            getLinesResponse.allLegsToSki,
                                            useTripCandidateResToSki.query,
                                            useTripCandidateResToSki.staNameToTransitMinutes);
    let candsHome = LineList2TripCandidateListProp(
                                            getLinesResponse.allLegsHome,
                                            useTripCandidateResHome.query,
                                            useTripCandidateResHome.staNameToTransitMinutes);

    function legs2transitStations(legs: Leg[]): string[] {
        let res = []
        for (let i = 0; i < legs.length - 1; i++) {
            res.push(legs[i].arrivalStation)
        }
        return res
    }

    return (

            <div className='way'>
                <div className='container'>
                    <div className='tab-container'>
                        <button className={isToSki ? "active" : "inactive"} onClick={handleClickToSki}>行き</button>
                        <button className={isToSki ? "inactive" : "active"} onClick={handleClickHome}>帰り</button>
                    </div>
                </div>

                <div className='way-body'>
                    <div className='container'>
                        <div className="detailed-query block">
                            <DetailedQuery
                                query={isToSki ? useTripCandidateResToSki.query : useTripCandidateResHome.query}
                                setQuery={isToSki ? useTripCandidateResToSki.setQuery : useTripCandidateResHome.setQuery}
                                transitStations={isToSki ? legs2transitStations(getLinesResponse.allLegsToSki) : legs2transitStations(getLinesResponse.allLegsHome)}
                                staNameToTransTime={isToSki ? useTripCandidateResToSki.staNameToTransitMinutes : useTripCandidateResHome.staNameToTransitMinutes}
                                setStaNameToTransTime={isToSki ? useTripCandidateResToSki.setStaNameToTransitMinutes : useTripCandidateResHome.setStaNameToTransitMinutes}
                            />
                        </div>

                        <div className='results'>
                            {
                                placeDateQuery.isHometownStationValid ?
                                <TripCandidateList tripCandidateProps={isToSki ? candsToSki : candsHome}/>:
                                <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
}
