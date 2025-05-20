"use client";

import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import style from "./googleMap.module.css";

const GoogleMapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const apiKey: string = process.env.NEXT_PUBLIC_MAPS_API_KEY || "";

  useEffect(() => {
    if (!apiKey) {
      console.error("🚨 Google Maps API 키가 없습니다.");
      return;
    }
    if (!mapRef.current) {
      console.error("🚨 mapRef가 설정되지 않았습니다.");
      return;
    }

    const initMap = async (): Promise<void> => {
      try {
        const loader = new Loader({
          apiKey,
          version: "weekly",
          libraries: ["places", "marker"],
        });
        await loader.load();

        const center: google.maps.LatLngLiteral = { lat: 37.5665, lng: 126.9780 };

        // 지도 스타일: 기본 POI(정보 마커) 숨기기
        const mapOptions: google.maps.MapOptions = {
          center,
          zoom: 15,
          mapId: "ef67e9db5416313b",
          disableDefaultUI: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit.station",
              stylers: [{ visibility: "off" }],
            },
          ],
        };

        const map = new google.maps.Map(mapRef.current!, mapOptions);

        const placesService = new google.maps.places.PlacesService(map);

        const request: google.maps.places.PlaceSearchRequest = {
          location: center,
          radius: 2000,
          type: "pharmacy",
        };

        // 정보창 생성 (한 개만 재사용)
        const infoWindow = new google.maps.InfoWindow();

        placesService.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            results.forEach((place) => {
              if (!place.geometry || !place.geometry.location) return;

              const marker = new google.maps.marker.AdvancedMarkerElement({
                map,
                position: place.geometry.location,
                title: place.name,
              });

              // 마커 클릭 시 정보창 열기
              marker.addListener("click", () => {
                infoWindow.setContent(`<div><strong>${place.name}</strong><br/>${place.vicinity || ""}</div>`);
                infoWindow.open(map, marker);
              });
            });
          } else {
            console.error("약국 검색 실패:", status);
          }
        });
      } catch (error) {
        console.error("지도 초기화 중 오류 발생:", error);
      }
    };

    initMap();
  }, [apiKey]);

  return <div className={style.mapCon} ref={mapRef}></div>;
};

export default GoogleMapComponent;
