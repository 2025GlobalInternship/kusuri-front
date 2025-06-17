import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import SearchLayout from "@/components/search-layout";

import backIcon from "../../../public/images/chevron-left.png";
import markIcon from "../../../public/images/markIcon.png";
import markIcon2 from "../../../public/images/markIcon2.png";

import style from "./[id].module.css";

export default function Page() {
    const router = useRouter();
    const { id } = router.query;

    const [medicine, setMedicine] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [marked, setMarked] = useState<0 | 1>(0);

    useEffect(() => {
        if (!id) return;

        setLoading(true);

        const fetchMedicine = axios.get(
            `https://port-9000-kusuri-back-mbwh1ckxb2a8c087.sel4.cloudtype.app/medicines/medicine?med_id=${id}`,
            { withCredentials: true }
        );

        const fetchFavorite = axios.get(
            `https://port-9000-kusuri-back-mbwh1ckxb2a8c087.sel4.cloudtype.app/medicines/is-favorite-medicine?med_id=${id}`,
            { withCredentials: true }
        );

        Promise.all([fetchMedicine, fetchFavorite])
            .then(([res1, res2]) => {
                setMedicine(res1.data); // 정보
                setMarked(res2.data === true ? 0 : 1); // 북마크
            })
            .catch(err => {
                console.error('데이터 로딩 실패:', err);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const toggleBookmark = async () => {
        try {
            const response = await axios.post(
                `/api/medicines/favorite`,
                { med_id: id },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setMarked(prev => (prev === 0 ? 1 : 0));
        } catch (error) {
            console.error("북마크 처리 중 오류:", error);
        }
    };

    const backBtnClick = () => {
        router.back();
    };

    if (loading) return <div>로딩 중...</div>;
    if (!medicine) return <div>약 정보를 불러오지 못했습니다.</div>;

    const imgSrc = medicine.med_imgPath
    ? `https://port-9000-kusuri-back-mbwh1ckxb2a8c087.sel4.cloudtype.app/${medicine.med_imgPath}`
    : '/images/default-medicine.png';


    const categories = [
        medicine.cate_1,
        medicine.cate_2,
        medicine.cate_3,
        medicine.cate_4,
        medicine.cate_5,
    ].filter(Boolean);

    return (
        <div className={style.medicineCon}>
            <div className={style.searchBar}>
                <Image onClick={backBtnClick} id={style.backIcon} src={backIcon} alt="뒤로가기" priority />
                <div className={style.search}>
                    <SearchLayout text="">원하는 약을 검색해주세요</SearchLayout>
                </div>
            </div>
            <div className={style.titleCon}>
                <Image
                    id={style.markIcon}
                    src={marked === 0 ? markIcon : markIcon2}
                    alt="북마크"
                    priority
                    onClick={toggleBookmark}
                />
                <span id={style.mediName}>{medicine.med_name_kr}</span>
                <span id={style.mediJp}>({medicine.med_name_jp})</span>
                <Image
                    id={style.mediImg}
                    src={imgSrc}
                    alt="약 이미지"
                    width={150}
                    height={150}
                />
            </div>
            <div className={style.cateCon}>
                {categories.map((cate: string) => (
                    <span className={style.category} key={cate}>#{cate}</span>
                ))}
            </div>
            <div className={style.details}>
                <div className={style.detailCon}>
                    <span id={style.detailTitle}>{medicine.med_name_kr}</span>
                    <p id={style.detailTxt}>{medicine.med_explanation}</p>
                </div>
                <div className={style.detailCon}>
                    <span id={style.detailTitle}>이렇게 주문하세요.</span>
                    <p id={style.detailTxt}>{medicine.howToTake}</p>
                </div>
            </div>
            <div className={style.plusCon1}>
                <div className={style.plusCon2}>
                    <p id={style.plusTitle}>자주 묻는 질문</p>
                    <p id={style.plusTxt}>{medicine.question}</p>
                </div>
                <div className={style.plusCon2}>
                    <p id={style.plusTitle}>답변</p>
                    <p id={style.plusTxt}>{medicine.answer}</p>
                </div>
            </div>
        </div>
    );
}
