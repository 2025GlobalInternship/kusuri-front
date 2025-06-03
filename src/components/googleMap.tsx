"use client";

import React, { useRef } from "react";
import { useGoogleMap } from "../hooks/useGoogleMap";
import style from "./googleMap.module.css";

interface Props {
  onPharmaciesFound: (pharmacies: { name: string; length: number }[]) => void;
}

const GoogleMapComponent: React.FC<Props> = ({ onPharmaciesFound }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useGoogleMap(mapRef, onPharmaciesFound);

  return <div className={style.mapCon} ref={mapRef}></div>;
};

export default GoogleMapComponent;
