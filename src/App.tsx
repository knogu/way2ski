import React from 'react';
import './App.css';
import { TripCandidateList } from './components/TripCandidateList';
import { genTripCandidateListProps } from './components/Line';

function App() {
  return (
    <>
      <TripCandidateList tripCandidateProps={genTripCandidateListProps()} />
    </>
  );
}

export default App;
