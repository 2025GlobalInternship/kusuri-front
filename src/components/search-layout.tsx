import style from "./search-layout.module.css";
import Image from "next/image";
import searchIcon from "../../public/images/searchIcon.png";

export default function SearchLayout() {
    return (
        <form className={style.container}>
            <input id={style.searchTxt} type="text" placeholder="원하는 약을 검색해주세요" />
            <Image id={style.searchIcon} src={searchIcon} alt="검색" />
        </form>
    )
}