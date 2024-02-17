import { ChangeEvent, Dispatch, SetStateAction } from "react"

export type Query = {
    departAfter: Date,
    arriveBefore: Date,
    transitMinutes: number,
    isTransitMinutesEmpty: boolean,
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
                           isTransitMinutesEmpty: props.query.isTransitMinutesEmpty};
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
        if (event.target.value === "") {
            curQuery.isTransitMinutesEmpty = true;
        } else {
            const newTransitMinutes = parseInt(event.target.value);
            if (newTransitMinutes) {
                curQuery.transitMinutes = newTransitMinutes;
                curQuery.isTransitMinutesEmpty = false;
            }
        }
        props.setQuery(curQuery);
    };

    const displayedTransitMinutes = (curQuery: Query) => {
        if (curQuery.isTransitMinutesEmpty) {
            return "";
        }
        return curQuery.transitMinutes.toString();
    } 

    return (
        <>
            <div className="time-query query-group">
              <p><label htmlFor="departAfter" className="query-key">出発時刻</label><input id="departAfter" type="time" onChange={handleDepartChange} value={date2inputVal(curQuery.departAfter)}></input><label htmlFor="departAfter">以降</label></p>
              <p><label htmlFor="arriveBefore" className="query-key">到着時刻</label><input id="arriveBefore" type="time" onChange={handleArriveChange} value={date2inputVal(curQuery.arriveBefore)}></input><label htmlFor="arriveBefore">以前</label></p>
            </div>
            
            <div className="transit-query">
                <div className='query-group'>
                    <p><label htmlFor="transit-minute" className="query-key">乗り換え時間（越後湯沢）</label><input id="transit-minute" type="number" onChange={handleTransitMinutesChange} value={displayedTransitMinutes(curQuery)}></input>分以上</p>
                </div>
            </div>
        </>
    )
}