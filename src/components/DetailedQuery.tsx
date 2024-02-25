import { ChangeEvent, Dispatch, SetStateAction } from "react"
import './DetailedQuery.css';

export type DetailedQueryFields = {
    departAfter: Date,
    arriveBefore: Date,
    transitMinutes: number,
}

export type DetailedQueryProps = {
    query: DetailedQueryFields,
    setQuery: Dispatch<SetStateAction<DetailedQueryFields>>
}

const date2inputVal = (date: Date) => {
    let hours: string = date.getHours().toString().padStart(2, '0');
    let minutes: string = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export const DetailedQuery = (props: DetailedQueryProps) => {
    let curQuery: DetailedQueryFields = {departAfter: props.query.departAfter,
                           arriveBefore: props.query.arriveBefore,
                           transitMinutes: props.query.transitMinutes};
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
        props.setQuery(curQuery);
    };

    const displayedTransitMinutes = (curQuery: DetailedQueryFields) => {
        if (isNaN(curQuery.transitMinutes)) {
            return ""
        }
        return curQuery.transitMinutes.toString()
    } 

    return (
        <>
            <div className="time-query query-group">
              <p>
                  <label htmlFor="departAfter" className="query-key label-left">出発時刻</label>
                  <div className="right-half">
                    <input id="departAfter" type="time" onChange={handleDepartChange} value={date2inputVal(curQuery.departAfter)}></input>
                    <label htmlFor="departAfter">以降</label>
                  </div>
              </p>
                <p>
                    <label htmlFor="arriveBefore" className="query-key label-left">到着時刻</label>
                    <div className="right-half">
                        <input id="arriveBefore" type="time" onChange={handleArriveChange}
                               value={date2inputVal(curQuery.arriveBefore)}></input>
                        <label htmlFor="arriveBefore">以前</label>
                    </div>
                </p>
            </div>

            <div className="transit-query">
                <div className='query-group'>
                    <p><label htmlFor="transit-minute" className="query-key">乗り換え時間（越後湯沢）</label><input id="transit-minute" type="number" onChange={handleTransitMinutesChange} value={displayedTransitMinutes(curQuery)}></input>分以上</p>
                </div>
            </div>
        </>
    )
}
