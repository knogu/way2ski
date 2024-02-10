export type LegProps = {
    departureTime: Date,
    departureStation: string,
    arrivalTime: Date,
    arrivalStation: string,
    lineName: string,
}

function displayTime(date: Date) : string {
    let m = date.getMinutes().toString();
    if (m.length === 1) {
        m = "0" + m;
    }
    return date.getHours() + ":" + m;
}

export const Leg = (legProps: LegProps) => {
    return (
        <>
            <p className='leave'>{displayTime(legProps.departureTime) + " "}<span className='ms-2'>{legProps.departureStation}</span></p>
            <div className='v-line'></div>
            <p className='reach'>{displayTime(legProps.arrivalTime) + " "}<span className='ms-2'>{legProps.arrivalStation}</span></p>
        </>
    )
}