import {DetailedQuery} from "./DetailedQuery";
import {TripCandidateList} from "./TripCandidateList";
import './OneWay.css';
import { PlaceDateQueryProps } from "./PlaceDateQuery";
import { useState } from "react";
import { useOneWayTripCandidates, UseTripCandidatesRes } from '../hooks/tripCandidates';

export const OneWay = (placeDateQueryProps: PlaceDateQueryProps) => {
    const [isToSki, setIsToSki] = useState<boolean>(true);

    const handleClickToSki = () => {
        setIsToSki(true);
    };

    const handleClickHome = () => {
        setIsToSki(false);
    };

    let useTripCandidateResToSki = useOneWayTripCandidates(placeDateQueryProps, true);
    let useTripCandidateResHome = useOneWayTripCandidates(placeDateQueryProps, false);

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
                            tripCandidateProps={isToSki ? useTripCandidateResToSki.tripCandidateList : useTripCandidateResHome.tripCandidateList}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
