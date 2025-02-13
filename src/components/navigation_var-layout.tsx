import Router, { useRouter } from "next/router";
import Image from "next/image";
import homeIcon from "../../public/images/home_icon.png";
import arlamIcon from "../../public/images/alram_icon.png";
import hospitalIcon from "../../public/images/hospital_icon.png";
import myIcon from "../../public/images/my_icon.png";
import style from "./navigation_var-layout.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavigationVarLayout() {
    const router = useRouter();
    const pathname = usePathname(); // 활성화 된 링크 찾기

    useEffect(()=>{
        console.log(pathname);
    }, []);
    
    const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const img = e.currentTarget.querySelector('img');
        if(img) router.push(`/${img.alt}`);
    };

    return (
        <div className={style.container}>
            <div className={style.pageChoose} onClick={onClick}>
                <Image id={style.naviImg} src={homeIcon} alt="main" />
                <p id={style.naviTxt}>홈</p>
            </div>
            <div className={style.pageChoose} onClick={onClick}>
                <Image id={style.naviImg} src={arlamIcon} alt="alram" />
                <p id={style.naviTxt}>알람</p>
            </div>
            <div className={style.pageChoose} onClick={onClick}>
                <Image id={style.naviImg} src={hospitalIcon} alt="pharmacy" />
                <p id={style.naviTxt}>약국</p>
            </div>
            <div className={style.pageChoose} onClick={onClick}>
                <Image id={style.naviImg} src={myIcon} alt="my" />
                <p id={style.naviTxt}>마이페이지</p>
            </div>
        </div>
    )
}