import React from "react"
const NewAnimalForm = ({onClose}) => {
    return (
        <form>
            <div>
                <h1>Add New Animal 🐾</h1>
                <button type="button" onClick={onClose}> x</button>
            </div>

            <div>
                <div>
                    <label>
                        NickName*
                        <input type="text" name="nickname" />
                    </label>
                </div>

                <div>
                    <label>
                        Species*
                        <select>
                            <option>Select...</option>
                            <option>Cat</option>
                            <option>Dog</option>
                            <option>Rabbit</option>
                        </select>
                    </label>
                    <label>
                        Breed
                        <input type="text" placeholder="Optional"  />
                    </label>
                </div>
                <div>
                    <label>
                        Location*
                        <input type="text"  />
                    </label>
                </div>
                <div>
               
                    <button>Healthy</button>
                    <button>Healthy</button>
                    <button>Injured</button>
                    <button>unknown</button>

                </div>
                
                <div>
                    <textarea></textarea>
                </div>

            </div>
            <div>            
                <button>Create Animal & Add Sighting</button>
                <button>Cancel</button>
            </div>

        </form>
    )
}

export default NewAnimalForm;