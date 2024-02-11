import './App.css';
import { TripCandidateList } from './components/TripCandidateList';
import { useTripCandidates, useTripCandidatesRes } from './hooks/tripCandidates';
import { QueryCmp } from './components/Query';

const OneWay = (useTripCandidateRes: useTripCandidatesRes) => {
  return (
    <>
      <QueryCmp query={useTripCandidateRes.query} setQuery={useTripCandidateRes.setQuery}/>
      <TripCandidateList tripCandidateProps={useTripCandidateRes.tripCandidateList} />
    </>
  )
}

function App() {
  return (
    <>
      {OneWay(useTripCandidates(true))}
      {OneWay(useTripCandidates(false))};
    </>
  );
}

export default App;
