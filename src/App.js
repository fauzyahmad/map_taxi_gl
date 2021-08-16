import React, {useState, useEffect} from 'react';
import { useDataLayerValue } from './context/DataLayer';
import InfoTaxi from './info_taxi';
import MapDeckTaxi from './mapdeck_taxi';
import { getTaxiAvailability } from './services';

export default function App() {
  const [loading, setLoading] = useState(false)
  const [{dataTaxi}, dispatch] = useDataLayerValue()

  const getDataTaxi = async() => {
    setLoading(true)
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1)
    let responseData = await getTaxiAvailability(localISOTime);
    dispatch({type: 'SET_DATA_TAXI', payload: responseData.features[0].geometry.coordinates })
    dispatch({type: 'SET_TAXI_COUNT', payload: responseData.features[0].properties.taxi_count })
    dispatch({type: 'SET_TIMESTAMP', payload: responseData.features[0].properties.timestamp })
    setLoading(false)
  }

  useEffect(() => {
    // return () => {
    //   effect
    // };
    getDataTaxi()
  }, [])
  return (
    <>
      { loading
        ? <p></p>
        : <div>
            <MapDeckTaxi data={dataTaxi} />
            <InfoTaxi />
          </div>
      }
    </>
  );
}
