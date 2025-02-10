import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link to navigate
import NewPlayerForm from "./NewPlayerForm";
import RemovePlayer from "./RemovePlayer";

const cohortName = "2409-GHP-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`

export default function AllPlayers() {
    const [players, setPlayers] = useState([]) //stores players from API

    async function fetchAllPlayers() {
        try {
            const promise = await fetch(`${API_URL}/players`);
            const response = await promise.json()
            if (!response.success) {
                throw response.error;
            }
            setPlayers(response.data.players);
            console.log('fetched players:', response.data.players)
        } catch (err) {
            console.error("Uh oh, trouble fetching players!", err);
        }
    };
    //useEffect so we dont fetch players on every rerender
    useEffect(() => {
        fetchAllPlayers();
    }, [])

    return (
        <div className="container">

            <NewPlayerForm onPlayerAdded={fetchAllPlayers} />

            <div className="playerGrid">
                {/**passing down fetchAllPlayers as a prop to newplayerform so it can run it to rerender the players after a new one has been added instead of having to manually refresh */}
                {/**Display player cards by looping through array of players */}
                {players.length > 0 ? (
                    players.map((player) => (
                        <div key={player.id} className="playerCard">
                            <h3>{player.name}</h3>
                            {/**if images are missing, wont try to render them */}
                            {player.imageUrl && <img src={player.imageUrl} alt={player.name} />}
                            <div>ID: {player.id}</div>
                            {/*  Use Link to navigate to SinglePlayer */}
                            <Link to={`/players/${player.id}`}>
                                <button className="button">🔍</button>
                            </Link>
                            {/**Remove player button */}
                            <RemovePlayer onPlayerRemoved={fetchAllPlayers} playerId={player.id} />


                        </div>
                    ))
                ) : (
                    <p>No players found!</p>
                )}

            </div>
        </div>

    )
}