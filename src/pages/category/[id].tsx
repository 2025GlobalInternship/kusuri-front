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
                name: "123",
                tag: "123",
                detail: "어쩌구저쩌구"
            },
            {
                name: "456",
                tag: "123",
                detail: "어쩌구저쩌구"
            },
            {
                name: "789",
                tag: "123",
                detail: "어쩌구저쩌구"
            }
        ]
    );

    return (
        <div>
            <HeaderLayout>{id}</HeaderLayout>

            <div className={style.mediCon}>
                {
                    data.map((a) => {
                        return (
                            <MedicineLayout data={a} />
                        )
                    })
                }
            </div>
        </div>
    )
}