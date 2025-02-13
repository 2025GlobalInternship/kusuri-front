import SearchLayout from "@/components/search-layout"; //불러오기
import NavigationVarLayout from "@/components/navigation_var-layout";
import Image from "next/image";
import kusuriLogo from "../../../public/images/kusuri-logo.png";
import medicineIcon from "../../../public/images/medicines_icon.png";
import xIcon from "../../../public/images/xIcon.png";
import style from "./index.module.css";


export default function Page() {
    return (
        <>
            <Image className={style.logo} src={kusuriLogo} alt="쿠스리로고" />
            <SearchLayout></SearchLayout>

            <div className={style.recommendContainer}>
                <div className={style.txtContainer}>
                    <span id={style.recommendTxt}>내 증상에 맞는 약 추천 받기</span>
                    <Image id={style.xIcon} src={xIcon} alt="x" />
                </div>
                <Image id={style.medicineIcon} src={medicineIcon} alt="약" />
                <button id={style.recommendBtn}>바로 가기</button>
            </div>

            <div className={style.container}>
                <div className={style.container}></div>
                <div className={style.container}></div>
            </div>

            <NavigationVarLayout/>
        </>
    )
}