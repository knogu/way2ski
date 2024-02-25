import {ChangeEvent} from "react";

export type TransitMinutesProps = {
    stationName: string,
    minutes: number,
    handleTransitMinutesChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

const displayedTransitMinutes = (minutes: number) => {
    if (isNaN(minutes)) {
        return ""
    }
    return minutes.toString()
}

export const TransitMinutes = (props: TransitMinutesProps) => {
    return (
        <>
        <label htmlFor="transit-minute" className="query-key">
            {props.stationName}
        </label>

        <input id="transit-minute" type="number" onChange={props.handleTransitMinutesChange}
               value={displayedTransitMinutes(props.minutes)}/>
        </>
    )
}