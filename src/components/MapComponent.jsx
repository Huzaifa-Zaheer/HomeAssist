import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const centerFallback = {
  lat: 24.912737,
  lng: 67.121555,
};

const SERVICE_TYPE_MULTIPLIERS = {
  plumber: 1.2,
  electrician: 1.5,
  driver: 1.0,
  // ...add more as needed
};

async function snapToRoad({ lat, lng }, apiKey) {
  const url = `https://roads.googleapis.com/v1/snapToRoads?path=${lat},${lng}&interpolate=false&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.snappedPoints && data.snappedPoints.length > 0) {
    const snapped = data.snappedPoints[0].location;
    return { lat: snapped.latitude, lng: snapped.longitude };
  }
  // fallback to original if no snap
  return { lat, lng };
}

function calculateCharge(distanceMeters, serviceType) {
  const baseFare = 1200; // e.g., 200 PKR
  const perKmRate = 200; // e.g., 50 PKR per km
  const multiplier = SERVICE_TYPE_MULTIPLIERS[serviceType.toLowerCase()] || 1;
  const distanceKm = distanceMeters / 1000;
  return baseFare + (distanceKm * perKmRate * multiplier);
}

function MapComponent({ onLocationSelect, providers = [], showProviders = false }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [activeProviderInfo, setActiveProviderInfo] = useState(null); // ✅ for popups
  const [charge, setCharge] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA3FzKFHiA7bUcmOaubinG6wqCZt8Dw7Yk",
  });

  // ✅ Live tracking and Firestore sync
  useEffect(() => {
    let watchId;

    watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        console.log("📍 Live position:", { latitude, longitude, accuracy });

        if (accuracy < 100) {
          const newLocation = { lat: latitude, lng: longitude };
          setCurrentLocation(newLocation);

          if (auth.currentUser) {
            const providerRef = doc(db, "providers", auth.currentUser.uid);
            try {
              await setDoc(
                providerRef,
                {
                  lat: latitude,
                  lng: longitude,
                  lastUpdated: serverTimestamp(),
                },
                { merge: true }
              );
              console.log("✅ Firestore updated with live location.");
            } catch (err) {
              console.error("🔥 Firestore update failed:", err.message);
            }
          }
        } else {
          console.warn("⚠️ Low accuracy detected:", accuracy, "meters. Skipping update.");
        }
      },
      (error) => {
        console.warn("❌ Geolocation error:", error.message);
        setCurrentLocation(centerFallback);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // ✅ Calculate route to selected provider
  useEffect(() => {
    if (!selectedProvider || !currentLocation) return;

    async function getSnappedRoute() {
      const apiKey = "AIzaSyA3FzKFHiA7bUcmOaubinG6wqCZt8Dw7Yk";
      const snappedOrigin = await snapToRoad(currentLocation, apiKey);
      const snappedDestination = await snapToRoad(
        { lat: selectedProvider.lat, lng: selectedProvider.lng },
        apiKey
      );

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: snappedOrigin,
          destination: snappedDestination,
          travelMode: window.google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: false,
          drivingOptions: {
            departureTime: new Date(),
            trafficModel: "bestguess",
          },
          optimizeWaypoints: true,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
            const leg = result.routes[0].legs[0];
            const charge = calculateCharge(leg.distance.value, selectedProvider.service);
            console.log("📏 Distance:", leg.distance.text);
            console.log("⏱ Duration:", leg.duration.text);
            setCharge(charge);
          } else {
            console.error("❌ Directions request failed:", status);
          }
        }
      );
    }

    getSnappedRoute();
  }, [selectedProvider, currentLocation]);

  const handleMapClick = async (e) => {
    const latLng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    const apiKey = "AIzaSyA3FzKFHiA7bUcmOaubinG6wqCZt8Dw7Yk";
    const snappedLatLng = await snapToRoad(latLng, apiKey);
    onLocationSelect(snappedLatLng);
  };

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
    setActiveProviderInfo(provider); // ✅ open popup
  };

  if (!isLoaded || !currentLocation) return <p>Loading map...</p>;

  console.log("🛰️ Providers received by MapComponent:", providers);
  

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation}
      zoom={14}
      onClick={handleMapClick}
    >
      <Marker position={currentLocation} />

      {showProviders &&
        providers.map((provider) => (
          <Marker
            key={provider.id}
            position={{ lat: provider.lat, lng: provider.lng }}
            icon={{
              url: "/placeholder.svg",
              scaledSize: new window.google.maps.Size(30, 40),
            }}
            onClick={() => handleProviderClick(provider)}
          />
        ))}

      {activeProviderInfo && (
        <InfoWindow
          position={{ lat: activeProviderInfo.lat, lng: activeProviderInfo.lng }}
          onCloseClick={() => setActiveProviderInfo(null)}
        >
          <div className="p-2 text-sm">
            <strong>{activeProviderInfo.name}</strong>
            <br />
            {activeProviderInfo.service}
            <br />
            {activeProviderInfo.distance}
            <br />
            <span>Estimated Charge: {charge ? `${charge.toFixed(0)} PKR` : ''}</span>
          </div>
        </InfoWindow>
      )}

      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}

export default React.memo(MapComponent);
