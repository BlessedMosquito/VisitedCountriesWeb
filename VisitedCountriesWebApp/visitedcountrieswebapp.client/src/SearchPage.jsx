import React, { useState } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

export default function SearchPage() {
    const [countryName, setCountryName] = useState("");
    const [country, setCountry] = useState(null);
    const [error, setError] = useState(null);
    const [visitDate, setVisitDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [errorModal, setErrorModal] = useState(null);


    const handleSearch = async () => {
        try {
            const response = await axios.post("https://localhost:7225/api/countries/search", { countryName });
            setCountry(response.data);
            setError(null);
        }
        catch (error) {
            console.log(error.message);
            if (error.response && error.response.status === 404) {
                setError("Country not found");
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    }

    const handleAddButton = async () => {
        if (visitDate === null) {
            setErrorModal("Please select a date");
        }
            try {
                const formattedDate = visitDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                });
                await axios.post("https://localhost:7225/api/country/add",
                    { country: country, visitDate: formattedDate },
                    { withCredentials: true });
                setShowModal(false);
                alert(`Added ${country.name.common} as visited on ${formattedDate}`);
            }
            catch (error) {
                console.log(error.message);
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
                        {errorModal && <p style={{ color: "red" }}>{errorModal}</p>}
                        <h2>Select Visit Date</h2>
                        <DatePicker
                            selected={visitDate}
                            onChange={(date) => setVisitDate(date)}
                            showMonthYearPicker
                            dateFormat="MM-yyyy"
                            className="datepicker-input"
                        />
                        <button onClick={handleAddButton}>Save</button>
                        <button onClick={() => {
                            setShowModal(false);
                            setVisitDate(null);
                            setErrorModal(null);
                        }}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );

}