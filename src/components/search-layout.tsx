import style from "./search-layout.module.css";
import Image from "next/image";
import searchIcon from "../../public/images/searchIcon.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SearchLayout({
    children,
    text
}: {
    children: string;
    text: any;
}) {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const q = router.query.q as string;

    useEffect(() => {
        if(text) console.log(text);
        setSearch(q || "");
    }, [q]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const onSubmit = () => {
        // console.log(q);
        if(!search || q === search) return; // search 값이 없을 때 리턴
        router.push(`/search/${search}`);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // console.log(e.key);
        if(e.key === "Enter") {
            onSubmit();
        }
    }

    return (
        <form className={style.container} onSubmit={onSubmit}>
            <input id={style.searchTxt} type="text" placeholder={children} onKeyDown={onKeyDown} onChange={onChange} />
            <Image id={style.searchIcon} src={searchIcon} alt="검색" onClick={onSubmit} />
        </form>
    )
}