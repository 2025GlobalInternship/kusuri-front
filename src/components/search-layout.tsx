import style from "./search-layout.module.css";
import Image from "next/image";
import searchIcon from "../../public/images/searchIcon.png";

export default function SearchLayout() {
    return (
        <div className={style.container}>
            <input id={style.searchTxt} type="text" />
            <Image id={style.searchIcon} src={searchIcon} alt="검색" />
        </div>
    )
}