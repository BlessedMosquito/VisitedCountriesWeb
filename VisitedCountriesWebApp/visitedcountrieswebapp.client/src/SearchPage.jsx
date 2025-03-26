import React, { useState } from "react";
import axios from "axios";

export default function SearchPage() {
    const [countryName, setCountryName] = useState("");
    const [country, setCountry] = useState(null);
    const [error, setError] = useState(null);
    const [visitDate, setVisitDate] = useState("");
    const [showModal, setShowModal] = useState(false);


    const handleSearch = async() => {
        setError(null);
        setCountry(null);

        try {
            const response = await axios.post("https://localhost:7225/api/countries/search", { countryName });
            setCountry(response.data);
        }
        catch (error) {
            setError(error.message);
        }
    }

    const handleAddButton = async () => {
        if (country != null && visitDate) {
            try {
                const formattedDate = new Date(visitDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                });
                console.log("Cookies:", document.cookie);
                console.log(formattedDate);
                await axios.post("https://localhost:7225/api/country/add", { country: country, visitDate: formattedDate }, { withCredentials: true });
                setShowModal(false);
                alert(`Added ${country.name.common} as visited on ${visitDate}`);
            }
            catch(error) {
                setError(error.message);
            }
        }
    }

    const handleDatePicker = async () => {
        setShowModal(true);
    }


    return (
        <div className="div-container-style-2">
            <h1>Search for a Country</h1>
            <input className="search-input"
                type="text"
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                placeholder="Enter country name"
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {country && (
                <div className="div-container-style">
                    <h2 >{country.name.common} ({country.code})</h2>
                    <p><strong>Capital:</strong> {country.capital?.join(", ") || "N/A"}</p>
                    <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> {country.region} - {country.subRegion}</p>
                    <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
                    <p><strong>Currency:</strong> {country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(", ") : "N/A"}</p>
                    <p><strong>Timezones:</strong> {country.timezones?.join(", ")}</p>
                    <button onClick={handleDatePicker}>Add as visited</button>
                </div>
            )}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Select Visit Date</h2>
                        <input
                            type="date"
                            value={visitDate}
                            onChange={(e) => setVisitDate(e.target.value)}
                        />
                        <button onClick={handleAddButton}>Save</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );

}