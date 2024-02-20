import { LegProps } from "../components/Leg"
import { TripCandidateProps } from "../components/TripCandidate";
import { DetailedQueryFields } from "../components/DetailedQuery";
import { PlaceDateQueryProps } from "../components/PlaceDateQuery";
import minamiechigo from "../json/minamiechigo-bus.json"
import ishiuchimaruyama from "../json/ishiuchimaruyama-shuttle.json"
import maiko from "../json/maiko-shuttle.json"

export type Line = {
    departureStation: string,
    arrivalStation: string,
    legs: LegProps[],
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
            display: false,
        })
    });
    return {
        departureStation: "越後湯沢",
        arrivalStation: "東京",
        legs: legs,
    }
}

function tokyo2yuzawa(): Line {
    const times = [
        [6, 8, 7, 22],
        [6, 44, 7, 50],
        // [6, 36, 8, 2], better to take 6:44
        [7, 4, 8, 10],
        [7, 36, 8, 58],
        [7, 48, 9, 5],
        [8, 4, 9, 33],
        [8, 24, 9, 39],
        [8, 32, 9, 46],
        [8, 52, 10, 20],
        [9, 28, 10, 47],
        [9, 52, 11, 11],
        [10, 16, 11, 31],
    ]
    const legs: LegProps[] = [];
    times.forEach(time => {
        legs.push({
            departureTime: new Date(2024, 1, 1, time.at(0), time.at(1), 0),
            departureStation: "東京",
            arrivalTime: new Date(2024, 1, 1, time.at(2), time.at(3), 0),
            arrivalStation: "越後湯沢",
            lineName: "上越新幹線",
            display: false,
        })
    });
    return {
        departureStation: "東京",
        arrivalStation: "越後湯沢",
        legs: legs,
    }
}

type TimeList = {[key: string]: number[]};


interface lineJson {
    lineName: string;
    toSki: TimeList[];
    home: TimeList[];
  }

let skiResort2BusData: { [key: string]: lineJson } = {};
skiResort2BusData["かぐらスキー場"] = minamiechigo;
skiResort2BusData["石打丸山スキー場"] = ishiuchimaruyama;
skiResort2BusData["舞子スノーリゾート"] = maiko;

function skiResortName2LineToSki(skiResort: string): Line {
    const busData = skiResort2BusData[skiResort];
    const legs: LegProps[] = [];
    busData.toSki.forEach(timeList => {
        legs.push({
            departureTime: new Date(2024, 1, 1, timeList["越後湯沢"].at(0), timeList["越後湯沢"].at(1), 0),
            departureStation: "越後湯沢",
            arrivalTime: new Date(2024, 1, 1, timeList[skiResort].at(0), timeList[skiResort].at(1), 0),
            arrivalStation: skiResort,
            lineName: busData.lineName,
            display: false,
        })
    })

    return {
        departureStation: "越後湯沢",
        arrivalStation: skiResort,
        legs: legs,
    }
}

function skiResortName2LineHome(skiResort: string): Line {
    const busData = skiResort2BusData[skiResort];
    const legs: LegProps[] = [];
    busData.home.forEach(timeList => {
        legs.push({
            departureTime: new Date(2024, 1, 1, timeList[skiResort].at(0), timeList[skiResort].at(1), 0),
            departureStation: skiResort,
            arrivalTime: new Date(2024, 1, 1, timeList["越後湯沢"].at(0), timeList["越後湯沢"].at(1), 0),
            arrivalStation: "越後湯沢",
            lineName: busData.lineName,
            display: false,
        })
    })

    return {
        departureStation: skiResort,
        arrivalStation: "越後湯沢",
        legs: legs,
    }
}


function getLineList(placeDateQuery: PlaceDateQueryProps ,isToSki: boolean): Line[] {
    if (isToSki) {
        return [tokyo2yuzawa(), skiResortName2LineToSki(placeDateQuery.skiResort)];
    } else {
        return [skiResortName2LineHome(placeDateQuery.skiResort), yuzawa2tokyo()];
    }
}

function LineList2TripCandidateListProp(lineList: Line[], query: DetailedQueryFields): TripCandidateProps[] {
    if (query.isTransitMinutesEmpty) {
        return [];
    }
    const lineCnt: number = lineList.length;
    const departAfter = query.departAfter;
    const arriveBefore = query.arriveBefore;
    let lineIdx2CurLegIdx: number[] = new Array(lineCnt).fill(0);
    let tripCandidates: TripCandidateProps[] = [];
    for (let legIdxInFirst = 0; legIdxInFirst < lineList.at(0)!.legs.length; legIdxInFirst++) {
        let isOk = true;
        for (let lineIdx = 1; lineIdx < lineList.length; lineIdx++) {
            const curLine = lineList[lineIdx];
            let lastArrivalTime: Date;
            if (lineIdx === 1) {
                lastArrivalTime = lineList[0].legs[legIdxInFirst].arrivalTime;
            } else {
                lastArrivalTime = lineList[lineIdx - 1].legs[lineIdx2CurLegIdx[lineIdx-1]].arrivalTime;
            }
            const lastArrivalTimeCopy = new Date(lastArrivalTime.getTime());
            lastArrivalTimeCopy.setMinutes(lastArrivalTime.getMinutes() + query.transitMinutes);

            while (true) {
                if (lineIdx2CurLegIdx[lineIdx] === lineList[lineIdx].legs.length) {
                    isOk = false;
                    break;
                }

                const departureTime = curLine.legs[lineIdx2CurLegIdx[lineIdx]].departureTime;
                if (lastArrivalTimeCopy <= departureTime) {
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
                if (lineIdx > 0)  {
                    legsInCurTrip.push(lineList[lineIdx].legs[legIdx]);
                }
            })
            const curTrip: TripCandidateProps = {legProps: legsInCurTrip};
            const legLength = lineIdx2CurLegIdx.length;
            if (curTrip.legProps.length === legLength && departAfter <= curTrip.legProps.at(0)!.departureTime && curTrip.legProps.at(legLength-1)!.arrivalTime <= arriveBefore) {
                tripCandidates.push(curTrip);
            }
        }
    }    
    return tripCandidates;
}


export function genTripCandidateListProps(placeDateQuery: PlaceDateQueryProps, isToSki: boolean, query: DetailedQueryFields): TripCandidateProps[] {
    return LineList2TripCandidateListProp(getLineList(placeDateQuery, isToSki), query);
}
