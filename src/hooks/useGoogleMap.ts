"use client";

import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import style from "@/styles/MapMarker.module.css";

interface Pharmacy {
    name: string;
    length: number;
}

export const useGoogleMap = (
    mapRef: React.RefObject<HTMLDivElement>,
    onPharmaciesFound: (pharmacies: Pharmacy[]) => void
) => {
    const apiKey: string = process.env.NEXT_PUBLIC_MAPS_API_KEY || "";

    useEffect(() => {
        if (!apiKey || !mapRef.current) return;

    const initMap = async () => {
        const loader = new Loader({
            apiKey,
            version: "weekly",
            libraries: ["places", "marker", "geometry"],
        });

        await loader.load();

        const center = { lat: 37.5665, lng: 126.9780 };
        const map = new google.maps.Map(mapRef.current!, {
            center,
            zoom: 15,
            disableDefaultUI: true,
            mapId: "ef67e9db5416313b",
            styles: [
            { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
            { featureType: "transit.station", stylers: [{ visibility: "off" }] },
            ],
        });

        const infoWindow = new google.maps.InfoWindow();
        const placesService = new google.maps.places.PlacesService(map);
        const request: google.maps.places.PlaceSearchRequest = {
            location: center,
            radius: 2000,
            type: "pharmacy",
        };

        placesService.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const distances = results
            .filter(place => place.geometry?.location)
            .map(place => {
                const loc = place.geometry!.location!;
                const dist = google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng(center.lat, center.lng),
                loc
                );
                return {
                    name: place.name || "이름 없음",
                    length: +(dist / 1000).toFixed(1),
                    location: loc,
                };
            })
            .sort((a, b) => a.length - b.length)
            .slice(0, 5);

          distances.forEach(pharmacy => {
            const markerContent = document.createElement("div");
            markerContent.className = style.customMarker;
            markerContent.innerHTML = `
                <img id="${style.icon}" src="/images/pharmacyIcon2.png" alt="약국" />
                <div class="${style.title}">${pharmacy.name}</div>
                <div class="${style.distance}">${pharmacy.length}km</div>
            `;

            const marker = new google.maps.marker.AdvancedMarkerElement({
                map,
                position: pharmacy.location,
                content: markerContent,
            });

            marker.addListener("click", () => {
                infoWindow.setContent(`<div><strong>${pharmacy.name}</strong></div>`);
                infoWindow.open(map, marker);
            });
          });

          onPharmaciesFound(distances.map(p => ({ name: p.name, length: p.length })));
        } else {
            console.error("약국 검색 실패:", status);
        }
      });
    };

    initMap();
  }, [apiKey, mapRef, onPharmaciesFound]);
};
