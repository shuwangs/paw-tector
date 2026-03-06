import React,{useContext, useState} from "react";
import { createAnimalWithSighting } from "../api/sightingsApi";
import { useCurrentUser } from "../context/CurrentUserContext";
import './SightingForm.css'
const SightingForm = ({onClose}) => {
    // TODOS
    // if the animal is in the db, add sightings only
    const {currentUserId, trackedAnimals, setTrackedAnimals} = useCurrentUser();

    const initialForm = {
        nickname: "",
        species: "",
        breed: "",
        color: "",
        age_group: "unknown",
        is_sterilized: false,
        is_stray: true,
        // Sighting 
        location: "",
        health_status: "healthy",
        sighted_at: "",
        notes: ""
    }


    const [form, setForm] = useState(initialForm);

    const handleChange = ((event) => {
        setForm((prev)=>({ ...prev, [event.target.name]: event.target.value}));
    })

    const handleHealthStatus = (status) => {
        setForm((prev)=>({...prev, health_status: status}));
    }
    
    const handleClearForm = () => setForm(initialForm);
    const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setForm((prev) => ({
        ...prev,
        [name]: checked
    }));
    };
    const handleSubmitForm = async (e) => {  
        e.preventDefault();
          try {
            const newAnimal = await createAnimalWithSighting(currentUserId, form);
            console.log(newAnimal);
            onClose();
            setTrackedAnimals(prev => [...prev, newAnimal]);    
        } catch (error) {
        console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmitForm}>
            <div className="modal-title">
                <h1>Add New Animal 🐾</h1>
                <button type="button" onClick={onClose}> x</button>
            </div>

            <div className="modal-content">
                <div className="nickname-ctn">
                    <label>
                        NickName*
                        <input type="text" name="nickname" value={form.nickname} onChange={handleChange}/>
                    </label>
                </div>

                <div className="breed-ctn">
                    <label>
                        Species*
                        <select name="species" value={form.species}  onChange={handleChange}>
                            <option value="">Select...</option>
                            <option value="Cat">Cat</option>
                            <option value="Dog">Dog</option>
                            <option value="Rbbit">Rabbit</option>
                            <option value="Raccoon">Raccoon</option>
                            <option value="Others">Other</option>
                        </select>
                    </label>
                    <label >
                        Breed
                        <input name="breed" value={form.breed} onChange={handleChange} type="text" placeholder="Optional"  />
                    </label>
                </div>

                <div className="color-ctn">
                    <label>
                        Age*
                        <select name="age_group" value={form.age_group}  onChange={handleChange}>
                            <option value="unknown">Unknown</option>
                            <option value="baby">Babe</option>
                            <option value="young">Young</option>
                            <option value="adult">Adult</option>
                            <option value="senior">Senior</option>
                        </select>
                    </label>
                    <label >
                        Color
                        <input value={form.color} onChange={handleChange} name="color" type="text" placeholder="Optional"  />
                    </label>
                </div>


                <div className="stray-ctn">
                    <label>
                        Sterilized
                        <input
                            type="checkbox"
                            name="is_sterilized"
                            checked={form.is_sterilized}
                            onChange={handleCheckboxChange}
                        />
                    </label>

                    <label>
                        Is Stray
                        <input
                            type="checkbox"
                            name="is_stray"
                            checked={form.is_stray}
                            onChange={handleCheckboxChange}
                        />
                    </label>
                </div>

                <div className="found-details">
                 
                        <label>
                            Location*
                            <input type="text" name="location" value={form.location} onChange={handleChange} />
                        </label>
       
                        <label>
                            Sighted at*
                            <input name="sighted_at" type="datetime-local" value={form.sighted_at} onChange={handleChange} />
                        </label>
       
                </div>
                <div>
               
                    <button type="button" onClick={()=>{handleHealthStatus('healthy')}}>Healthy</button>
                    <button type="button" onClick={()=>{handleHealthStatus('sick')}}>Sick</button>
                    <button type="button" onClick={()=>{handleHealthStatus('injured')}}>Injured</button>
                    <button type="button" onClick={()=>{handleHealthStatus('unknown')}}>Unknown</button>

                </div>
                
                <div>
                    <textarea
                        name="notes" 
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Notes: anything about this animal (Optional)"
                    />
                </div>

            </div>
            <div className="btn-group">            
                <button className="primary-btn" type="submit">Create Animal & Add Sighting</button>
                <button className="secondary-btn" type="button" onClick={handleClearForm}>Cancel</button>
            </div>

        </form>
    )
}

export default SightingForm;