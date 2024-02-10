import { ChangeEvent, Dispatch, SetStateAction } from "react"

export type Query = {
    departAfter: Date,
    arriveBefore: Date,
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
    let curQuery: Query = {departAfter: props.query.departAfter, arriveBefore: props.query.arriveBefore};
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

    return (
        <>
            <input id="departAfter" type="time" onChange={handleDepartChange} value={date2inputVal(curQuery.departAfter)}></input>
            <input id="arriveBefore" type="time" onChange={handleArriveChange} value={date2inputVal(curQuery.arriveBefore)}></input>
        </>
    )
}