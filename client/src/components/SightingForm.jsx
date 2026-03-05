import React,{useState} from "react"
const SightingForm = ({onClose}) => {
    // TODOS
    // if the animal is in the db, add sightings only
    const initialForm = {
        nickname: "",
        species: "",
        breed: "",

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

    const handleSubmitForm = (e) => {  
        e.preventDefault();
        // TODOS:  Post to the db
        console.log(form);
    }

    return (
        <form onSubmit={handleSubmitForm}>
            <div>
                <h1>Add New Animal 🐾</h1>
                <button type="button" onClick={onClose}> x</button>
            </div>

            <div>
                <div>
                    <label>
                        NickName*
                        <input type="text" name="nickname" value={form.nickname} onChange={handleChange}/>
                    </label>
                </div>

                <div>
                    <label>
                        Species*
                        <select name="species" defaultValue={form.species}  onChange={handleChange}>
                            <option >Select...</option>
                            <option>Cat</option>
                            <option>Dog</option>
                            <option>Rabbit</option>
                        </select>
                    </label>
                    <label value={form.breed} onChange={handleChange}>
                        Breed
                        <input name="breed" type="text" placeholder="Optional"  />
                    </label>
                </div>
                <div>
                 
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
            <div>            
                <button type="submit">Create Animal & Add Sighting</button>
                <button type="button" onClick={handleClearForm}>Cancel</button>
            </div>

        </form>
    )
}

export default SightingForm;