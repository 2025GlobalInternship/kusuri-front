import { useState } from "react";
import Image from "next/image";
import Icon from "../../../public/images/Frame 2814.png";
import style from "./index.module.css";
import Link from "next/link"; 
import { useRouter } from "next/router";

export default function LoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isClicked, setIsClicked] = useState(false);

    const handleLoginClick = () => {
        setIsClicked(true);
        router.push('/information');
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();
    }

    return (
        <div className={style.container}>
            <div className={style.icon}>
                <Image src={Icon} alt="아이콘" />
            </div>
            <form method="post" action="#" onSubmit={onSubmit}>
                <div className={style.form}>
                    <input
                        type="text"
                        name="userid"
                        placeholder="아이디 작성하기"
                        className={style.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호 작성하기"
                        className={style.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                        className={`${style.signupButton} ${isClicked ? style.clicked : ""}`} 
                        onClick={handleLoginClick}
                    >
                        로그인
                    </button>
                    <Link href="/signup">
                        <span className={style.signupLink}>회원가입</span>
                    </Link>
                </div>
            </form>
        </div>
    );
}
