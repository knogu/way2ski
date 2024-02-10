import React from 'react';
import './App.css';
import { TripCandidateList } from './components/TripCandidateList';
import { genTripCandidateListProps } from './types/Line';
import { useTripCandidates } from './hooks/tripCandidates';
import { QueryCmp, QueryProps } from './components/Query';

function App() {
  const {query, setQuery, tripCandidateList, setTripCandidateList} = useTripCandidates();
  return (
    <>
      <QueryCmp query={query} setQuery={setQuery}/>
      <TripCandidateList tripCandidateProps={tripCandidateList} />
    </>
  );
}

export default App;
