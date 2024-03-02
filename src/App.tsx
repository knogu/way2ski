import './App.css';

import React, {ChangeEvent, useEffect, useState} from 'react';
import { PlaceDateQueryProps, PlaceDateQuery } from './components/PlaceDateQuery';
import { OneWay } from './components/OneWay';
import {useClient} from "./components/use-client";
import {WayService} from "./gen/way/v1/way-WayService_connectquery";
import {GetHometownStationsRequest} from "./gen/way/v1/way_pb";

function App() {
  const initialPlaceDateQuery: PlaceDateQueryProps = {
    hometownStation: "東京",
    skiResort: "かぐらスキー場",
    isHometownStationValid: true,
    isHoliday: false,
  }
  const [placeDateQuery, setPlaceDateQuery] = useState<PlaceDateQueryProps>(initialPlaceDateQuery);

  const client = useClient(WayService);
  let [hometownStations, setHometownStations] = useState<string[]>([]);

  const getHomeTownStations = async () => {
    client.getHometownStations(new GetHometownStationsRequest()).then((resp) => {
      setHometownStations(resp.hometownStations)
    });
  };

  useEffect(() => {
    getHomeTownStations()
  }, []);

  const handleHometownStationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlaceDateQuery({
      ...placeDateQuery,
      isHometownStationValid: hometownStations.includes(event.target.value),
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
        <div className='description'>
          <p>東京駅・越後湯沢駅経由でスキー場に行く際の電車・バスの時刻を調べられます</p>
          <p>山手線・中央線内の出発駅に対応しています</p>
        </div>
        {PlaceDateQuery(placeDateQuery, handleHometownStationChange, handleSkiResortChange, handleIsHolidayChange)}
        {OneWay(placeDateQuery)}
      </>
  );
}

export default App;
