"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import HeaderLayout from "@/components/header-layout";
import icon from "../../../public/images/chevron-right.png";

import style from "./magagement.module.css";

export default function Page() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                router.push("/login");
            } else {
                alert("로그아웃에 실패했습니다.");
            }
        } catch (error) {
            console.error("로그아웃 오류:", error);
            alert("오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <HeaderLayout>계정 관리</HeaderLayout>
            <div className={style.managementBox}>
                <div className={style.managementEleBox}>
                    <div className={style.correctionMoveCon}>
                        정보 수정
                        <Image className={style.correntionMoveIcon} src={icon} alt="수정" />
                    </div>
                    <div className={style.logOutCon} onClick={handleLogout}>
                        로그아웃
                    </div>
                </div>
            </div>
        </div>
    );
}
