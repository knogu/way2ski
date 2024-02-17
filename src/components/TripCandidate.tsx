import { Leg, LegProps, displayTime } from "./Leg"

export type TripCandidateProps = {
    legProps: LegProps[],
}

export const TripCandidate = (props: TripCandidateProps) => {
    const legCnt = props.legProps.length;
    const totalDepartureTime = displayTime(props.legProps.at(0)!.departureTime);
    const totalArrivalTime = displayTime(props.legProps.at(legCnt-1)!.arrivalTime);
    return (
        <div className="trip-candidate">
            <div className="summary">
                <p>{totalDepartureTime}発 → {totalArrivalTime}着</p>
            </div>

            {props.legProps.map((legProp, i) => {
                return <Leg departureTime={legProp.departureTime} departureStation={legProp.departureStation} arrivalTime={legProp.arrivalTime} arrivalStation={legProp.arrivalStation} lineName={legProp.lineName} key={i} />
            })}
        </div>
    )
}