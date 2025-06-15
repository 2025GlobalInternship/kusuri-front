import HeaderLayout from "@/components/header-layout";
import style from "./storedMedicine.module.css";
import Image from "next/image";

import markIcon from "../../../public/images/markIcon.png";
import { useEffect, useState } from "react";
import MedicineLayout from "@/components/medicine-layout";
import axios from "axios";

export default function Page() {

    const [data, setData] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:80/kusuri-back/medicines/my-favorite-medicine`, {
            withCredentials: true
        })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("데이터 불러오기 실패:", error);
                setData([]);
            });
    }, []);

    return (
        <div>
            <HeaderLayout>저장한 약</HeaderLayout>
            <div className={style.storedMcon}>
                <div className={style.storedTitlecon}>
                    <Image src={markIcon} alt="북마크 아이콘"/>
                    <p>내가 저장한 약</p>
                </div>
                {data.length > 0 ? (
                    <div className={style.mediCon}>
                        {data.map((medi, idx) => (
                            <div key={idx}>
                                <MedicineLayout data={medi} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>저장된 약이 없습니다</div>
                )}
            </div>
        </div>
    )
}