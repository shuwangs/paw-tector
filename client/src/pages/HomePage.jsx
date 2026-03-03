
import React from "react";

const HomePage = () => {
    return (
        <div>
        
            <div className="hero">
                <div>
                    <h1>Track, Care, Connect</h1>
                    <p>Join our community of volunteers to track and care for stray animals in your neighborhood</p>
                </div>

                <button>Join Our Community</button>
                <button> Report Sighting</button>
            </div>

            <div className="stats-ctn">
                <div> 
                    <div>🐕</div>
                    <div> 3</div>
                    <div>Animal Tracked</div>
                </div>

                <div>
                    <div>👀</div>
                    <div> 3</div>
                    <div>Total Sightings</div>
                </div>

                <div>
                    <div>📍</div>
                    <div> 3</div>
                    <div>Locations</div>
                </div>
            </div>


            <div>
                <h2>How It Works 🎯</h2>
                <div >
                    <div className="card discription-card">
                        <h2>📸</h2>
                        <h3>Spot & Report</h3>
                        <p>See a stray animal? Log its location and details to help track it.</p>
                    </div>  

                    <div className="card discription-card">
                        <h2>🗺️</h2>
                        <h3>Track & Discover</h3>
                        <p>View hotspots on the map and find animals that need help.</p>
                    </div>  
                    
                    <div className="card discription-card">
                        <h2>💚</h2>
                        <h3>Help & Care</h3>
                        <p>Connect with volunteers to provide food, shelter, or medical care..</p>
                    </div>  
                </div>  
            </div>

        
        </div>


    )
}

export default HomePage;