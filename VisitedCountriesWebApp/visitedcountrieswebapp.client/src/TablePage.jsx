import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryTable = () => {

    const [countries, setCountries] = useState([]);

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


    return (
        <div>
            <table>
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
                            <tr key={country.id}>
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
        </div>

    );
}


export default CountryTable;