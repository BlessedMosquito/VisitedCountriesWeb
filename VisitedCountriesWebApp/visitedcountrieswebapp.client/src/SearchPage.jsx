import React, { useState } from "react";
import axios from "axios";

export default function SearchPage() {
    const [countryName, setCountryName] = useState("");
    const [country, setCountry] = useState(null);
    const [error, setError] = useState(null);


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


    return (
        <div>
            <h1>Search for a Country</h1>
            <input
                type="text"
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                placeholder="Enter country name"
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {country && (
                <div>
                    <h2>{country.name.common} ({country.code})</h2>
                    <p><strong>Capital:</strong> {country.capital?.join(", ") || "N/A"}</p>
                    <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> {country.region} - {country.subRegion}</p>
                    <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
                    <p><strong>Currency:</strong> {country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(", ") : "N/A"}</p>
                    <p><strong>Timezones:</strong> {country.timezones?.join(", ")}</p>
                </div>
            )}
        </div>
    );

}