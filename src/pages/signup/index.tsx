import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Icon from "../../../public/images/Frame 2814.png";
import CheckedIcon from "../../../public/images/Frame 2815.png";
import style from "./index.module.css";

export default function Page() {
    const router = useRouter();
    const [checked, setChecked] = useState(false);
    const [validUsername, setValidUsername] = useState(false);
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    // ✅ 아이디 중복 확인 요청
    const handleCheckClick = async () => {
        if (userid.trim() === "") {
            setErrorMessage("아이디를 입력해주세요.");
            return;
        }

        try {
            const response = await fetch("/api/users/check-id", {
                method: "POST",
                credentials: 'include' ,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "check",
                    userid,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setChecked(true);
                if (data.exists) {
                    setValidUsername(false);
                    setErrorMessage("이미 존재하는 아이디입니다.");
                } else {
                    setValidUsername(true);
                    setErrorMessage("");
                }
            } else {
                setErrorMessage(data.message || "중복 확인 중 오류가 발생했습니다.");
            }
        } catch (error) {
            setErrorMessage("서버와 연결할 수 없습니다.");
            console.error(error);
        }
    };

    const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordCheck(e.target.value);
        setPasswordMatch(e.target.value === password);
    };

    // ✅ 회원가입 요청
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (!passwordMatch) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!validUsername) {
            setErrorMessage("아이디 중복 확인을 해주세요.");
            return;
        }

        try {
            const response = await fetch("/api/users/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "register",
                    userid,
                    password,
                }),
            });

            if (response.ok) {
                router.push("/login");
            } else {
                const data = await response.json();
                setErrorMessage(data.message || "회원가입 실패");
            }
        } catch (error) {
            setErrorMessage("서버 연결 실패");
            console.error(error);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.icon}>
                <Image src={Icon} alt="아이콘" />
            </div>
            <form method="post" onSubmit={handleSignup}>
                <div className={style.form}>
                    <div className={style.inputContainer}>
                        <input
                            type="text"
                            name="userid"
                            placeholder="아이디 작성하기"
                            className={style.input}
                            value={userid}
                            onChange={(e) => {
                                setUserid(e.target.value);
                                setChecked(false); // 아이디 수정 시 다시 중복확인 필요
                                setValidUsername(false);
                            }}
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
                            validUsername && (
                                <Image
                                    src={CheckedIcon}
                                    alt="아이디 확인됨"
                                    width={20}
                                    height={20}
                                    className={style.checkedIcon}
                                />
                            )
                        )}
                    </div>

                    {checked && validUsername && (
                        <div className={style.successMessage}>
                            사용할 수 있는 아이디입니다.
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
                    {errorMessage && (
                        <div className={style.errorMessage}>{errorMessage}</div>
                    )}
                    <button type="submit" className={style.signupButton}>
                        회원가입
                    </button>
                </div>
            </form>
        </div>
    );
}
