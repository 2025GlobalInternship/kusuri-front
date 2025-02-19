import { useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import style from "./googleMap.module.css";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 37.5665, // 서울 위도
  lng: 126.9780, // 서울 경도
};

const GoogleMapComponent = () => {
  const mapRef = useRef<google.maps.Map | null>(null); // 🛠️ 타입 명시

  return (
    <div className={style.mapCon}>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={(map) => {
            mapRef.current = map;
            console.log("지도 로드됨:", mapRef.current);
          }}
        />
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
