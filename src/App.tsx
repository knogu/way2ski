import './App.css';
import { useTripCandidates, useTripCandidatesRes } from './hooks/tripCandidates';
import { ChangeEvent, useState } from 'react';
import { PlaceDateQueryProps, PlaceDateQuery } from './components/PlaceDateQuery';
import { OneWay } from './components/OneWay';

function App() {
  const [isToSki, setIsToSki] = useState<boolean>(true);

  const handleClickToSki = () => {
    setIsToSki(true);
  };

  const handleClickHome = () => {
    setIsToSki(false);
  };

  const initialPlaceDateQuery: PlaceDateQueryProps = {
    hometownStation: "東京",
    skiResort: "かぐらスキー場",
    date: new Date(2024, 3, 13),
  }
  const [placeDateQuery, setPlaceDateQuery] = useState<PlaceDateQueryProps>(initialPlaceDateQuery);

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
      {PlaceDateQuery(placeDateQuery, handleHometownStationChange)}
      {OneWay(isToSki, handleClickToSki, handleClickHome, useTripCandidates(placeDateQuery, isToSki))}
    </>
  );
}

export default App;
