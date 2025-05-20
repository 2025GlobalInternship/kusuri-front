import HeaderLayout from "@/components/header-layout";
import style from "./[id].module.css";
import MedicineLayout from "@/components/medicine-layout";
import { GetServerSideProps } from "next";

export default function Page({ id, data }: { id: string; data: any[] }) {
    return (
        <div key={"cate" + id}>
            <HeaderLayout>{id}</HeaderLayout>

            <div className={style.mediCon}>
                {data.map((a) => (
                    <div key={a.name}>
                        <MedicineLayout data={a} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };

    // 추후 fetch로 대체 예정
    const data = [
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
    ];

    return {
        props: {
            id,
            data,
        },
    };
};
