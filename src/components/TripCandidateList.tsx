import { TripCandidate, TripCandidateProps } from "./TripCandidate"

export type TripCandidateListProp = {
    tripCandidateProps: TripCandidateProps[],
}

export const TripCandidateList = (props: TripCandidateListProp) => {
    return (
        <>
            {props.tripCandidateProps.map((tripCandidateProp, i) => {
                return <TripCandidate key={i} legProps={tripCandidateProp.legProps} ></TripCandidate>
            })}
        </>
    )
}