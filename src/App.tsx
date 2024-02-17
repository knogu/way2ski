import './App.css';
import { TripCandidateList } from './components/TripCandidateList';
import { useTripCandidates, useTripCandidatesRes } from './hooks/tripCandidates';
import { QueryCmp } from './components/Query';
import { ChangeEvent, useState } from 'react';
import { PlaceDateQuery } from './components/PlaceDateQuery';

const OneWay = (isChecked: boolean, handleClickToSki: ()=>void, handleClickHome: ()=>void, useTripCandidateRes: useTripCandidatesRes) => {
  return (
    <>
      <div className="detailed-query block">
          <div className='query-group'>
            <p className='query-key'>
              <button className={isChecked ? "active" : "inactive"} onClick={handleClickToSki}>行き</button>
              <button className={isChecked ? "inactive" : "active"} onClick={handleClickHome}>帰り</button>
            </p>
          </div>
          <QueryCmp query={useTripCandidateRes.query} setQuery={useTripCandidateRes.setQuery}/>
      </div>

      <div className='results'>
          <TripCandidateList tripCandidateProps={useTripCandidateRes.tripCandidateList} />
      </div>
    </>
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
      <section className="main-date-place-query">
        <div className='container'>
          <div className='query-group block'>
            <p><label htmlFor="hometown-station" className="query-key">出発駅</label><input id="hometown-station" type="text" value={placeDateQuery.hometownStation} onChange={handleHometownStationChange}></input></p>
            <p><label htmlFor="ski-resort" className="query-key">スキー場</label><input id="ski-resort" type="text" value={placeDateQuery.skiResort} onChange={handleSkiResortChange}></input></p>
          </div>
        </div>
      </section>
      
      <section className="main-results-and-detailed-query">
      <div className='container'>
        
      {OneWay(isToSki, handleClickToSki, handleClickHome, useTripCandidates(placeDateQuery, isToSki))}
      </div>
      </section>
    </>
  );
}

export default App;
