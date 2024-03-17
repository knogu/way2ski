import { ChangeEvent, Dispatch, SetStateAction } from "react"
import './DetailedQuery.css';
import {TransitMinutes} from "./TransitMinutes";

export type DetailedQueryFields = {
    departAfter: Date,
    arriveBefore: Date,
}

export type DetailedQueryProps = {
    query: DetailedQueryFields,
    setQuery: Dispatch<SetStateAction<DetailedQueryFields>>
    transitStations: string[]
    staNameToTransTime: { [key: string]: number }
    setStaNameToTransTime: Dispatch<SetStateAction<{ [key: string]: number }>>
}

const date2inputVal = (date: Date) => {
    let hours: string = date.getHours().toString().padStart(2, '0');
    let minutes: string = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export const DetailedQuery = (props: DetailedQueryProps) => {
    let curQuery: DetailedQueryFields = {
        departAfter: props.query.departAfter,
        arriveBefore: props.query.arriveBefore,
    }

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

    const handleTransitMinutesChange = (stationName: string) => (event: ChangeEvent<HTMLInputElement>) => {
        const newStaNameToTransTime = {
            ...props.staNameToTransTime,
        }
        newStaNameToTransTime[stationName] = parseInt(event.target.value)
        props.setStaNameToTransTime(newStaNameToTransTime)
    };

    return (
        <>
            <div className="time-query query-group">
              <p className="flex-center">
                  <label htmlFor="departAfter" className="query-key label-left">出発時刻</label>
                  <div className="right-half">
                    <input id="departAfter" type="time" onChange={handleDepartChange} value={date2inputVal(curQuery.departAfter)}></input>
                    <label htmlFor="departAfter">以降</label>
                  </div>
              </p>
                <p className="flex-center">
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
                    <p className="transit-query-title">乗り換え時間</p>

                    {
                        props.transitStations.map(staName => {
                            return <TransitMinutes stationName={staName}
                                                   minutes={props.staNameToTransTime[staName]}
                                                   handleTransitMinutesChange={handleTransitMinutesChange(staName)}/>
                        })
                    }
                </div>
            </div>
        </>
    )
}
