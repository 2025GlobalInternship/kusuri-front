import style from "./nearbyPharmacy-layout.module.css";
import Image from "next/image";
import pharmacyIcon from "../../public/images/pharmacyIcon.png";

export default function NearbyPharmacyLayout() {
    const km = 287;
    return (
        <div className={style.nearCon}>
            <div id={style.nearConLine}/>
            <div className={style.pharmacyCon}>
                <Image id={style.pharmacyIcon} src={pharmacyIcon} alt="약국"/>
                <span id={style.pharmacyTxt}>내 주변 약국</span>
                <span id={style.pharmacyKm}>약 {km}km</span>
            </div>
            <div className={style.pharmacyCon}>
                <Image id={style.pharmacyIcon} src={pharmacyIcon} alt="약국"/>
                <span id={style.pharmacyTxt}>내 주변 약국</span>
                <span id={style.pharmacyKm}>약 {km}km</span>
            </div>
            <div className={style.pharmacyCon}>
                <Image id={style.pharmacyIcon} src={pharmacyIcon} alt="약국"/>
                <span id={style.pharmacyTxt}>내 주변 약국</span>
                <span id={style.pharmacyKm}>약 {km}km</span>
            </div>
            <div className={style.pharmacyCon}>
                <Image id={style.pharmacyIcon} src={pharmacyIcon} alt="약국"/>
                <span id={style.pharmacyTxt}>내 주변 약국</span>
                <span id={style.pharmacyKm}>약 {km}km</span>
            </div>
            <div className={style.pharmacyCon}>
                <Image id={style.pharmacyIcon} src={pharmacyIcon} alt="약국"/>
                <span id={style.pharmacyTxt}>내 주변 약국</span>
                <span id={style.pharmacyKm}>약 {km}km</span>
            </div>
        </div>
    )
}