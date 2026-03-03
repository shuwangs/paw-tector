import React from "react";

const SightingCard = ({sighting}) => {

    return (
        <div className="sighting">
            <div className="species-icon">sighting</div>
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