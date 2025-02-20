import Image from "next/image";
import Logo from "../../public/images/Frame 5700.png";
import style from "./index.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/login');
    }, 2000);
  });

    return (
        <div className={style.logo}>
            <Image src={Logo} alt="로고"/>
        </div>
    )
}