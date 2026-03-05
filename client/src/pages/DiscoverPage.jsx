import React from "react";
import SightingsList from "../components/SightingsList";
import SearchBar from "../components/SearchBar";
import Map from "../components/Map";
const DiscoverPage = () => {

    return (
        <div className="discover-page">
            <h1>Discover Animals 🔍</h1>
            <SearchBar />

            <Map />
            <SightingsList />
        </div>

    )
}

export default DiscoverPage;