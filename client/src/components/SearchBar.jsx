import React, { useState, useContext } from "react";
import { useDiscover } from "../context/DiscoverContext";
import {onSearch} from "../api/sightingsApi";
import "./SearchBar.css";
import { FiSliders, FiSearch, FiXCircle } from "react-icons/fi";
import { MdDataSaverOn } from "react-icons/md";

const SearchBar = () => {
    const {page, setDisplayedSightings, 
        resetDisplayedSightings,fetchSearchResult, setIsSearching, searchParams, setSearchParams} = useDiscover();
    const animal_types = ["Cat", "Dog", "Rabbit", "Bird", "Other"];
    const statuses = ["healthy", "sick", "injured", "unknown"];

    const [showFilters, setShowFilters] = useState(false);


    const handleChange = (event) => {
        const {name, value} = event.target;
        setSearchParams((prev) => ({
            ...prev, [name]: value
        }))
    }
    const handleClearFilters = () => {
        setSearchParams({
            searchText: "",
            animal_type: "",
            health_status: "",
            start_date: "",
            end_date: "",
            page: page,
            limit: 12
        });
        setIsSearching(false);
        resetDisplayedSightings();
    };

    const handleSearch = async () => {
        setIsSearching(true);
        await fetchSearchResult(searchParams);
    };

    return (
        <div className="searchbar-wrapper">
            <div className="searchbar-card">
                {/* TOP ROW */}
                <div className="searchbar-top">
                <div className="search-input-box">
                    <FiSearch className="search-icon" />
                    <input
                    type="text"
                    name="searchText"
                    value={searchParams.searchText}
                    onChange={handleChange}
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
                            <select 
                                id="status"
                                name="health_status" 
                                value={searchParams.health_status}
                                onChange={handleChange}>
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
                            <select 
                                id="animalType" 
                                name="animal_type"
                                value={searchParams.animal_type}
                                onChange={handleChange}>
                            <option value="">All Types</option>
                            {animal_types.map((animalType) => (
                                <option key={animalType} value={animalType}>
                                {animalType}
                                </option>
                            ))}
                            </select>
                        </div>

                        <div className="filter-group date-group">
                            <label>Date Range</label>
                            <div className="date-range-inputs">
                                <input 
                                    type="date" 
                                    name="start_date"
                                    value={searchParams.start_date}
                                    onChange={handleChange} />
                                <input 
                                    type="date"
                                    name="end_date"
                                    value={searchParams.end_date}
                                    onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="searchbar-bottom">
                        <button
                            className="submit-filters-btn" 
                            type="button"
                            onClick={handleSearch}>
                            <MdDataSaverOn />
                            <span>Filter</span>
                        </button>
                        <button 
                            className="clear-filters-btn" 
                            type="button"
                            onClick={handleClearFilters}
                        >
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
