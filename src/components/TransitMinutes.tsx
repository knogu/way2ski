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
        <p>
            <label htmlFor="transit-minute" className="query-key label-left">
                {props.stationName}
            </label>

            <div className="right-half">
                <input id="transit-minute" type="number" onChange={props.handleTransitMinutesChange}
                       value={displayedTransitMinutes(props.minutes)}/>
                分
            </div>
        </p>
)
}