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

    try {
        const response = await fetch(`http://localhost:80/kusuri-back/medicines/category?type=${id}`);
        const data = await response.json();

        return {
            props: {
                id,
                data,
            },
        };
    } catch (error) {
        return {
            props: {
                id,
                data: [],
            },
        };
    }
};
