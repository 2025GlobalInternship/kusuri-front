"use client";
import NavigationVarLayout from "@/components/navigation_var-layout";
import style from "./index.module.css";
import Image from "next/image";
import markIcon from "../../../public/images/markIcon.png";
import detailIcon from "../../../public/images/detailIcon.png";
import chevron from "../../../public/images/chevron-right.png";
import clockIcon from "../../../public/images/clockIcon.png";
import MedicineLayout from "@/components/medicine-layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { mediProps } from "@/components/medicine-layout";

export default function Page() {
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

  const [data, setData] = useState<mediProps[]>([]);

  useEffect(() => {
    const fetchWatchedMedicines = async () => {
      try {
        const res = await fetch("/api/medicines/watched-medicine", {
          credentials: "include",
        });
        const json = await res.json();
        setData(json?.data ?? []);
      } catch (err) {
        console.error("최근 본 약 불러오기 실패:", err);
      }
    };

    fetchWatchedMedicines();
  }, []);

  const onStroedClick = () => {
    router.push("/my/storedMedicine");
  };

  const onManageClick = () => {
    router.push("/my/management");
  };

  return (
    <div>
      <div className={style.userImfoContainer}>
        <Image src={imageList[0]} alt="프로필 이미지" width={50} height={50} />
        <p>{userName}님</p>
        <Image
          onClick={onManageClick}
          id={style.right_icon}
          src={detailIcon}
          alt="설정"
        />
      </div>

      <div className={style.storedMcon}>
        <Image src={markIcon} alt="북마크 아이콘" />
        <p>내가 저장한 약</p>
        <Image
          onClick={onStroedClick}
          id={style.right_icon}
          src={chevron}
          alt="설정"
        />
      </div>

      <div className={style.recentCon}>
        <div className={style.recentTitleCon}>
          <Image src={clockIcon} alt="시계 아이콘" />
          <p>내가 최근 본 약</p>
        </div>
        <div className={style.obCon}>
          {data.slice(0, 3).map((a, idx) => (
            <MedicineLayout key={idx} data={a} />
          ))}
        </div>
      </div>

      <NavigationVarLayout />
    </div>
  );
}
