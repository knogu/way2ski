import { Leg, LegProps } from "./Leg"

export type TripCandidateProps = {
    legProps: LegProps[],
}

export const TripCandidate = (props: TripCandidateProps) => {
    return (
        <>
            {props.legProps.map((legProp, i) => {
                return Leg(legProp);
            })}
        </>
    )
}