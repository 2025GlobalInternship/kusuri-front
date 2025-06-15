import SearchLayout from "@/components/search-layout";
import NavigationVarLayout from "@/components/navigation_var-layout";
import ChatIconLayout from "@/components/chatIcon-layout";
import Image from "next/image";
import axios from "axios";

import kusuriLogo from "../../../public/images/kusuri-logo.png";
import bellIcon from "../../../public/images/alram_icon.png";
import medicineIcon from "../../../public/images/medicines_icon.png";
import xIcon from "../../../public/images/xIcon.png";

import markIcon from "../../../public/images/markIcon.png";
import alramIcon from "../../../public/images/alramIcon.png";
import clockIcon from "../../../public/images/clockIcon.png";


import style from "./index.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MedicineLayout from "@/components/medicine-layout";

export default function Page() {

    const router = useRouter();

    const alramBtnClick = () => {
        router.push('dayalram');
    }

    const recommendBtnClick = () => {
        router.push('category');
    };

    const storedClick = () => {
        router.push('/my/storedMedicine');
    }

    const alramClick = () => {
        router.push('/alram');
    }

    const recentClick = () => {
        router.push('/my');
    }

    const [medicine, setMedicine] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:80/kusuri-back/medicines/ranking')
        .then(response => {
            // console.log('약 리스트:', response.data);
            setMedicine(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        })
    }, []);


    if(loading) return <p>Loading</p>
    if(error) return <p>Error : {error}</p>

    return (
        <div className={style.container}>
            <div className={style.topCon}>
            <Image className={style.logo} src={kusuriLogo} alt="쿠스리로고" />
            <Image onClick={alramBtnClick} className={style.bellIcon} src={bellIcon} alt="알림" />
            </div>
            <div className={style.searchBar}>
                <SearchLayout text="">원하는 약을 검색해주세요.</SearchLayout>
            </div>

            <div className={style.recommendContainer}>
                <span id={style.recommendTxt}>내 증상에 맞는 약 추천 받기</span>
                <Image id={style.medicineIcon} src={medicineIcon} alt="약" />
                <button onClick={recommendBtnClick} id={style.recommendBtn}>바로 가기</button>
            </div>

            <div className={style.tagCon}>
                <div id={style.tag}>#두통</div>
                <div id={style.tag}>#알레르기</div>
                <div id={style.tag}>#불면증</div>
            </div>

            <div className={style.plusCon}>
                <div className={style.plusInfoCon} onClick={storedClick}>
                    <span id={style.plusTxt}>내가 저장한<br/>약 보기</span>
                    <Image id={style.plusImg} src={markIcon} alt="마크" />
                </div>
                <div className={style.plusInfoCon} onClick={alramClick}>
                    <span id={style.plusTxt}>오늘 나의 약<br/>알람 보기</span>
                    <Image id={style.plusImg} src={alramIcon} alt="마크" />
                </div>
                <div className={style.plusInfoCon} onClick={recentClick}>
                    <span id={style.plusTxt}>내가 최근 본<br/>약 보기</span>
                    <Image id={style.plusImg} src={clockIcon} alt="마크" />
                </div>
            </div>

            <div className={style.famousCon}>
                <span id={style.famousTitle}>많이 찾는 약 list</span>
                    {
                        medicine.slice(0, 3).map((medi, idx) => (
                            <div key={idx}>
                                <MedicineLayout data={medi} />
                            </div>
                        ))
                    }
            </div>
            <NavigationVarLayout />
        </div>
    )
}