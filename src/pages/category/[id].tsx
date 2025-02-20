import HeaderLayout from "@/components/header-layout";
import { useRouter } from "next/router";
import style from "./[id].module.css";
import MedicineLayout from "@/components/medicine-layout";
import { useState } from "react";

export default function Page() {
    const router = useRouter();

    const {id} = router.query;
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
        <div key={"cate"+id}>
            <HeaderLayout>{id}</HeaderLayout>

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