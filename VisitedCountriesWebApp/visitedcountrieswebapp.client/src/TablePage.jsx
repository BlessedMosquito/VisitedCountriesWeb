import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryTable = () => {

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get("https://localhost:7225/api/country/get/all", { withCredentials: true });
                setCountries(response.data); 
            } catch (error) {
                console.error("Error getting countries", error);
            }
        };

        getData();
    }, []);

    const handleRowClick = (country) => { setSelectedCountry(country) };

    const deleteRow = () => {
        if (!selectedCountry) return;

        const deleteCountry = async () => {
            try {
                await axios.delete(`https://localhost:7225/api/country/delete/${selectedCountry.id}`, { withCredentials: true });
                setCountries((prevCountries) => prevCountries.filter((item) => item.id !== selectedCountry.id));
            } catch (error) {
                console.error("Error deleting country", error);
            }
        };

        deleteCountry();
    }


    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Region</th>
                        <th>Visitation date</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.length > 0 ? (
                        countries.map((country, index) => (
                            <tr key={country.id}
                                onClick={() => handleRowClick(country)}
                                className={selectedCountry?.id === country.id ? 'selected-row' : ''}>
                                <td>{index + 1}</td>
                                <td>{country.name}</td>
                                <td>{country.region}</td>
                                <td>{new Date(country.dateVisited).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={deleteRow}>DELETE</button>
        </div>

    );
}


export default CountryTable;