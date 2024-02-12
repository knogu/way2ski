import './App.css';
import { TripCandidateList } from './components/TripCandidateList';
import { useTripCandidates, useTripCandidatesRes } from './hooks/tripCandidates';
import { QueryCmp } from './components/Query';
import { ChangeEvent, useState } from 'react';
import { PlaceDateQuery } from './components/PlaceDateQuery';

const OneWay = (isChecked: boolean, handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void, useTripCandidateRes: useTripCandidatesRes) => {
  return (
    <>
      <div className="detailed-query">
          <div className='query-group'>
            <p>
              <label className='query-key' htmlFor='is-to-ski'>行き</label><input id="is-to-ski" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
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
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
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
          <div className='query-group'>
            <p><label htmlFor="hometown-station" className="query-key">出発駅</label><input id="hometown-station" type="text" value={placeDateQuery.hometownStation} onChange={handleHometownStationChange}></input></p>
            <p><label htmlFor="ski-resort" className="query-key">スキー場</label><input id="ski-resort" type="text" value={placeDateQuery.skiResort} onChange={handleSkiResortChange}></input></p>
          </div>
        </div>
      </section>
      
      <section className="main-results-and-detailed-query">
      <div className='container'>
        
      {OneWay(isChecked, handleCheckboxChange, useTripCandidates(placeDateQuery, isChecked))};
      </div>
      </section>
    </>
  );
}

export default App;
