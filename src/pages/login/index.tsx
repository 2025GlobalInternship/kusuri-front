import { useState } from "react";
import Image from "next/image";
import Icon from "../../../public/images/Frame 2814.png";
import style from "./index.module.css";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isClicked, setIsClicked] = useState(false);

    const handleLoginClick = () => {
        setIsClicked(true); // 버튼 클릭 시 색상 변경
    };

    return (
        <div className={style.container}>
            <div className={style.icon}>
                <Image src={Icon} alt="아이콘" />
            </div>
            <form method="post" action="#">
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
            </div>
            </form>
        </div>
    );
}
