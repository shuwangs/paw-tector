import React, { useState } from "react";
import "./SearchBar.css";
import { FiSliders, FiSearch, FiXCircle } from "react-icons/fi";

const SearchBar = () => {
  const animal_types = ["Cat", "Dog", "Rabbit", "Bird", "Other"];
  const statuses = ["healthy", "sick", "injured", "unknown"];

  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar-card">
        {/* TOP ROW */}
        <div className="searchbar-top">
          <div className="search-input-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by nickname, type, or location..."
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="filter-toggle-btn"
            type="button"
          >
            <FiSliders />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <>
            <div className="searchbar-divider"></div>

            <div className="searchbar-filters">
              <div className="filter-group">
                <label htmlFor="status">Health Status</label>
                <select id="status" defaultValue="">
                  <option value="">All Status</option>
                  {statuses.map((status) => (
                    <option key={status} value={status.toLowerCase()}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="animalType">Animal Type</label>
                <select id="animalType" defaultValue="">
                  <option value="">All Types</option>
                  {animal_types.map((animalType) => (
                    <option key={animalType} value={animalType.toLowerCase()}>
                      {animalType}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group date-group">
                <label>Date Range</label>
                <div className="date-range-inputs">
                  <input type="date" />
                  <input type="date" />
                </div>
              </div>
            </div>

            <div className="searchbar-bottom">
              <button 
              className="clear-filters-btn" type="button">
                <FiXCircle />
                <span>Clear all filters</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
