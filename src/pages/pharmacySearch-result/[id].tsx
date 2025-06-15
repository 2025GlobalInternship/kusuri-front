import { useRouter } from "next/router";
import PharmacySearchLayout from "@/components/pharmacySearch-layout";
import PharmacyList from "@/components/pharmacyList-layout";
import Image from "next/image";

import chevronLeft from "../../../public/images/chevron-left.png";
import style from "./[id].module.css";

export default function Page() {
    const router = useRouter();
    const { id } = router.query;

    const BackBtnClick = () => {
        router.push('/pharmacy');
    }

    const data = [
        {
            name: "1",
            length: 100
        },
        {
            name: "2",
            length: 200
        },
        {
            name: "3",
            length: 300
        },
        {
            name: "4",
            length: 400
        },
        {
            name: "5",
            length: 500
        },
    ];

    return (
        <div>
            <div id={style.headerCon}>
                    <Image src={chevronLeft} alt="" onClick={BackBtnClick} />
                    <div id={style.searchCon}>
                        <PharmacySearchLayout text={id}>원하는 약국을 검색해주세요</PharmacySearchLayout>
                    </div>
            </div>
            <PharmacyList filterText={id as string} />
        </div>
    )
} 