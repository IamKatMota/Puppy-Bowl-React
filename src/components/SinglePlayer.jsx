import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link to navigate


const cohortName = "2409-GHP-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`
export default function SinglePlayer() {
    const { id } = useParams(); 
    const [player, setPlayer] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!id){
            setError("Invalid player ID");
            return; // Stop function if playerId is missing
        }
        async function fetchSinglePlayer() {
            try {
                const response = await fetch(`${API_URL}/players/${id}`);
                const data = await response.json();
                
                if (!data.success) {
                    throw new Error(`Failed to fetch player #${id}`);
                }

                setPlayer(data.data.player);
            } catch (err) {
                console.error(`Oh no, trouble fetching player #${id}!`, err);
                setError(err.message);
            }
        }

        fetchSinglePlayer();
    }, [id]);

    //  Show loading state while waiting for player data
    if (!player && !error) return <p>Loading player...</p>;

    // Show error if fetching fails
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    const teamName =
        player?.teamId === 1797 ? "Ruff" :
        player?.teamId === 1798 ? "Fluff" :
        "Unassigned";

    return (
        <div className="singlePlayerCard">
            {player && (
                <>
                    <img src={player.imageUrl} alt={player.name} className="player-image" />
                    <h3>Name: {player.name}</h3>
                    <h4>ID: {player.id}</h4>
                    <h4>Breed: {player.breed}</h4>
                    <h4>Status: {player.status}</h4>
                    <h4>Team: {teamName}</h4>
                    <Link to={"/"}>
                        <button className="backButton">Back</button>
                    </Link>
                </>
            )}
        </div>
    );
}