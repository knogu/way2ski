import {DetailedQuery} from "./DetailedQuery";
import {TripCandidateList} from "./TripCandidateList";
import React, { useState, useEffect } from "react";
import { useDetailedQuery } from '../hooks/useDetailedQuery';
import {LineList2TripCandidateListProp} from "../types/Line";
import './OneWay.css';
import {PlaceDateQueryProps} from "./PlaceDateQuery";
import {useClient} from "./use-client";
import {service} from "../gen/way/v1/way-WayService_connectquery";
import {GetLinesRequest, GetLinesResponse} from "../gen/way/v1/way_pb";

const convPlaceDateQueryToGetLinesReq = (query: PlaceDateQueryProps) => {
    const request = new GetLinesRequest();
    request.hometownStation = query.hometownStation;
    request.skiResort = query.skiResort;
    request.isHoliday = query.isHoliday;
    return request;
}

export const OneWay = (placeDateQuery: PlaceDateQueryProps) => {
    const client = useClient(service);
    let temp: GetLinesResponse = new GetLinesResponse();
    let [getLinesResponse, setGetLinesResponse] = useState<GetLinesResponse>(temp);

    const send = async (request: GetLinesRequest) => {
        client.getLines(request).then((resp) => {
            setGetLinesResponse(resp)
        });
    };

    useEffect(() => {
        send(convPlaceDateQueryToGetLinesReq(placeDateQuery))
    }, [placeDateQuery]);

    const [isToSki, setIsToSki] = useState<boolean>(true);

    const handleClickToSki = () => {
        setIsToSki(true);
    };

    const handleClickHome = () => {
        setIsToSki(false);
    };

    let useTripCandidateResToSki = useDetailedQuery(true);
    let useTripCandidateResHome = useDetailedQuery(false);

    let candsToSki = LineList2TripCandidateListProp(getLinesResponse.allLegsToSki, useTripCandidateResToSki.query);
    let candsHome = LineList2TripCandidateListProp(getLinesResponse.allLegsHome, useTripCandidateResHome.query);

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
                            />
                        </div>

                        <div className='results'>
                            <TripCandidateList
                                tripCandidateProps={isToSki ? candsToSki : candsHome}
                            />
                        </div>
                    </div>
                </div>
            </div>
    )
}
