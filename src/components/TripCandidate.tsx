import { Leg, LegProps } from "./Leg"

export type TripCandidateProps = {
    legProps: LegProps[],
}

export const TripCandidate = (props: TripCandidateProps) => {
    return (
        <>
            <p>======</p>
            {props.legProps.map((legProp, i) => {
                return <Leg departureTime={legProp.departureTime} departureStation={legProp.departureStation} arrivalTime={legProp.arrivalTime} arrivalStation={legProp.arrivalStation} lineName={legProp.lineName} key={i} />;
            })}
        </>
    )
}