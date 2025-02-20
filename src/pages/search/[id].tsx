import SearchLayout from "@/components/search-layout";
import MedicineLayout from "@/components/medicine-layout";
import Image from "next/image";
import backIcon from "../../../public/images/chevron-left.png";

import style from "./[id].module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    const { id } = router.query;

    const backBtnClick = () => {
        router.push('/main');
    }

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
            }
        ]
    );

    return (
        <div>
            <div className={style.searchBar}>   
                <Image onClick={backBtnClick} src={backIcon} alt="뒤로가기" />
                <div id={style.search}>
                    <SearchLayout text={id}>원하는 약을 검색해주세요</SearchLayout>
                </div>
            </div>

            <div className={style.mediCon}>
                {
                    data.map((a) => {
                        return (
                            <div key={a.name}>
                                <MedicineLayout data={a} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}