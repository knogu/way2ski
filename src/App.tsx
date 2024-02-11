import './App.css';
import { TripCandidateList } from './components/TripCandidateList';
import { useTripCandidates, useTripCandidatesRes } from './hooks/tripCandidates';
import { QueryCmp } from './components/Query';
import { ChangeEvent, useState } from 'react';
import { PlaceDateQuery } from './components/PlaceDateQuery';

const OneWay = (useTripCandidateRes: useTripCandidatesRes) => {
  return (
    <>
      <div className="detailed-query">
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
        <p>出発駅<input type="text" value={placeDateQuery.hometownStation} onChange={handleHometownStationChange}></input></p>
        <p>スキー場<input type="text" value={placeDateQuery.skiResort} onChange={handleSkiResortChange}></input></p>
      </section>
      
      <section className="main-results-and-detailed-query">
        <p>
          行き<input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        </p>
      {OneWay(useTripCandidates(placeDateQuery, isChecked))};
      </section>
    </>
  );
}

export default App;
