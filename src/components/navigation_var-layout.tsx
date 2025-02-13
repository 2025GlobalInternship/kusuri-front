import Router, { useRouter } from "next/router";
import Image from "next/image";
import homeIcon from "../../public/images/home_icon.png";
import arlamIcon from "../../public/images/alram_icon.png";
import hospitalIcon from "../../public/images/hospital_icon.png";
import myIcon from "../../public/images/my_icon.png";
import chosenHomeIcon from "../../public/images/chosen_home.png";
import chosenArlamIcon from "../../public/images/chosen_alram.png";
import chosenHospitalIcon from "../../public/images/chosen_hospital.png";
import chosenMyIcon from "../../public/images/chosen_my.png";
import style from "./navigation_var-layout.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavigationVarLayout() {
    const router = useRouter();
    const pathname = usePathname(); // 현재 결로 가져오기

    useEffect(()=>{
        console.log(pathname);
    }, [pathname]);
    
    const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const img = e.currentTarget.querySelector('img');
        if(img) router.push(`/${img.alt}`);
    };

    return (
        <div className={style.container}>
            <div className={style.pageChoose} onClick={onClick}>
                <Image
                    id={style.naviImg}
                    src={pathname === "/main" ? chosenHomeIcon : homeIcon}
                    alt="main"
                />
                <p id={pathname === "/main" ? style.activeTxt : style.naviTxt}>홈</p>
            </div>
            <div className={style.pageChoose} onClick={onClick}>
                <Image
                    id={style.naviImg}
                    src={pathname === "/alram" ? chosenArlamIcon : arlamIcon}
                    alt="alram"
                />
                <p id={pathname === "/alram" ? style.activeTxt : style.naviTxt}>알람</p>
            </div>
            <div className={style.pageChoose} onClick={onClick}>
                <Image
                    id={style.naviImg}
                    src={pathname === "/pharmacy" ? chosenHospitalIcon : hospitalIcon}
                    alt="pharmacy"
                />
                <p id={pathname === "/pharmacy" ? style.activeTxt : style.naviTxt}>약국</p>
            </div>
            <div className={style.pageChoose} onClick={onClick}>
                <Image
                    id={style.naviImg}
                    src={pathname === "/my" ? chosenMyIcon : myIcon}
                    alt="my"
                />
                <p id={pathname === "/my" ? style.activeTxt : style.naviTxt}>마이페이지</p>
            </div>
        </div>
    )
}