import { ChangeEvent } from "react";

export type PlaceDateQuery = {
    hometownStation: string,
    skiResort: string,
    date: Date,
}

export const PlaceDateQueryCmp = (placeDateQuery: PlaceDateQuery, handleHometownStationChange: (event: ChangeEvent<HTMLInputElement>) => void) => {
    return (<>
        <section className="date-place-query">
        <div className='container'>
            <div className='block'>
                <div className='place-query'>
                <p><label htmlFor="hometown-station" className="query-key">出発駅</label> <input id="hometown-station" type="text" value={placeDateQuery.hometownStation} onChange={handleHometownStationChange} placeholder='出発駅'></input></p>
                {/* todo: selectに変更 */}
                <p><label htmlFor="hometown-station" className="query-key">スキー場</label> <input id="ski-resort" type="text" value={placeDateQuery.skiResort} onChange={handleHometownStationChange} placeholder='スキー場'></input></p>
                </div>
                {/* todo: 日にち追加 */}
            </div>
        </div>
        </section>
    </>
    );
}
