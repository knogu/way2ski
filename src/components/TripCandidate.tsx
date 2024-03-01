import { useState } from "react";
import { Leg, LegProps, displayTime } from "./Leg"
import './TripCandidate.css';

export type TripCandidateProps = {
    legProps: LegProps[],
}

export const TripCandidate = (props: TripCandidateProps) => {
    const legCnt = props.legProps.length;
    const totalDepartureTime = props.legProps.at(0)!.departureTime;
    const totalArrivalTime = props.legProps.at(legCnt-1)!.arrivalTime;
    const diff = totalArrivalTime.getTime() - totalDepartureTime.getTime();
    const diff_h = Math.floor(diff / (1000 * 60 * 60));
    const diff_m =Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let [isDetailDisplayed, setIsDetailDisplayed] = useState(false);

    const handleDetailClick = () => {
        setIsDetailDisplayed(!isDetailDisplayed);
    }
    return (
        <div className="trip-candidate block">
            <button className="summary" onClick={handleDetailClick}>
                <p>{displayTime(totalDepartureTime)}発 → {displayTime(totalArrivalTime)}着 （{diff_h}時間{diff_m}分）<button className={isDetailDisplayed ? "active" : "inactive"}></button></p>
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
