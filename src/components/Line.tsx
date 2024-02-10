import { time } from "console";
import { LegProps } from "./Leg"
import { TripCandidateProps } from "./TripCandidate";

export type Line = {
    departureStation: string,
    arrivalStation: string,
    legs: LegProps[],
}

function kagura2yuzawa(): Line {
    const times = [
        [12, 19, 12, 40],
        [13, 14, 13, 38],
        [14, 34, 14, 58],
        [15, 4, 15, 25],
        [16, 34, 16, 55],
        [16, 59, 17, 20],
        [17, 9, 17, 33],
        [18, 39, 19, 3],
        [19, 56, 20, 20],
    ]
    const legs: LegProps[] = [];
    times.forEach(time => {
        legs.push({
            departureTime: new Date(2024, 1, 1, time.at(0), time.at(1), 0),
            departureStation: "かぐらスキー場",
            arrivalTime: new Date(2024, 1, 1, time.at(2), time.at(3), 0),
            arrivalStation: "越後湯沢",
            lineName: "南越後観光バス",
        })
    });
    return {
        departureStation: "かぐらスキー場",
        arrivalStation: "越後湯沢",
        legs: legs, 
    }
}

function yuzawa2tokyo(): Line {
    const times = [
        [12, 11, 13, 28],
        [13, 13, 14, 28],
        [14, 11, 15, 28],
        [14, 31, 15, 44],
        [15, 13, 16, 28],
        [16, 3, 17, 28],
        [16, 25, 17, 40],
        [17, 8, 18, 20],
        [17, 16, 18, 40],
        [17, 41, 19, 0],
        [18, 5, 19, 24],
        [18, 12, 19, 36],
        [18, 32, 19, 52],
        [19, 5, 20, 12],
        [19, 40, 20, 56],
        [20, 28, 21, 52],
        [21, 17, 22, 28],
        [22, 25, 23, 40],
    ]
    const legs: LegProps[] = [];
    times.forEach(time => {
        legs.push({
            departureTime: new Date(2024, 1, 1, time.at(0), time.at(1), 0),
            departureStation: "越後湯沢",
            arrivalTime: new Date(2024, 1, 1, time.at(2), time.at(3), 0),
            arrivalStation: "東京",
            lineName: "上越新幹線",
        })
    });
    return {
        departureStation: "越後湯沢",
        arrivalStation: "東京",
        legs: legs,
    }
}

function getLineList(): Line[] {
    return [kagura2yuzawa(), yuzawa2tokyo()];
}

function LineList2TripCandidateListProp(lineList: Line[]): TripCandidateProps[] {
    const lineCnt: number = lineList.length;
    let lineIdx2CurLegIdx: number[] = new Array(lineCnt).fill(0);
    let tripCandidates: TripCandidateProps[] = [];
    for (let legIdxInFirst = 0; legIdxInFirst < lineList.at(0)!.legs.length; legIdxInFirst++) {
        let isOk = true;
        for (let lineIdx = 1; lineIdx < lineList.length; lineIdx++) {
            const curLine = lineList[lineIdx];
            let lastArrivalTime;
            if (lineIdx == 1) {
                lastArrivalTime = lineList[0].legs[legIdxInFirst].arrivalTime;
            } else {
                lastArrivalTime = lineList[lineIdx - 1].legs[lineIdx2CurLegIdx[lineIdx-1]].arrivalTime;
            }
            while (true) {
                const departureTime = curLine.legs[lineIdx2CurLegIdx[lineIdx]].departureTime;
                if (lastArrivalTime < departureTime) {
                    break;
                }
                if (lineIdx2CurLegIdx[lineIdx] === lineList[lineIdx].legs.length) {
                    isOk = false;
                    break;
                }
                lineIdx2CurLegIdx[lineIdx] += 1;
            }
            if (!isOk) {
                break;
            }
        }
        if (isOk) {
            const legsInCurTrip: LegProps[] = [lineList[0].legs[legIdxInFirst]];
            lineIdx2CurLegIdx.forEach((legIdx, lineIdx) => {
                if (legIdx > 0)  {
                    legsInCurTrip.push(lineList[lineIdx].legs[legIdx]);
                }
            })
            const curTrip: TripCandidateProps = {legProps: legsInCurTrip};
            tripCandidates.push(curTrip);
        }
    }    
    return tripCandidates;
}


export function genTripCandidateListProps(): TripCandidateProps[] {
    return LineList2TripCandidateListProp(getLineList());
}