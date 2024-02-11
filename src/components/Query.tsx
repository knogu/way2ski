import { ChangeEvent, Dispatch, SetStateAction } from "react"

export type Query = {
    departAfter: Date,
    arriveBefore: Date,
    transitMinutes: number,
    isTransitMinutesValid: boolean,
}

export type QueryProps = {
    query: Query,
    setQuery: Dispatch<SetStateAction<Query>>
}

const date2inputVal = (date: Date) => {
    let hours: string = date.getHours().toString().padStart(2, '0');
    let minutes: string = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export const QueryCmp = (props: QueryProps) => {
    let curQuery: Query = {departAfter: props.query.departAfter,
                           arriveBefore: props.query.arriveBefore,
                           transitMinutes: props.query.transitMinutes,
                           isTransitMinutesValid: props.query.isTransitMinutesValid};
    const handleDepartChange = (event: ChangeEvent<HTMLInputElement>) => {
        const [h, m] = event.target.value.split(':').map(Number);
        curQuery.departAfter = new Date(2024, 1, 1, h, m, 0);
        props.setQuery(curQuery);
    };

    const handleArriveChange = (event: ChangeEvent<HTMLInputElement>) => {
        const [h, m] = event.target.value.split(':').map(Number);
        curQuery.arriveBefore = new Date(2024, 1, 1, h, m, 0);
        props.setQuery(curQuery);
    };

    const handleTransitMinutesChange = (event: ChangeEvent<HTMLInputElement>) => {
        curQuery.transitMinutes = parseInt(event.target.value);
        if (curQuery.transitMinutes) {
            curQuery.isTransitMinutesValid = true;
        } else {
            curQuery.transitMinutes = 0;
            curQuery.isTransitMinutesValid = false;
        }
        props.setQuery(curQuery);
    };

    const displayedTransitMinutes = (curQuery: Query) => {
        if (curQuery.isTransitMinutesValid) {
            return curQuery.transitMinutes.toString();
        } else {
            return "";
        }
    } 

    return (
        <>
            <div className="time-query">
              <p><input id="departAfter" type="time" onChange={handleDepartChange} value={date2inputVal(curQuery.departAfter)}></input>以降に出発</p>
              <p><input id="arriveBefore" type="time" onChange={handleArriveChange} value={date2inputVal(curQuery.arriveBefore)}></input>以前に到着</p>
            </div>
            
            <div className="transit-query">
              <p>乗り換え時間（越後湯沢）：<input id="transitMinute" type="text" onChange={handleTransitMinutesChange} value={displayedTransitMinutes(curQuery)}></input>分以上</p>
            </div>
        </>
    )
}