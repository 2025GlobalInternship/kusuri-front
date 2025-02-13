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
                    <p>내 증상에 맞는 약 추천 받기</p>
                    <Image src={xIcon} alt="x" />
                </div>
                <Image src={medicineIcon} alt="약" />
            </div>

            <NavigationVarLayout/>
        </>
    )
}