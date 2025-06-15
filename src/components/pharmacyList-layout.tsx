"use client";

import { useRef, useState, useEffect } from "react";
import { useGoogleMap } from "@/hooks/useGoogleMap";
import style from "./pharmacyList-layout.module.css";
import PharmacyLayout from "./pharmacy-layout";

interface Location {
    name: string;
    length: number;
}

interface Props {
    filterText?: string;
}

export default function PharmacyList({ filterText }: Props) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [pharmacies, setPharmacies] = useState<Location[]>([]);
    const [filtered, setFiltered] = useState<Location[]>([]);

    useGoogleMap(mapRef, setPharmacies);

    useEffect(() => {
        if (!filterText) {
        setFiltered(pharmacies);
        } else {
        const lower = filterText.toLowerCase();
        setFiltered(pharmacies.filter((p) => p.name.toLowerCase().includes(lower)));
        }
    }, [pharmacies, filterText]);

    return (
        <div className={style.container}>
            <div ref={mapRef} className={style.map}></div>

            <div className={style.pharmacyListCon}>
                <p className={style.pharmacyListTitle}>주변 약국 추천</p>
                {filtered.length === 0 ? (
                    <p className={style.noResult}>일치하는 약국이 없습니다</p>
                ) : (
                    filtered.map((p, idx) => (
                    <div key={idx} className={style.pharmacyCon}>
                        <PharmacyLayout data={p} />
                    </div>
                    ))
                )}
            </div>
        </div>
    );
}
