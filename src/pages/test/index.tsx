'use client';

import { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_MAPS_API_KEY: string = process.env.NEXT_PUBLIC_MAPS_API_KEY!;

if (!GOOGLE_MAPS_API_KEY) {
  throw new Error('NEXT_PUBLIC_MAPS_API_KEY is not defined in the environment variables.');
}

type Location = {
  lat: number;
  lng: number;
};

type Pharmacy = {
  place_id: string;
  name: string;
  geometry: {
    location: google.maps.LatLng;
  };
};

export default function PharmacyLocator(): JSX.Element {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error: GeolocationPositionError) => console.error('Error getting location:', error)
      );
    }
  }, []);

  useEffect(() => {
    if (location) {
      const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY, libraries: ['places'] });
      loader.load().then(() => {
        const mapInstance = new google.maps.Map(document.getElementById('map') as HTMLElement, {
          center: location,
          zoom: 15,
        });
        setMap(mapInstance);

        const service = new google.maps.places.PlacesService(mapInstance);
        service.nearbySearch(
          {
            location,
            radius: 1000,
            type: 'pharmacy',
          },
          (results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
              setPharmacies(results as Pharmacy[]);
              results.forEach((place) => {
                new google.maps.Marker({
                  position: place.geometry!.location,
                  map: mapInstance,
                  title: place.name,
                });
              });
            }
          }
        );
      });
    }
  }, [location]);

  return (
    <div>
      <h1>주변 약국 찾기</h1>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
      <ul>
        {pharmacies.map((pharmacy) => (
          <li key={pharmacy.place_id}>{pharmacy.name}</li>
        ))}
      </ul>
    </div>
  );
}
