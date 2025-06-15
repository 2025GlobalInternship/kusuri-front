"use client";

import { useState } from "react";
import NavigationVarLayout from "@/components/navigation_var-layout";
import NearbyPharmacyLayout from "@/components/nearbyPharmacy-layout";
import PharmacySearchLayout from "@/components/pharmacySearch-layout";
import GoogleMapComponent from "@/components/googleMap";
import style from "./index.module.css";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<{ name: string; length: number }[]>([]);

  const onClick = () => {
    const ele = document.querySelector(`.${style.dragCom}`);
    if (ele) {
      if (!ele.classList.contains(style.drag)) {
        ele.classList.remove(style.drag2);
        ele.classList.add(style.drag);
        ele.addEventListener(
          "animationend",
          () => {
            ele.classList.add(style.dragUp);
          },
          { once: true }
        );
      } else {
        ele.classList.remove(style.dragUp);
        ele.classList.remove(style.drag);
        ele.classList.add(style.drag2);
        ele.addEventListener(
          "animationend",
          () => {
            ele.classList.remove(style.drag2);
          },
          { once: true }
        );
      }
    }
  };

  const searchBarClick = () => {
    router.push('/pharmacySearch');
  }

  return (
    <div className={style.pharmacyCon}>
      <GoogleMapComponent onPharmaciesFound={setData} />
      <div id={style.searchCon} onClick={searchBarClick}>
        <PharmacySearchLayout text="" >완전 럭키비키잖아?</PharmacySearchLayout>
      </div>
      <div className={style.dragCom} onClick={onClick}>
        <NearbyPharmacyLayout locations={data} />
      </div>
      <NavigationVarLayout />
    </div>
  );
}
