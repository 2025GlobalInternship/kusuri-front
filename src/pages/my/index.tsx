import NavigationVarLayout from "@/components/navigation_var-layout";
import style from "./index.module.css";
import Image from "next/image";
import markIcon from "../../../public/images/markIcon.png";

import detailIcon from "../../../public/images/detailIcon.png";
import chevron from "../../../public/images/chevron-right.png";
import clockIcon from "../../../public/images/clockIcon.png";
import MedicineLayout from "@/components/medicine-layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const response = await axios.get(
            `http://localhost:80/kusuri-back/medicines/watched-medicine`,
            {
                headers: {
                    cookie: context.req.headers.cookie || '',
                },
                withCredentials: true,
            }
        );

        const data = response?.data?.data ?? [];
        return {
            props: { data },
        };
    } catch (error) {
        return {
            props: { data: [] },
        };
    }
};

export default function Page({ data }: { data: any[] }) {
    const router = useRouter();

    const userName = "빼코빼코";

    const imageList = [
        "/images/ch1.png",
        "/images/ch2.png",
        "/images/ch3.png",
        "/images/ch4.png",
        "/images/ch5.png",
        "/images/ch6.png",
    ];

    const onStroedClick = () => {
        router.push('/my/storedMedicine');
    }

    const onManageClick = () => {
        router.push('/my/management');
    }

    return (
        <div>
            <div className={style.userImfoContainer}>
                <Image src={imageList[0]} alt="프로필 이미지" width={50} height={50} />
                <p>{userName}님</p>
                <Image onClick={onManageClick} id={style.right_icon} src={detailIcon} alt="설정" />
            </div>
            <div className={style.storedMcon}>
                <Image src={markIcon} alt="북마크 아이콘"/>
                <p>내가 저장한 약</p>
                <Image onClick={onStroedClick} id={style.right_icon} src={chevron} alt="설정" />
            </div>
            <div className={style.recentCon}>
                <div className={style.recentTitleCon}>
                    <Image src={clockIcon} alt="북마크 아이콘"/>
                    <p>내가 최근 본 약</p>
                </div>
                <div className={style.obCon}>
                    {
                        data.slice(0, 3).map((a, idx) => {
                            return (
                                <MedicineLayout key={idx} data={a} />
                            )
                        })
                    }
                    
                </div>
            </div>
            <NavigationVarLayout/>
        </div>
    )
}