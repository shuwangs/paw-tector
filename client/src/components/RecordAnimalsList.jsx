import React, {useState, useEffect} from 'react';

import { useCurrentUser } from "../context/CurrentUserContext.jsx";
import RecordAnimalCard from './RecordAnimalCard.jsx';
import SightingForm from './SightingForm.jsx';

const RecordAnimalsList = () => {
    const { trackedAnimals, loading, error } = useCurrentUser();
    const [showForm, setShowForm] = useState(false);

    return (
        <div>        
            <div className='myrecord-header'> 
                <h2>My Records 📋 </h2>
                <button onClick={() =>setShowForm(true)}> Add New</button>
                   {showForm && (
                    <SightingForm onClose={() => setShowForm(false)} />
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