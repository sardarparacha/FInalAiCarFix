import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBolt, faStar } from '@fortawesome/free-solid-svg-icons';

const SearchPanel = ({ search, handleSearch, handleSearchChange, filter, handleFilterChange, filteredPlaces, setSelectedPlace }) => {
  const [filterButtons, setFilterButtons] = useState([]);
  const [filteredResults, setFilteredResults] = useState(filteredPlaces);
  const [selectedFilter, setSelectedFilter] = useState(null);

  useEffect(() => {
    if (filteredPlaces.length > 0) {
      const uniqueFilters = getUniqueFilters(filteredPlaces);
      setFilterButtons(uniqueFilters);
      setFilteredResults(filteredPlaces);
    }
  }, [filteredPlaces]);

  const getUniqueFilters = (places) => {
    const uniqueFilters = new Set();
    places.forEach(place => {
      if (place.types && place.types.length > 0) {
        place.types.forEach(type => uniqueFilters.add(type));
      }
    });
    uniqueFilters.add('Above 4 ⭐');  // Only add two rating filters
    uniqueFilters.add('Above 3 ⭐');
    return Array.from(uniqueFilters);
  };

  const handleFilterButtonClick = (filter) => {
    setSelectedFilter(filter);
    const filtered = filteredPlaces.filter(place => {
      if (filter === 'Above 4 ⭐') {
        return place.rating >= 4;
      }
      if (filter === 'Above 3 ⭐') {
        return place.rating >= 3;
      }
      return place.types && place.types.includes(filter);
    });
    setFilteredResults(filtered);
  };

  return (
    <div className='w-full md:w-1/2 overflow-y-auto p-4 bg-white' style={{ maxHeight: "600px" }}>
      <form onSubmit={handleSearch} className='mb-4 flex items-center'>
        <select
          name='country'
          value={search.country}
          onChange={handleSearchChange}
          className='p-2 border bg-white border-gray-300 rounded mr-2 text-black'
        >
          <option value='US'>US</option>
          <option value='CA'>CA</option>
          <option value='UK'>UK</option>
          <option value='AU'>AU</option>
          <option value='NZ'>NZ</option>
          <option value='IE'>IE</option>
        </select>
        <input
          type='text'
          name='city'
          value={search.city}
          onChange={handleSearchChange}
          placeholder='Enter city'
          className='flex-grow p-2 border border-gray-300 rounded text-black'
        />
        <button type='submit' className='ml-2 p-2 bg-[#011E33] text-white rounded'>Search</button>
      </form>

      <div className='mb-4'>
        <input
          type='text'
          value={filter}
          onChange={handleFilterChange}
          placeholder='Filter places'
          className='w-full p-2 border border-gray-300 rounded text-black'
        />
        <div className='flex space-x-2 mt-2 overflow-auto' style={{ maxWidth: "100%", scrollbarWidth: "none" }}>
          {/* {filterButtons.map((filter, index) => (
            <button
              key={index}
              className={`p-2 rounded-full whitespace-nowrap ${selectedFilter === filter ? 'bg-[#011e33] text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => handleFilterButtonClick(filter)}
            >
              {filter}
            </button>
          ))} */}
        </div>
      </div>

      <div className='mb-4'>
        {filteredResults.length} Certified RepairPal Shops Nearby
      </div>

      {filteredResults.map((place) => (
        <div
          key={place.place_id}
          className='border rounded-lg shadow-lg p-4 mb-4 flex items-start bg-white cursor-pointer'
          onClick={() => setSelectedPlace(place)}
        >
          {place.photos && place.photos.length > 0 && (
            <img
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyAjTxt7EJ4LFoOGQ0p9h9rVkk017Gvnmu8`}
              alt={place.name}
              className='w-32 h-32 object-cover rounded-lg mr-4'
            />
          )}
          <div className='flex flex-col w-full'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center text-yellow-500 ml-2'>
                <h3 className='font-semibold text-lg text-gray-900 mr-3'>{place.name}</h3>
                <FontAwesomeIcon icon={faStar} />
                <span className='ml-1'>{place.rating}</span>
                <span className='text-gray-600 ml-1'>({place.user_ratings_total})</span>
              </div>
            </div>
            <p className='text-sm text-gray-600'>{place.vicinity}</p>
            <div className='flex items-center text-sm text-gray-600 mt-2'>
              <FontAwesomeIcon icon={faClock} className='mr-2' />
              {place.opening_hours && place.opening_hours.open_now ? 'Open' : 'Closed'}
            </div>
            <div className='flex items-center text-sm text-gray-600 mt-2'>
              <FontAwesomeIcon icon={faBolt} className='mr-2' />
              Soonest availability
            </div>
            <button className='mt-4 bg-[#e5e7eb] text-gray-700 px-4 py-2 rounded-full hover:bg-blue-300'>
              Check Availability
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchPanel;
