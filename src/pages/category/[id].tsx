import HeaderLayout from "@/components/header-layout";
import { useRouter } from "next/router";
import style from "./[id].module.css";
import MedicineLayout from "@/components/medicine-layout";

export default function Page() {
    const router = useRouter();

    const {id} = router.query;
    return (
        <>
            <HeaderLayout>{id}</HeaderLayout>

            <div className={style.mediCon}>
                <MedicineLayout data="123" />
                <MedicineLayout data="123" />
                <MedicineLayout data="123" />
            </div>
        </>
    )
}