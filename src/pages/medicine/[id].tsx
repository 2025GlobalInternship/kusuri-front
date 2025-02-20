import { useRouter } from "next/router";
import Image from "next/image";
import SearchLayout from "@/components/search-layout";

import backIcon from "../../../public/images/chevron-left.png";
import markIcon from "../../../public/images/markIcon.png";
import img from "../../../public/images/ch2.png";

import style from "./[id].module.css";

export default function Page() {
    const router = useRouter();

    const { id } = router.query;
    const jp = "일본어입니당"

    const category = ["두통", "치통", "생리통"];

    const backBtnClick = () => {
        router.back();
    }

    return (
        <div className={style.medicineCon}>
            <div className={style.searchBar}>
                <Image onClick={backBtnClick} id={style.backIcon} src={backIcon} alt="뒤로가기" priority />
                <div className={style.search}>
                    <SearchLayout text="">원하는 약을 검색해주세요</SearchLayout>
                </div>
            </div>
            <div className={style.titleCon}>
                <Image id={style.markIcon} src={markIcon} alt="북마크" priority />
                <span id={style.mediName}>{id}</span>
                <span id={style.mediJp}>({jp})</span>
                <Image id={style.mediImg} src={img} alt="이미지" priority />
            </div>
            <div className={style.cateCon}>
                {
                    category.map((cate) => {
                        return (
                            <span className={style.category} key={cate}>
                                #{cate}
                            </span>
                        )
                    })
                }
            </div>
            <div className={style.details}>
                <div className={style.detailCon}>
                    <span id={style.detailTitle}>
                        { id }
                    </span>
                    <p id={style.detailTxt}>
                        이브 쓰리 샷 프리미엄은 .... ...... ..... .............. ................................ .....
                    </p>
                </div>
                <div className={style.detailCon}>
                    <span id={style.detailTitle}>
                        이렇게 주문하세요.
                    </span>
                    <p id={style.detailTxt}>
                        두통이이 ...... ............sdfsdffff ffaedsdf ssdfsfdeggdfsfefs.
                    </p>
                    <p id={style.detailJp}>
                        일본어일본어어
                    </p>
                </div>
            </div>
            <div className={style.plusCon1}>
                <div className={style.plusCon2}>
                    <p id={style.plusTitle}>자주 묻는 질문</p>
                    <p id={style.plusTxt}>
                        이 약은 어떤 통증에 효과가 있나여?
                    </p>
                </div>
                <div className={style.plusCon2}>
                    <p id={style.plusTitle}>약 복용법</p>
                    <p id={style.plusTxt}>
                        많이 먹으세여 ..... ....어쩌구 저쩌구
                    </p>
                </div>
            </div>
        </div>
    )
}