import HeaderLayout from "@/components/header-layout";
import style from "./storedMedicine.module.css";
import Image from "next/image";

import markIcon from "../../../public/images/markIcon.png";
import { useState } from "react";
import MedicineLayout from "@/components/medicine-layout";

export default function Page() {

    let [data, setData] = useState(
            [
                {
                    name: "약1",
                    tag: "감기",
                    detail: "어쩌구저쩌구"
                },
                {
                    name: "약2",
                    tag: "멀미미",
                    detail: "어쩌구저쩌구"
                },
                {
                    name: "약3",
                    tag: "알레르기",
                    detail: "어쩌구저쩌구"
                },
                {
                    name: "약4",
                    tag: "멀미미",
                    detail: "어쩌구저쩌구"
                },
                {
                    name: "약5",
                    tag: "알레르기",
                    detail: "어쩌구저쩌구"
                }
            ]
        );

    return (
        <div>
            <HeaderLayout>저장한 약</HeaderLayout>
            <div className={style.storedMcon}>
                <div className={style.storedTitlecon}>
                    <Image src={markIcon} alt="북마크 아이콘"/>
                    <p>내가 저장한 약</p>
                </div>
                {
                   data.map((a) => {
                        return (
                            <MedicineLayout data={a} />
                        )
                   })
                }
            </div>
        </div>
    )
}