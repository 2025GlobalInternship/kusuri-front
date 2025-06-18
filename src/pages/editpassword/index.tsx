import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Icon from "../../../public/images/Frame 2814.png";
import style from "./index.module.css";

export default function Page() {
    const router = useRouter();
    const [userid, setUserid] = useState(""); // 사용자 ID
    const [password, setPassword] = useState(""); // 새 비밀번호
    const [passwordCheck, setPasswordCheck] = useState(""); // 새 비밀번호 확인
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    // ✅ 로그인된 사용자 정보 가져오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch("/api/users/user");
                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.data) {
                        setUserid(data.data.user_id || "");
                    } else {
                        setErrorMessage("사용자 정보를 불러올 수 없습니다.");
                        router.push("/login");
                    }
                } else {
                    setErrorMessage("로그인 정보가 없습니다. 다시 로그인해주세요.");
                    router.push("/login");
                }
            } catch (error) {
                console.error("사용자 정보 요청 실패:", error);
                setErrorMessage("서버 연결 실패");
            }
        };

        fetchUserInfo();
    }, [router]);

    // 비밀번호 확인 로직
    const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPasswordCheck(value);
        setPasswordMatch(value === password);
    };

    // ✅ 비밀번호 업데이트 요청
    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (!password || !passwordCheck) {
            setErrorMessage("비밀번호를 입력해주세요.");
            return;
        }

        if (!passwordMatch) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await fetch("/api/users/update", {
                method: "PATCH",
                credentials: 'include' ,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userid,
                    password: password,
                }),
            });

            if (response.ok) {
                alert("비밀번호가 성공적으로 수정되었습니다.");
                router.push("/login");
            } else {
                const data = await response.json();
                setErrorMessage(data.message || "비밀번호 수정 실패");
            }
        } catch (error) {
            console.error("비밀번호 업데이트 실패:", error);
            setErrorMessage("서버 연결 실패");
        }
    };

    return (
        <div className={style.container}>
            <div className={style.icon}>
                <Image src={Icon} alt="아이콘" />
            </div>
            <form onSubmit={handlePasswordUpdate}>
                <div className={style.form}>
                    <input
                        type="text"
                        name="userid"
                        placeholder="아이디"
                        className={style.input}
                        value={userid}
                        readOnly
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="새 비밀번호 작성하기"
                        className={style.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        name="passwordcheck"
                        placeholder="새 비밀번호 확인"
                        className={style.input}
                        value={passwordCheck}
                        onChange={handlePasswordCheck}
                    />
                    {!passwordMatch && passwordCheck !== "" && (
                        <div className={style.errorMessage}>
                            비밀번호가 일치하지 않습니다.
                        </div>
                    )}
                    {errorMessage && (
                        <div className={style.errorMessage}>{errorMessage}</div>
                    )}
                    <button type="submit" className={style.signupButton}>
                        완료
                    </button>
                </div>
            </form>
        </div>
    );
}
