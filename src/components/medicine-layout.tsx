import Image from "next/image";
import style from "./medicine-layout.module.css";

import bellIcon from "../../public/images/bellIcon.png";

export default function MedicineLayout({
    data,
}: {
    data:string
}) {

    return (
        <div className={style.medicineCon}>
            <Image id={style.medicineImg} src={bellIcon} alt="약 이미지" />
            <div className={style.medicineInfoCon}>
                <p id={style.tegInfo}>#두통</p>
                <span id={style.medicineName}>{data}</span>
                <p id={style.medicineInfo}>소화제, 상비약으로 구비해 두고 있을 시 어쩌구 저쩌구</p>
            </div>
        </div>
    )
}