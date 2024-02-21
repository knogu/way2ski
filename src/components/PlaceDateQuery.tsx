import { ChangeEvent } from "react";
import './PlaceDateQuery.css';

export type PlaceDateQueryProps = {
    hometownStation: string,
    skiResort: string,
    isHoliday: boolean,
}

export const PlaceDateQuery = (placeDateQuery: PlaceDateQueryProps, handleHometownStationChange: (event: ChangeEvent<HTMLInputElement>) => void, handleSkiResortChange: (event: ChangeEvent<HTMLSelectElement>) => void, handleIsHolidayChange: (event: ChangeEvent<HTMLInputElement>) => void) => {
    return (<>
        <section className="date-place-query">
        <div className='container'>
            <div className='block'>
                <div className='place-query'>
                <p>
                    <label htmlFor="hometown-station" className="query-key">出発駅</label>
                    <input id="hometown-station" type="text" value={placeDateQuery.hometownStation} onChange={handleHometownStationChange} placeholder='出発駅'></input>
                </p>
                <p>
                    <label htmlFor="ski-resort" className="query-key">スキー場</label>
                    <select id="ski-resort" value={placeDateQuery.skiResort} onChange={handleSkiResortChange}>
                        <option value="かぐらスキー場">かぐらスキー場</option>
                        <option value="石打丸山スキー場">石打丸山スキー場</option>
                        <option value="舞子スノーリゾート">舞子スノーリゾート</option>
                    </select>
                </p>
                <p>
                    <label htmlFor="is-holiday">土休日</label>
                    <div className="right-half">
                        <input id="is-holiday" type="checkbox" value="土休日" checked={placeDateQuery.isHoliday} onChange={handleIsHolidayChange}/>
                    </div>
                </p>
                </div>
            </div>
        </div>
        </section>
    </>
    );
}
