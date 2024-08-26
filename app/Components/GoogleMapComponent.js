import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchPanel from './GoogleMap/SearchPanel';
import MapDisplay from './GoogleMap/MapDisplay';

const defaultCenter = {
  lat: 34.0522,
  lng: -118.2437,
};

const GoogleMapComponent = () => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [search, setSearch] = useState({ country: 'US', city: 'Los Angeles' });
  const [filter, setFilter] = useState('');
  const [center, setCenter] = useState(defaultCenter);

  const fetchPlaces = async (location) => {
    try {
      const { data } = await axios.get(
        `https://botbase-cors-server-ecj5.onrender.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
        {
          params: {
            location: `${location.lat},${location.lng}`,
            radius: 5000,
            type: 'car_repair',
            key: 'AIzaSyAjTxt7EJ4LFoOGQ0p9h9rVkk017Gvnmu8'
          }
        }
      );

      console.log('Places:', data.results);
      setPlaces(data.results);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${search.city}&key=AIzaSyAjTxt7EJ4LFoOGQ0p9h9rVkk017Gvnmu8`);
    
    const location = data.results[0]?.geometry?.location;
    fetchPlaces(location);
    setCenter(location);
  };

  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    fetchPlaces(defaultCenter);
  }, []);

  const filteredPlaces = filter
    ? places.filter((place) => place.name.toLowerCase().includes(filter.toLowerCase()))
    : places;

  return (
    <div className='flex flex-col md:flex-row ' >
      <SearchPanel
        search={search}
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
        filter={filter}
        handleFilterChange={handleFilterChange}
        filteredPlaces={filteredPlaces}
        setSelectedPlace={setSelectedPlace}
      />
      <MapDisplay
        center={center}
        filteredPlaces={filteredPlaces}
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
      />
    </div>
  );
};

export default React.memo(GoogleMapComponent);
