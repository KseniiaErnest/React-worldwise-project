import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css';
import { MapContainer, TileLayer, Popup, Marker, useMap } from 'react-leaflet';
import { useState } from 'react';
import { useCities } from '../contexts/CitiesContext';

export default function Map() {
  const navigate = useNavigate();
  const [mapPoistion, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();

  const [searchParams, setSearchParams] = useSearchParams();
  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');

  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <MapContainer center={mapPoistion} zoom={6} scrollWheelZoom={true} className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map(city => (
       <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
      <Popup>
       <span>{city.emoji}</span><span>{city.cityName}</span>
      </Popup>
    </Marker>
    ))}

    <ChangeCenter position={[mapLat, mapLng]} />
  </MapContainer>
    </div>
  )
}

function ChangeCenter({position}) {
const map = useMap();
map.setView(position);

}
