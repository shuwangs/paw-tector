import React from "react";
import './DisplayCard.css';
const SightingCard = ({sighting}) => {

    return (
        <div className="sighting-card">
            <div className="species-icon">🐶</div>
            <div className="sighting-details">
                <div className="status-ctn">{sighting.health_status}</div>
                <div className="species">Dog</div>
                <div className="location"><span className="location-icon">📍</span> {sighting.address}</div>
                <div className="sighting-time">{sighting.sighted_at}</div>
            </div>

        </div>
    )
}

export default SightingCard;