import { TripCandidate, TripCandidateProps } from "./TripCandidate"

export type TripCandidateListProp = {
    tripCandidateProps: TripCandidateProps[],
}

export const TripCandidateList = (props: TripCandidateListProp) => {
    return (
        <div className="single-result">
            {props.tripCandidateProps.map((tripCandidateProp, i) => {
                return <TripCandidate key={i} legProps={tripCandidateProp.legProps} ></TripCandidate>
            })}
        </div>
    )
}