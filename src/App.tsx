import './App.css';
import { TripCandidateList } from './components/TripCandidateList';
import { useTripCandidates, useTripCandidatesRes } from './hooks/tripCandidates';
import { QueryCmp } from './components/Query';
import { ChangeEvent, useState } from 'react';
import { PlaceDateQuery } from './components/PlaceDateQuery';

const OneWay = (useTripCandidateRes: useTripCandidatesRes) => {
  return (
    <>
      <QueryCmp query={useTripCandidateRes.query} setQuery={useTripCandidateRes.setQuery}/>
      <TripCandidateList tripCandidateProps={useTripCandidateRes.tripCandidateList} />
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
      <p>出発駅<input type="text" value={placeDateQuery.hometownStation} onChange={handleHometownStationChange}></input></p>
      <p>スキー場<input type="text" value={placeDateQuery.skiResort} onChange={handleSkiResortChange}></input></p>
      <p>
        行き<input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      </p>
      {OneWay(useTripCandidates(placeDateQuery, isChecked))};
    </>
  );
}

export default App;
