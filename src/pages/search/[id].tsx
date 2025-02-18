import SearchLayout from "@/components/search-layout";
import MedicineLayout from "@/components/medicine-layout";
import Image from "next/image";
import backIcon from "../../../public/images/chevron-left.png";

import style from "./[id].module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
    const router = useRouter();
    const { id } = router.query;

    const backBtnClick = () => {
        router.push('/main');
    }

    return (
        <div>
            <div className={style.searchBar}>   
                <Image onClick={backBtnClick} src={backIcon} alt="뒤로가기" />
                <div id={style.search}>
                    <SearchLayout text={id}>원하는 약을 검색해주세요</SearchLayout>
                </div>
            </div>

            <div className={style.mediCon}>
                <MedicineLayout data="데이터" />
                <MedicineLayout data="데이터" />
                <MedicineLayout data="데이터" />
            </div>
        </div>
    )
}