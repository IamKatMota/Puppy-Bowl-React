import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AllPlayers from './components/AllPlayers';
import SinglePlayer from './components/SinglePlayer';
import SearchPlayer from './components/SearchPlayer';

const cohortName = "2409-GHP-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

function App() {
    const [players, setPlayers] = useState([]); 

    useEffect(() => {
        async function fetchAllPlayers() {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                if (!data.success) {
                    throw data.error;
                }
                setPlayers(data.data.players);
            } catch (err) {
                console.error("Error fetching players:", err);
            }
        }

        fetchAllPlayers();
    }, []);

    return (
        <>
          <h1>Puppy Bowl</h1>
            <SearchPlayer players={players} /> {/* Pass players as props */}
            <Routes>
                <Route path='/' element={<AllPlayers />} />
                <Route path='/players/:id' element={<SinglePlayer />} />
            </Routes>
        </>
    );
}

export default App;

