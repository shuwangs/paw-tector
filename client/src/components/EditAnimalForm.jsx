
import React,{useContext} from 'react';

const EditAnimalForm = () => {
    return (
        <div className="mode-new">
            <div className="modal-title">
                <h1>Update  Animal 🐾</h1>
                <button type="button" onClick={onClose}> x</button>
            </div>

            <div className="nickname-ctn">
                <label>
                    NickName*
                    <input type="text" name="nickname" value={form.nickname} onChange={handleChange} />
                </label>
            </div>
            <div className="breed-ctn">
                <label>
                    Species*
                    <select name="species" value={form.species} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="Cat">Cat</option>
                        <option value="Dog">Dog</option>
                        <option value="Rabbit">Rabbit</option>
                        <option value="Raccoon">Raccoon</option>
                        <option value="Others">Other</option>
                    </select>
                </label>
                <label >
                    Breed
                    <input name="breed" value={form.breed} onChange={handleChange} type="text" placeholder="Optional" />
                </label>
            </div>

            <div className="color-ctn">
                <label>
                    Age*
                    <select name="age_group" value={form.age_group} onChange={handleChange}>
                        <option value="unknown">Unknown</option>
                        <option value="baby">Babe</option>
                        <option value="young">Young</option>
                        <option value="adult">Adult</option>
                        <option value="senior">Senior</option>
                    </select>
                </label>
                <label >
                    Color
                    <input value={form.color} onChange={handleChange} name="color" type="text" placeholder="Optional" />
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

            <div className="btn-group">
                <button className="primary-btn" type="submit">Create Animal & Add Sighting</button>
                <button className="secondary-btn" type="button" onClick={handleClearForm}>Cancel</button>
            </div>
        </div> 

    )
}

export default EditAnimalForm;