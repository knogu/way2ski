import './App.css';
import { TripCandidateList } from './components/TripCandidateList';
import { useTripCandidates, useTripCandidatesRes } from './hooks/tripCandidates';
import { QueryCmp } from './components/Query';
import { ChangeEvent, useState } from 'react';
import { PlaceDateQuery } from './components/PlaceDateQuery';

const OneWay = (isChecked: boolean, handleClickToSki: ()=>void, handleClickHome: ()=>void, useTripCandidateRes: useTripCandidatesRes) => {
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

function App() {
  const [isToSki, setIsToSki] = useState<boolean>(true);

  const handleClickToSki = () => {
    setIsToSki(true);
  };

  const handleClickHome = () => {
    setIsToSki(false);
  };

  const initialPlaceDateQuery: PlaceDateQuery = {
    hometownStation: "東京",
    skiResort: "かぐらスキー場",
    date: new Date(2024, 3, 13),
  }
  const [placeDateQuery, setPlaceDateQuery] = useState<PlaceDateQuery>(initialPlaceDateQuery);

  const handleHometownStationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlaceDateQuery({
      ...placeDateQuery,
      hometownStation: event.target.value,
    })
  };

  const handleSkiResortChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlaceDateQuery({
      ...placeDateQuery,
      skiResort: event.target.value,
    })
  };

  return (
    <>
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
      
      <section className="main-results-and-detailed-query">
        
      {OneWay(isToSki, handleClickToSki, handleClickHome, useTripCandidates(placeDateQuery, isToSki))}
      </section>
    </>
  );
}

export default App;
