import { useState } from "react";
import { Leg, LegProps, displayTime } from "./Leg"
import './TripCandidate.css';

export type TripCandidateProps = {
    legProps: LegProps[],
}

export const TripCandidate = (props: TripCandidateProps) => {
    const legCnt = props.legProps.length;
    const totalDepartureTime = displayTime(props.legProps.at(0)!.departureTime);
    const totalArrivalTime = displayTime(props.legProps.at(legCnt-1)!.arrivalTime);
    let [isDetailDisplayed, setIsDetailDisplayed] = useState(false);

    const handleDetailClick = () => {
        setIsDetailDisplayed(!isDetailDisplayed);
    }
    return (
        <div className="trip-candidate block">
            <button className="summary" onClick={handleDetailClick}>
                <p>{totalDepartureTime}発 → {totalArrivalTime}着 <button className={isDetailDisplayed ? "active" : "inactive"}></button></p>
            </button>

            {props.legProps.map((legProp, i) => {
                const legProps = {
                    departureTime: legProp.departureTime,
                    departureStation: legProp.departureStation,
                    arrivalTime: legProp.arrivalTime,
                    arrivalStation: legProp.arrivalStation,
                    lineName: legProp.lineName,
                    key: i,
                    display: isDetailDisplayed,
                }
                return Leg(legProps);
            })}
        </div>
    )
}
