import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import axios from "axios";

const mapContainerStyle = {
    width: "100%",
    height: "500px",
};

const defaultCenter = { lat: 17.3850, lng: 78.4867 }; // Default: Hyderabad

const MapComponent = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "API KEY",
    });

    const [userLocation, setUserLocation] = useState(null);
    const [centers, setCenters] = useState([]);
    const [filteredCenters, setFilteredCenters] = useState([]);

    // 🟢 Fetch Recycling Centers from Flask Backend
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/centers")
            .then(response => {
                console.log("Fetched Centers:", response.data);
                setCenters(response.data);
            })
            .catch(error => console.error("Error fetching centers:", error));
    }, []);

    // 📌 Get User's Current Location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    console.log("User Location:", latitude, longitude);
                },
                (error) => console.error("Error getting location:", error),
                { enableHighAccuracy: true }
            );
        }
    }, []);

    // 🔍 Filter Nearby Recycling Centers (within 10km)
    useEffect(() => {
        if (userLocation && centers.length > 0) {
            const nearby = centers.filter(center => {
                const distance = haversineDistance(
                    userLocation.lat,
                    userLocation.lng,
                    center.latitude,
                    center.longitude
                );
                return distance <= 10; // Show only centers within 10km
            });

            console.log("Nearby Centers:", nearby);
            setFilteredCenters(nearby);
        }
    }, [userLocation, centers]);

    // 📏 Haversine Formula for Distance Calculation
    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        const toRad = (x) => (x * Math.PI) / 180;
        const R = 6371; // Radius of Earth in km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    if (loadError) return <p>Error loading maps</p>;
    if (!isLoaded) return <p>Loading maps...</p>;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={userLocation || defaultCenter}
            zoom={12}
        >
            {/* User Location Marker */}
            {userLocation && (
                <Marker
                    position={userLocation}
                    icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    }}
                />
            )}

            {/* Recycling Centers Markers */}
            {filteredCenters.map((center, index) => (
                <Marker
                    key={index}
                    position={{ lat: center.latitude, lng: center.longitude }}
                    onClick={() => console.log("Selected Center:", center)}
                />
            ))}
        </GoogleMap>
    );
};

export default MapComponent;
