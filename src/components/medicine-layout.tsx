import Image from "next/image";
import style from "./medicine-layout.module.css";

import bellIcon from "../../public/images/alramIcon.png";
import { useRouter } from "next/router";

export default function MedicineLayout({
    data,
}: {
    data:any
}) {
    const router = useRouter();

    const onClick = () => {
        router.push(`/medicine/${data.name}`);
    }

    return (
        <div className={style.medicineCon} onClick={onClick}>
            <Image id={style.medicineImg} src={bellIcon} alt="약 이미지" />
            <div className={style.medicineInfoCon}>
                <p id={style.tegInfo}>{data.tag}</p>
                <span id={style.medicineName}>{data.name}</span>
                <p id={style.medicineInfo}>{data.detail}</p>
            </div>
        </div>
    )
}