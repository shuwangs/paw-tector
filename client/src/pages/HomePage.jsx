
import React, {useContext} from "react";
import {Link} from 'react-router-dom';
import { useDiscover  } from "../context/DiscoverContext";
import './HomePage.css'
const HomePage = () => {
    const {stats} = useDiscover();
    console.log(stats);
    return (
        <div>
        
            <div className="hero">
                <div>
                    <h1>💚 Track, Care, Connect</h1>
                    <p>Join our community of volunteers to track and care for stray animals in your neighborhood</p>
                </div>
                <div className="btn-group">
                    <Link to="/discover"  className="toLinkDiscover" >
                        <button className="btn-join">💚 Explore Sightings</button>
                    </Link>
                    <Link to='/records' >
                        <button className="btn-report">🔍 Report Sighting</button>
                    </Link>
                    
                </div>
            </div>

            <div className="stats-ctn">
                <div className="stats-card"> 
                    <div className="stats-icon">🐕</div>
                    <div className="stats-count">{stats.animals_tracked}</div>
                    <div className="stats-class"> Animal Tracked</div>
                </div>

                <div className="stats-card">
                    <div className="stats-icon"> 👀</div>
                    <div className="stats-count">{stats.total_sightings}</div>
                    <div className="stats-class">Total Sightings</div>
                </div>

                <div className="stats-card">
                    <div className="stats-icon">❣️</div>
                    <div className="stats-count"> {stats.total_volunteers}</div>
                    <div className="stats-class">Volunteers</div>
                </div>

                <div className="stats-card">
                    <div className="stats-icon">📍</div>
                    <div className="stats-count"> {stats.locations}</div>
                    <div className="stats-class">Locations</div>
                </div>
            </div>


            <div className="description-ctn">
                <h2>How It Works 🎯</h2>
                <div className="description-cards">
                    <div className="card discription-card">
                        <h2>📸</h2>
                        <h3>Spot & Report</h3>
                        <p>See a stray animal? Log  its location and details to help track it.</p>
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