import Image from "next/image";
import style from "./medicine-layout.module.css";
import { useRouter } from "next/router";

interface mediProps {
    med_id: string;
    med_name_kr: string;
    med_imgPath: string;
    med_explanation: string;
    cate_1: string;
}

export default function MedicineLayout({
    data,
}: {
    data:mediProps
}) {

    const router = useRouter();

    const onClick = () => {
        router.push(`/medicine/${data.med_id}`);
    }

    return (
        <div className={style.medicineCon} onClick={onClick}>
            <Image
                id={style.medicineImg}
                src={`http://localhost:80/kusuri-back/${data.med_imgPath}`}
                alt="약 이미지"
                width={44.3}
                height={44.3} />
            <div className={style.medicineInfoCon}>
                <p id={style.tegInfo}>{data.cate_1}</p>
                <span id={style.medicineName}>{data.med_name_kr}</span>
                <p id={style.medicineInfo}>{data.med_explanation}</p>
            </div>
        </div>
    )
}