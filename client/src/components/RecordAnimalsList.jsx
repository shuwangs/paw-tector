import React, {useState, useEffect} from 'react';
import { useCurrentUser } from "../context/CurrentUserContext.jsx";
import RecordAnimalCard from './RecordAnimalCard.jsx';
import SightingForm from './SightingForm.jsx';
import SightingModal from './SightingModal.jsx'
import '../pages/MyRecords.css';

const RecordAnimalsList = () => {
    const { trackedAnimals, loading, error } = useCurrentUser();
    const [showForm, setShowForm] = useState(false);

    return (
        <div className='records-list-ctn'>        
            <div className='myrecord-header'> 
                <h2>My Records 📋 </h2>
                <button className='primary-btn'
                onClick={() =>setShowForm(true)}> Add New</button>
                   {showForm && (
                    <SightingModal onClose={() => setShowForm(false)} />
                )}
            </div>
            <div className="tracked-animal-ctn">
                {trackedAnimals.map((trackedAnimal,) => (
                    <RecordAnimalCard key={trackedAnimal.individual_id} animal={trackedAnimal} />
                ))}

            </div>

        </div>

    )

}

export default RecordAnimalsList;