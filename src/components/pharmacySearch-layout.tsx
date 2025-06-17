import style from "./search-layout.module.css";
import Image from "next/image";
import searchIcon from "../../public/images/searchIcon.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function PharmacySearchLayout({
    children,
    text
}: {
    children: string;
    text: string;
}) {
    const router = useRouter();
    const [search, setSearch] = useState(text || "");

    const q = router.query.q as string;

    useEffect(() => {
        if(q !== undefined) setSearch(q);
    }, [q]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const pageChange = () => {
        if(!search || q === search) return;
        router.push(`/pharmacySearch-result/${search}`);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();
        // console.log(q);
        pageChange();
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // console.log(e.key);
        if(e.key === "Enter") {
            pageChange();
        }
    }

    return (
        <form className={style.container} onSubmit={onSubmit}>
            <input value={search} id={style.searchTxt} type="text" placeholder={children} onKeyDown={onKeyDown} onChange={onChange} />
            <Image id={style.searchIcon} src={searchIcon} alt="검색" onClick={pageChange} priority />
        </form>
    )
}