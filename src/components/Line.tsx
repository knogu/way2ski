import { LegProps } from "./Leg"
import { TripCandidateProps } from "./TripCandidate";

export type Line = {
    departureStation: string,
    arrivalStation: string,
    legs: LegProps[],
}

function kagura2yuzawa(): Line {
    const leg1: LegProps = {
        departureTime: new Date(2024, 1, 1, 15, 30, 0),
        departureStation: "かぐらスキー場",
        arrivalTime: new Date(2024, 1, 1, 15, 50, 0),
        arrivalStation: "越後湯沢",
        lineName: "シャトルバス",
    }
    return {
        departureStation: "かぐらスキー場",
        arrivalStation: "越後湯沢",
        legs: [leg1]
    }
}

function yuzawa2tokyo(): Line {
    const leg1: LegProps = {
        departureTime: new Date(2024, 1, 1, 16, 0, 0),
        departureStation: "越後湯沢",
        arrivalTime: new Date(2024, 1, 1, 17, 50, 0),
        arrivalStation: "東京",
        lineName: "上越新幹線",
    }
    return {
        departureStation: "越後湯沢",
        arrivalStation: "東京",
        legs: [leg1]
    }
}


function LineList2TripCandidateListProp(lineList: Line[]): TripCandidateProps[] {
    const lineCnt: number = lineList.length;
    let legIndices: number[] = new Array(lineCnt).fill(0);
    let tripCandidates: TripCandidateProps[] = [];
    for (let legIdxInFirst = 0; legIdxInFirst < lineList.at(0)!.legs.length; legIdxInFirst++) {
        let isOk = true;
        for (let lineIdx = 1; lineIdx < lineList.length; lineIdx++) {
            const curLine = lineList[lineIdx];
            const lastArrivalTime = lineList[lineIdx - 1].legs[legIndices[lineIdx-1]].arrivalTime;
            while (true) {
                const departureTime = curLine.legs[legIndices[lineIdx]].departureTime;
                if (lastArrivalTime < departureTime) {
                    break;
                }
                if (legIndices[lineIdx] === lineList[lineIdx].legs.length) {
                    isOk = false;
                    break;
                }
                legIndices[lineIdx] += 1;
            }
            if (!isOk) {
                break;
            }
        }
        if (isOk) {
            const legsInCurTrip: LegProps[] = [];
            legIndices.forEach((legIdx, lineIdx) => {
                legsInCurTrip.push(lineList[lineIdx].legs[legIdx]);
            })
            const curTrip: TripCandidateProps = {legProps: legsInCurTrip};
            tripCandidates.push(curTrip);
        }
    }    
    return tripCandidates;
}


export function genTripCandidateListProps(): TripCandidateProps[] {
    return LineList2TripCandidateListProp([kagura2yuzawa(), yuzawa2tokyo()])
}