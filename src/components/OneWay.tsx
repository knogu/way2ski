import {useTripCandidatesRes} from "../hooks/tripCandidates";
import {QueryCmp} from "./Query";
import {TripCandidateList} from "./TripCandidateList";

export const OneWay = (isChecked: boolean, handleClickToSki: ()=>void, handleClickHome: ()=>void, useTripCandidateRes: useTripCandidatesRes) => {
    return (
        <div className='way'>
            <div className='container'>
                <div className='tab-container'>
                    <button className={isChecked ? "active" : "inactive"} onClick={handleClickToSki}>行き</button>
                    <button className={isChecked ? "inactive" : "active"} onClick={handleClickHome}>帰り</button>
                </div>
            </div>

            <div className='way-body'>
                <div className='container'>
                    <div className="detailed-query block">
                        <div className='query-group'>
                            <p className='query-key'>

                            </p>
                        </div>
                        <QueryCmp query={useTripCandidateRes.query} setQuery={useTripCandidateRes.setQuery}/>
                    </div>

                    <div className='results'>
                        <TripCandidateList tripCandidateProps={useTripCandidateRes.tripCandidateList} />
                    </div>
                </div>
            </div>
        </div>
    )
}