import Image from "next/image";
import HeaderLayout from "@/components/header-layout";
import icon from "../../../public/images/chevron-right.png";

import style from "./magagement.module.css";

export default function Page() {
    

    return (
        <div>
            <HeaderLayout>계정 관리</HeaderLayout>
            <div className={style.managementBox}>
                <div className={style.managementEleBox}>
                <div className={style.correctionMoveCon}>
                    정보 수정
                    <Image className={style.correntionMoveIcon} src={icon} alt="수정" />
                </div >
                <div className={style.logOutCon}>로그아웃</div>
                </div>
            </div>
        </div>
    )
}