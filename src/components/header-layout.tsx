import style from "./header-layout.module.css";
import Image from "next/image";

import backIcon from "../../public/images/chevron-left.png";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function HeaderLayout({
    children,
}: {
    children : ReactNode
}) {
    const router = useRouter();

    const backBtnClick = () => {
        router.back();
    }

    return (
        <div className={style.container}>
            <div className={style.txtContainer}>
                <Image onClick={backBtnClick} src={backIcon} alt="뒤로가기" priority />
                <span id={style.title}>{children}</span>
            </div>
        </div>
    )
}