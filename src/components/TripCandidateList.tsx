import { TripCandidate, TripCandidateProps } from "./TripCandidate"

export type TripCandidateListProps = {
    tripCandidateProps: TripCandidateProps[],
}

export const TripCandidateList = (props: TripCandidateListProps) => {
    return (
        <div className="single-result">
            {props.tripCandidateProps.map((tripCandidateProp, i) => {
                return <TripCandidate key={i} legProps={tripCandidateProp.legProps} ></TripCandidate>
            })}
        </div>
    )
}
