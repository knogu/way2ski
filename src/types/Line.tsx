import { LegProps } from "../components/Leg"
import { TripCandidateProps } from "../components/TripCandidate";
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
    if (query.isTransitMinutesEmpty) {
        return [];
    }
    if (allLegs.length === 0) {
        return [];
    }
    const lineCnt: number = allLegs.length;
    const departAfter = query.departAfter;
    const arriveBefore = query.arriveBefore;
    let legIdx2CurRunIdx: number[] = new Array(lineCnt).fill(0);
    let tripCandidates: TripCandidateProps[] = [];
    for (let runIdxInFirst = 0; runIdxInFirst < allLegs.at(0)!.runs.length; runIdxInFirst++) {
        let isOk = true;
        for (let legIdx = 1; legIdx < lineCnt; legIdx++) {
            let lastArrivalTime: Date;
            if (legIdx === 1) {
                lastArrivalTime = runToArrivalTime(allLegs.at(0)!.runs[runIdxInFirst]);
            } else {
                lastArrivalTime = runToArrivalTime(allLegs.at(legIdx - 1)!.runs[legIdx2CurRunIdx[legIdx-1]]);
            }
            const lastArrivalTimeCopy = new Date(lastArrivalTime.getTime());
            lastArrivalTimeCopy.setMinutes(lastArrivalTime.getMinutes() + query.transitMinutes);

            while (true) {
                if (legIdx2CurRunIdx[legIdx] === allLegs.at(legIdx)!.runs.length) {
                    isOk = false;
                    break;
                }

                const departureTime = runToDepartureTime(allLegs.at(legIdx)!.runs.at(legIdx2CurRunIdx[legIdx])!);
                if (lastArrivalTimeCopy <= departureTime) {
                    break;
                }
                legIdx2CurRunIdx[legIdx] += 1;
            }
            if (!isOk) {
                break;
            }
        }
        if (isOk) {
            const runsInCurTrip: LegProps[] = [runToLegProps(allLegs.at(0)!.runs.at(runIdxInFirst)!)];
            legIdx2CurRunIdx.forEach((runIdx, legIdx) => {
                if (legIdx > 0)  {
                    runsInCurTrip.push(runToLegProps(allLegs.at(legIdx)!.runs.at(runIdx)!));
                }
            })
            const curTrip: TripCandidateProps = {legProps: runsInCurTrip};
            const legLength = legIdx2CurRunIdx.length;
            if (curTrip.legProps.length === legLength && departAfter <= curTrip.legProps.at(0)!.departureTime && curTrip.legProps.at(legLength-1)!.arrivalTime <= arriveBefore) {
                tripCandidates.push(curTrip);
            }
        }
    }
    return tripCandidates;
}
