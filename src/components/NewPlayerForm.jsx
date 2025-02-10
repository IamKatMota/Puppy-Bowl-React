import { useState } from "react"

const cohortName = "2409-GHP-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

export default function NewPlayerForm({ onPlayerAdded }) {
    //store user field input in a single object
    const [formData, setFormData] = useState({
        name: "",
        breed: "",
        imageUrl: "",
        status: "field", //default status if field
        teamId: 1797, //default team id is 1797(team ruff)
    })
    //store error and success messages
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    //Update the form fields dynamically as the user types; 
    function handleChange(event) {
        const { name, value } = event.target //{ name, value } extracts the field’s name and value from event.target.

        //setFormData updates only the changed field while keeping the others intact
        setFormData((prevData) => ({
            ...prevData, //keep previous data
            [name]: value, //update changed field
        }))
    }

    //handle team selection "Ruff" or "Fluff"
    function handleTeamChange(event) {
        const selectedTeam = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            teamId: selectedTeam === "ruff" ? 1797 : 1798 //if selection is ruff, set team id to 1797 otherwise 1798
        }))
    }
    //handle form submission
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const promise = await fetch(`${API_URL}/players`, {
                method: "POST", //sends data to the API
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData) //convert form data into json 
            })
            const response = await promise.json()
            if (!response.success) {
                throw new Error("Failed to add a player")
            }
            setSuccessMessage("Player added successfully!")
            setError(null) //clear any errors

            // Reset form after submission
            setFormData({ name: "", breed: "", imageUrl: "", status: "field", teamId: 1797 });

            // Call the function passed from the parent to refresh the player list
            if (onPlayerAdded) {
                onPlayerAdded();
            }
        } catch (error) {
            setError(error.message)
            setSuccessMessage(null)
        }
    }
    return (
        <div className="playerForm">
            <h2>Add a New Player</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Breed:
                    <input type="text" name="breed" value={formData.breed} onChange={handleChange} required />
                </label>
                <label>
                    imageUrl:
                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
                </label>
                <label>
                    Status:
                    <select name="status" value={formData.status} onChange={handleSubmit}>
                        <option value="field">Field</option>
                        <option value="bench">Bench</option>
                    </select>
                </label>
                <label>
                    <select value={formData.teamId === 1797 ? "ruff" : "fluff"} onChange={handleTeamChange}>
                        <option value="ruff">Ruff</option>
                        <option value="fluff">Fluff</option>
                    </select>
                </label>
                <button type="submit">Add Player</button>
            </form>
        </div>
    )
}