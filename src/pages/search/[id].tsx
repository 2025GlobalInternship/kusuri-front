import SearchLayout from "@/components/search-layout"; 
import MedicineLayout from "@/components/medicine-layout";
import Image from "next/image";
import backIcon from "../../../public/images/chevron-left.png";

import style from "./[id].module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
    const router = useRouter();
    const { id } = router.query;

    const backBtnClick = () => {
        router.push('/main');
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        if (!id) return;

        axios.get(`https://port-9000-kusuri-back-mbwh1ckxb2a8c087.sel4.cloudtype.app/medicines/search?name=${id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("데이터 불러오기 실패:", error);
                setData([]);  // 에러 시 빈 배열로 초기화
            });
    }, [id]);

    return (
        <div>
            <div className={style.searchBar}>   
                <Image onClick={backBtnClick} src={backIcon} alt="뒤로가기" />
                <div id={style.search}>
                    <SearchLayout text={typeof id === "string" ? id : ""}>원하는 약을 검색해주세요</SearchLayout>
                </div>
            </div>

            <div className={style.mediCon}>
                {data.length > 0 ? (
                    <div className={style.mediCon}>
                        {data.map((medi, idx) => (
                            <div key={idx}>
                                <MedicineLayout data={medi} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>검색 결과가 없습니다</div>
                )}
            </div>
        </div>
    )
}
