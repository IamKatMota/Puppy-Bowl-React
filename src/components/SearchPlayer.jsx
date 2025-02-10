import { useState } from "react";
export default function SearchPlayer({ players }) {
    const [searchQuery, setSearchQuery] = useState(""); // Store search input
    const [filteredPlayers, setFilteredPlayers] = useState([]); // Store results
    const [searched, setSearched] = useState(false); // ✅ Track if a search was performed

    function handleSearch() {
        if (!searchQuery) return; // Prevent empty searches

        // Filter players that match the search query (case-insensitive)
        const results = players.filter(player =>
            player.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPlayers(results);
        setSearched(true); //  Mark that search was performed
    }

    return (
        <div className="searchContainer">
            <input 
                type="text" 
                placeholder="Search for a player..." 
                value={searchQuery} 
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearched(false); // Reset search state when typing
                }} 
            />
            <button onClick={handleSearch}>Search</button>

            {/* Display search results */}
            {filteredPlayers.length > 0 ? (
                <div className="searchResults">
                    {filteredPlayers.map(player => (
                        <div key={player.id} className="playerCard">
                            <h3>{player.name}</h3>
                            {player.imageUrl && <img src={player.imageUrl} alt={player.name} />}
                            <div>ID: {player.id}</div>
                        </div>
                    ))}
                </div>
            ) : searched && ( //  Only show message after searching
                <p>No players found.</p>
            )}
        </div>
    );
}