import SearchLayout from "@/components/search-layout"; //불러오기
import NavigationVarLayout from "@/components/navigation_var-layout";
import ChatIconLayout from "@/components/chatIcon-layout";
import Image from "next/image";

import kusuriLogo from "../../../public/images/kusuri-logo.png";
import bellIcon from "../../../public/images/bellIcon.png";
import medicineIcon from "../../../public/images/medicines_icon.png";
import xIcon from "../../../public/images/xIcon.png";

import style from "./index.module.css";


export default function Page() {
    return (
        <div className={style.container}>
            <div className={style.topCon}>
            <Image className={style.logo} src={kusuriLogo} alt="쿠스리로고" />
            <Image className={style.bellIcon} src={bellIcon} alt="알림" />
            </div>
            <SearchLayout></SearchLayout>

            <div className={style.recommendContainer}>
                <div className={style.txtContainer}>
                    <span id={style.recommendTxt}>내 증상에 맞는 약 추천 받기</span>
                    <Image id={style.xIcon} src={xIcon} alt="x" />
                </div>
                <Image id={style.medicineIcon} src={medicineIcon} alt="약" />
                <button id={style.recommendBtn}>바로 가기</button>
            </div>

            <div className={style.plusCon}>
                <div className={style.firstCon}></div>
                <div className={style.secondCon}></div>
            </div>

            <div className={style.famousCon}>
                <span id={style.famousTitle}>많이 찾는 약 list</span>
                <div className={style.medicineCon}>
                    <Image id={style.medicineImg} src={bellIcon} alt="약 이미지" />
                    <div className={style.medicineInfoCon}>
                        <span id={style.medicineName}>오타이산</span>
                        <p id={style.medicineInfo}>소화제, 상비약으로 구비해 두고 있을 시 어쩌구 저쩌구</p>
                    </div>
                </div>
                <div className={style.medicineCon}>
                    <Image id={style.medicineImg} src={bellIcon} alt="약 이미지" />
                    <div className={style.medicineInfoCon}>
                        <span id={style.medicineName}>오타이산</span>
                        <p id={style.medicineInfo}>소화제, 상비약으로 구비해 두고 있을 시 어쩌구 저쩌구</p>
                    </div>
                </div>
                <div className={style.medicineCon}>
                    <Image id={style.medicineImg} src={bellIcon} alt="약 이미지" />
                    <div className={style.medicineInfoCon}>
                        <span id={style.medicineName}>오타이산</span>
                        <p id={style.medicineInfo}>소화제, 상비약으로 구비해 두고 있을 시 어쩌구 저쩌구</p>
                    </div>
                </div>
            </div>

            <ChatIconLayout />

            <NavigationVarLayout />
        </div>
    )
}