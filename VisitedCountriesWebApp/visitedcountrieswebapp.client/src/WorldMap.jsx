import React, { useEffect, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import worldMap from "./world-110m.json";
import { geoMercator } from "d3-geo";
import axios from "axios";



export default function WorldMap() {

    const [scale, setScale] = useState(70);
    const [translate, setTranslate] = useState([400, 200]);
    const [isDragging, setIsDragging] = useState(false);
    const [visitedCountries, setVisitedCountries] = useState([]);

    const startDrag = useRef({ x: 0, y: 0 });

    const handleZoomIn = (event) => {
        event.preventDefault();

        const minScale = 70;
        const maxScale = 300;
        if (event.deltaY < 0) {
            setScale(prevScale => Math.max(prevScale * 0.9, minScale));
        } else {
            setScale(prevScale => Math.min(prevScale * 1.1, maxScale));
        }
    };

    const handleMouseDown = (event) => {
        setIsDragging(true);
        startDrag.current = [event.clientX, event.clientY];
        document.body.style.overflow = "hidden";
    }

    const handleMouseMove = (event) => {
        if (isDragging) {
            const dx = event.clientX - startDrag.current[0];
            const dy = event.clientY - startDrag.current[1];
            setTranslate([translate[0] + dx, translate[1] + dy]);
            startDrag.current = [event.clientX, event.clientY];
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false);
        document.body.style.overflow = "auto";
    }


    const getVisitedCountries = async () => {
        try {
            const response = await axios.get("https://localhost:7225/api/country/get/all", { withCredentials: true });
            const countryNames = [...new Set(response.data.map(country => country.name))];
            console.log(countryNames);
            setVisitedCountries(countryNames);

        }
        catch (error) {
            console.error("Error getting visited countries", error);
        }
    }

    useEffect(() => { getVisitedCountries(); }, []);

    const projection = geoMercator()
        .scale(scale)
        .translate([translate[0], translate[1]])
        .center([0, 20]) 
        .precision(0.1);

    return (
        <div className="map-div"
            onWheel={handleZoomIn}
            onMouseDown={handleMouseDown} 
            onMouseMove={handleMouseMove} 
            onMouseUp={handleMouseUp} 
            onMouseLeave={handleMouseUp}
            >
            <ComposableMap projection={projection}>
            <Geographies geography={worldMap}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const countryName = geo.properties.name;
                            const isVisited = visitedCountries.includes(countryName);
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    className={`geography ${isVisited ? 'visited' : ''}`}
                                 />
                            )
                            
                        }
                        
                    )
                }
            </Geographies>
            </ComposableMap>
        </div>
    );
}