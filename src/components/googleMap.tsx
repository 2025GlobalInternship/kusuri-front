"use client";

import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import style from "./googleMap.module.css";

const GoogleMapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

  useEffect(() => {
    if (!apiKey || !mapRef.current) {
      console.error("🚨 Google Maps API 키가 없거나, mapRef가 설정되지 않았습니다.");
      return;
    }

    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey,
          version: "weekly",
        });

        await loader.load();

        const position = { lat: 37.5665, lng: 126.9780 };
        const mapOptions: google.maps.MapOptions = {
          center: position,
          zoom: 17,
          mapId: "ef67e9db5416313b",
        };

        // google.maps.Map 생성 후 IntersectionObserver 관련 로직이 있다면,
        // 해당 로직이 mapRef.current가 제대로 설정된 상태에서만 실행되도록 해야 함
        const map = new window.google.maps.Map(mapRef.current as HTMLElement, mapOptions);

        // 필요한 경우, IntersectionObserver 관련 코드 추가시 mapRef.current 확인
        if (mapRef.current) {
          const observer = new IntersectionObserver((entries) => {
            // 여기에 intersection observer 로직
          });
          observer.observe(mapRef.current); // mapRef.current가 null이 아닌지 항상 확인
        }

      } catch (error) {
        console.error("🚨 지도 로딩 중 오류 발생:", error);
      }
    };

    initMap();
  }, [apiKey]);

  return <div className={style.mapCon} ref={mapRef}></div>;
};

export default GoogleMapComponent;
