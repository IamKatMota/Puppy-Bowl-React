import { useState } from "react";
const cohortName = "2409-GHP-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`
export default function RemovePlayer({ playerId, onPlayerRemoved }) {
    const [error, setError] = useState(null)
    async function handleRemove() {
        try {
            const promise = await fetch(`${API_URL}/players/${playerId}`, {
                method: 'DELETE'
            })
            const response = await promise.json();
            if (!response.success) {
                throw new Error('Failed to remove player')
            }
            //if onPlayerRemoved function exists, call the function
            if (onPlayerRemoved) {
                onPlayerRemoved()
            }

        } catch (err) {
            setError(err.message)
        }
    };
    return (
        <>
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleRemove} className="button">❌</button>
        </>
    )
}