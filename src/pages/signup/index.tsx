import { useState } from "react";
import { useRouter } from "next/router"; // useRouter 추가
import Image from "next/image";
import Icon from "../../../public/images/Frame 2814.png";
import CheckedIcon from "../../../public/images/Frame 2815.png"; 
import style from "./index.module.css";

export default function Page() {
    const router = useRouter(); // useRouter 사용
    const [checked, setChecked] = useState(false);
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleCheckClick = () => {
        setChecked(true);
        setValidUsername(true);
    };

    const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordCheck(e.target.value);
        setPasswordMatch(e.target.value === password);
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault(); // 기본 제출 방지
        if (passwordMatch && validUsername) {
            router.push("/login"); // login 페이지로 이동
        }
    };

    return (
        <div className={style.container}>
            <div className={style.icon}>
                <Image src={Icon} alt="아이콘" />
            </div>
            <form method="post" action="#" onSubmit={handleSignup}>
                <div className={style.form}>
                    <div className={style.inputContainer}>
                        <input
                            type="text"
                            name="userid"
                            placeholder="아이디 작성하기"
                            className={style.input}
                        />
                        {!checked ? (
                            <button
                                type="button"
                                className={style.checkButton}
                                onClick={handleCheckClick}
                            >
                                아이디 중복 확인
                            </button>
                        ) : (
                            <Image
                                src={CheckedIcon}
                                alt="아이디 확인됨"
                                width={20}
                                height={20}
                                className={style.checkedIcon}
                            />
                        )}
                    </div>

                    {checked && validUsername && (
                        <div className={style.successMessage}>
                            사용할 수 있는 아이디 입니다.
                        </div>
                    )}
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호 작성하기"
                        className={style.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        name="passwordcheck"
                        placeholder="비밀번호 확인"
                        className={style.input}
                        value={passwordCheck}
                        onChange={handlePasswordCheck}
                    />
                    {!passwordMatch && passwordCheck !== "" && (
                        <div className={style.errorMessage}>비밀번호가 일치하지 않습니다.</div>
                    )}
                    <button type="submit" className={style.signupButton}>
                        회원가입
                    </button>
                </div>
            </form>
        </div>
    );
}
