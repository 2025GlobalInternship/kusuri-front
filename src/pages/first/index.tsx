import Image from "next/image";
import Logo from "../../../public/images/Frame 5700.png";
import style from "./index.module.css";

export default function Page() {
    return (
        <div className={style.logo}>
            <Image src={Logo} alt="로고"/>
        </div>
    )
}