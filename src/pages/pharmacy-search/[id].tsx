import { useRouter } from "next/router";
import PharmacySearchLayout from "@/components/pharmacySearch-layout";
import PharmacyLayout from "@/components/pharmacy-layout";
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
                    <PharmacySearchLayout text={id}>null</PharmacySearchLayout>
                </div>
                <div>
                    <p>주변 약국 추천</p>
                    {
                        data.map((a) => {
                            return (
                                <PharmacyLayout data={a}></PharmacyLayout>
                            )
                        })
                    }
                </div>
            </div>
            
        </div>
    )
} 