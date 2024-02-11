import './App.css';
import { TripCandidateList } from './components/TripCandidateList';
import { useTripCandidates, useTripCandidatesRes } from './hooks/tripCandidates';
import { QueryCmp } from './components/Query';
import { ChangeEvent, useState } from 'react';

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
    console.log(event.target.checked);
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <p>
        行き<input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      </p>
      {OneWay(useTripCandidates(isChecked))};
    </>
  );
}

export default App;
