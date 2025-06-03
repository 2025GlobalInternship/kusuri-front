import Image from "next/image";
import pharmacyIcon from "../../public/images/pharmacyIcon.png";

import style from "./pharmacy-layout.module.css";

interface Location {
    name: string;
    length: number;
}

export default function PharmacyLayout({
    data
}: {
    data: Location
}) {
    const { name, length } = data;

    return(
        <div id={style.pharmacyLCon}>
            <Image id={style.pharmacyIcon} src={pharmacyIcon} alt="약국"/>
            <span id={style.pharmacyTxt}>{name}</span>
            <span id={style.pharmacyKm}>약 {length}km</span>
        </div>
    )
}