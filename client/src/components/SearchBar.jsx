const SearchBar = () => {
    return (
        <div className="search-bar">
            <div>
                <div>
                    <span>🔍</span>
                    <input id="search-input" placeholder="Search by name or breed..." />
                </div>
                <div>
                    <select>
                        <option value="">All Species </option>
                        {/*TODO: hardcoded for now */}
                        <option value="Cat">Cat</option>
                        <option value="Dog">Dog</option>
                        <option>Rabbit</option>
                        <option>Bird</option>
                        <option>Bird</option>
                        <option >Bird</option>

                    </select>
                </div>

                {/* maybe location for nwo */}
                <div>
                    <select>
                        <option>All Locations </option>
                        {/*TODO: hardcoded for now */}
                        <option>DC</option>
                        <option>Georgetown</option>
                        <option>Fairfax</option>
                        <option>unkown</option>
                    </select>
                </div>

                <div>
                    <select>
                        <option>All Status </option>
                        {/*TODO: hardcoded for now */}
                        <option>healthy</option>
                        <option>injured</option>
                        <option>sick</option>
                        <option>unkown</option>
                    </select>
                </div>
            </div>
            

            <div className="search-btn-group">
                <button>
                    Apply Filters
                </button>
                <button>
                    Clear
                </button>
            </div>
  

        </div>
    )
}

export default SearchBar;