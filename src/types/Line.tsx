import { LegProps } from "../components/Leg"
import {TripCandidateProps} from "../components/TripCandidate";
import { DetailedQueryFields } from "../components/DetailedQuery";
import { Leg, Run} from "../gen/way/v1/way_pb";

function hmToDate(hour: number, minute: number) {
    return new Date(2024, 1, 1, hour, minute, 0);
}

function runToArrivalTime(run: Run) {
    return hmToDate(run.arrivalHour, run.arrivalMinute);
}

function runToDepartureTime(run: Run) {
    return hmToDate(run.departureHour, run.departureMinute);
}

function runToLegProps(run: Run): LegProps {
    return {
        arrivalStation: run.arrivalStation,
        arrivalTime: runToArrivalTime(run),
        departureStation: run.departureStation,
        departureTime: runToDepartureTime(run),
        display: false,
        lineName: run.lineName,
    }
}

export function LineList2TripCandidateListProp(allLegs: Leg[], query: DetailedQueryFields): TripCandidateProps[] {
    if (isNaN(query.transitMinutes)) {
        return [];
    }
    if (allLegs.length === 0) {
        return [];
    }
    let legIdx2CurRunIdx: number[] = new Array(allLegs.length).fill(0);
    let tripCandidates: TripCandidateProps[] = [];
    for (let runIdxInFirst = 0; runIdxInFirst < allLegs[0].runs.length; runIdxInFirst++) {
        let isOk = true;
        for (let legIdx = 1; legIdx < allLegs.length; legIdx++) {
            let earliestPossibleDepartureTime: Date;
            if (legIdx === 1) {
                earliestPossibleDepartureTime = runToArrivalTime(allLegs[0].runs[runIdxInFirst]);
            } else {
                earliestPossibleDepartureTime = runToArrivalTime(allLegs[legIdx - 1].runs[legIdx2CurRunIdx[legIdx-1]]);
            }
            earliestPossibleDepartureTime.setMinutes(earliestPossibleDepartureTime.getMinutes() + query.transitMinutes);

            while (true) {
                if (legIdx2CurRunIdx[legIdx] === allLegs[legIdx].runs.length) {
                    isOk = false;
                    break;
                }

                const departureTime = runToDepartureTime(allLegs[legIdx].runs[legIdx2CurRunIdx[legIdx]]);
                if (earliestPossibleDepartureTime <= departureTime) {
                    break;
                }
                legIdx2CurRunIdx[legIdx] += 1;
            }
            if (!isOk) {
                break;
            }
        }
        if (isOk) {
            const runsInCurTrip: LegProps[] = [runToLegProps(allLegs[0].runs[runIdxInFirst])];
            legIdx2CurRunIdx.forEach((runIdx, legIdx) => {
                if (legIdx > 0)  {
                    runsInCurTrip.push(runToLegProps(allLegs[legIdx].runs[runIdx]));
                }
            })
            const curTrip: TripCandidateProps = {legProps: runsInCurTrip};
            const legLength = legIdx2CurRunIdx.length;
            if (curTrip.legProps.length === legLength && query.departAfter <= curTrip.legProps[0].departureTime && curTrip.legProps[legLength-1].arrivalTime <= query.arriveBefore) {
                tripCandidates.push(curTrip);
            }
        }
    }

    const res: TripCandidateProps[] = [];
    for (let i = 0; i < tripCandidates.length-1; i++) {
        const curDepartureTimes = convTripCandidateToDepartureTimes(tripCandidates[i])
        const nextDepartureTimes = convTripCandidateToDepartureTimes(tripCandidates[i+1])
        let shouldTakeCur = true
        for (let j = 0; j < curDepartureTimes.length; j++) {
            if (curDepartureTimes[j].getTime() === nextDepartureTimes[j].getTime()) {
                shouldTakeCur = false
                break
            }
        }
        if (shouldTakeCur) {
            res.push(tripCandidates[i])
        }
    }
    res.push(tripCandidates[tripCandidates.length-1])
    return res;
}

const convTripCandidateToDepartureTimes = (tripCandidateProps: TripCandidateProps) => {
    const ret: Date[] = [];
    for (let i = 0; i < tripCandidateProps.legProps.length; i++) {
        ret.push(
            tripCandidateProps.legProps[i].departureTime
        )
    }
    return ret
}