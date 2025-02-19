import NavigationVarLayout from "@/components/navigation_var-layout";
import NearbyPharmacyLayout from "@/components/nearbyPharmacy-layout";
import SearchLayout from "@/components/search-layout";
import GoogleMapComponent from "@/components/googleMap";

import style from "./index.module.css";
import Draggable from "react-draggable";
import { tree } from "next/dist/build/templates/app-page";

export default function Page() {

    const onClick = () => {
        const ele = document.querySelector(`.${style.dragCom}`);
        console.log(ele);

        if(ele) {
            if(!ele.classList.contains(style.drag)) {
                ele.classList.remove(style.drag2);
                ele.classList.add(style.drag);

                ele.addEventListener("animationend", () => {
                    // ele.classList.remove(style.dragUp);
                    ele.classList.add(style.dragUp);
                }, { once: true });
            }
            else {
                ele.classList.remove(style.dragUp);
                ele.classList.remove(style.drag);
                ele.classList.add(style.drag2);

                ele.addEventListener("animationend", () => {
                    ele.classList.remove(style.drag2);
                }, { once: true });
            }
        }
    };

    return (
        <div className={style.pharmacyCon}>
            <GoogleMapComponent></GoogleMapComponent>
            <div id={style.searchCon}>
                <SearchLayout text="">완전 럭키비키잖아?</SearchLayout>
            </div>
            <div className={style.dragCom} onClick={onClick}>
                <NearbyPharmacyLayout />
            </div>
            <NavigationVarLayout />
        </div>
    )
}