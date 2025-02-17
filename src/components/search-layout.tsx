import style from "./search-layout.module.css";
import Image from "next/image";
import searchIcon from "../../public/images/searchIcon.png";
import { ReactNode } from "react";

export default function SearchLayout({
    children,
}: {
    children: string;
}) {
    return (
        <form className={style.container}>
            <input id={style.searchTxt} type="text" placeholder={children} />
            <Image id={style.searchIcon} src={searchIcon} alt="검색" />
        </form>
    )
}