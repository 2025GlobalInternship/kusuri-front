import HeaderLayout from "@/components/header-layout";
import style from "./[id].module.css";
import MedicineLayout from "@/components/medicine-layout";
import { GetServerSideProps } from "next";
import { mediProps } from "@/components/medicine-layout";

interface mediPropsName extends mediProps {
    name: string
}

export default function Page({ id, data }: { id: string; data: mediPropsName[] }) {
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
        const response = await fetch(`https://port-9000-kusuri-back-mbwh1ckxb2a8c087.sel4.cloudtype.app/medicines/category?type=${id}`);
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
