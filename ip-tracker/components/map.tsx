import {useState, useEffect} from 'react'
import L, { LatLng } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

var myIcon = L.icon({
  iconUrl: '/icon-location.svg',
  iconSize: [46, 56],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

interface MapProps {
  lat ?: number,
  lng ?: number,
}

function SetViewOnClick({lat, lng}: MapProps) {
  const map = useMap();
  if(lat && lng){
    map.setView(L.latLng(lat,lng), map.getZoom());
  }
  return null;
}


const Map = ({lat,lng}: MapProps) => {
  const [coords,setCoords] = useState<LatLng>(lat && lng ? L.latLng(lat,lng) : L.latLng([40.760261,-74.092906]));

  useEffect(() => {
    setCoords(lat && lng ? L.latLng(lat,lng) : L.latLng([40.760261,-74.092906]));
  },[lat, lng]);
  

  return (
    <MapContainer center={coords} zoom={13} scrollWheelZoom={false} dragging={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={myIcon} position={coords}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <SetViewOnClick lat={lat} lng={lng}/>
    </MapContainer>
  )
}

export default Map