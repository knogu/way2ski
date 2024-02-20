import './App.css';

import { ChangeEvent, useState } from 'react';
import { PlaceDateQueryProps, PlaceDateQuery } from './components/PlaceDateQuery';
import { OneWay } from './components/OneWay';

function App() {
  const initialPlaceDateQuery: PlaceDateQueryProps = {
    hometownStation: "東京",
    skiResort: "かぐらスキー場",
    isHoliday: false,
  }
  const [placeDateQuery, setPlaceDateQuery] = useState<PlaceDateQueryProps>(initialPlaceDateQuery);

  const handleHometownStationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlaceDateQuery({
      ...placeDateQuery,
      hometownStation: event.target.value,
    })
  };

  const handleSkiResortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPlaceDateQuery({
      ...placeDateQuery,
      skiResort: event.target.value,
    })
  };

  const handleIsHolidayChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlaceDateQuery({
      ...placeDateQuery,
      isHoliday: event.target.checked,
    })
  };

  return (
    <>
      {PlaceDateQuery(placeDateQuery, handleHometownStationChange, handleSkiResortChange, handleIsHolidayChange)}
      {OneWay(placeDateQuery)}
    </>
  );
}

export default App;
