import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import NavigationItems from './NavigationItems';

const containerStyle = {
  width: '100%',
  height: '79%',
};

const options = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 5000,
  zIndex: 1,
};

const MapDisplay = ({ center, filteredPlaces, selectedPlace, setSelectedPlace }) => {
  return (
    <div className='w-full md:w-1/2 relative' style={{ height: "500px" }}>
      <NavigationItems />
      <LoadScript googleMapsApiKey="AIzaSyAjTxt7EJ4LFoOGQ0p9h9rVkk017Gvnmu8">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          <Circle
            center={center}
            options={options}
          />
          {filteredPlaces.map((place) => (
            <Marker
              key={place.place_id}
              position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }}
              onClick={() => setSelectedPlace(place)}
            />
          ))}
          {selectedPlace && (
            <InfoWindow
              position={{ lat: selectedPlace.geometry.location.lat, lng: selectedPlace.geometry.location.lng }}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div>
                <h2 className='font-semibold text-lg text-black'>{selectedPlace.name}</h2>
                <p className='text-sm text-black'>{selectedPlace.vicinity}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      <div className='absolute bottom-10 right-10 text-sm bg-white bg-opacity-70 p-2 rounded
      text-black
      '>
        Car Clinic Shop for Parts
      </div>
    </div>
  );
};

export default MapDisplay;
