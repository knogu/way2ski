import {DetailedQuery} from "./DetailedQuery";
import {TripCandidateList} from "./TripCandidateList";
import './OneWay.css';
import { PlaceDateQueryProps } from "./PlaceDateQuery";
import { useState } from "react";
import { useTripCandidates, UseTripCandidatesRes } from '../hooks/tripCandidates';

export const OneWay = (placeDateQueryProps: PlaceDateQueryProps) => {
    const [isToSki, setIsToSki] = useState<boolean>(true);

    const handleClickToSki = () => {
        setIsToSki(true);
    };

    const handleClickHome = () => {
        setIsToSki(false);
    };

    let useTripCandidateRes = useTripCandidates(placeDateQueryProps, isToSki);

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
                        <DetailedQuery query={useTripCandidateRes.query} setQuery={useTripCandidateRes.setQuery}/>
                    </div>

                    <div className='results'>
                        <TripCandidateList tripCandidateProps={useTripCandidateRes.tripCandidateList} />
                    </div>
                </div>
            </div>
        </div>
    )
}
