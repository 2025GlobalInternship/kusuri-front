import { useState } from "react";
import Image from "next/image";
import Icon from "../../../public/images/Frame 2814.png";
import style from "./index.module.css";

export default function Page() {
    const [checked, setChecked] = useState(false);
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState(""); // 비밀번호 상태
    const [passwordCheck, setPasswordCheck] = useState(""); // 비밀번호 확인 상태
    const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 일치 여부 상태

    const handleCheckClick = () => {
        setChecked(true);
        setValidUsername(true); // 아이디가 사용 가능하다고 설정
    };

    // 비밀번호 확인 필드에서 변화가 있을 때 호출되는 함수
    const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordCheck(e.target.value);
        if (e.target.value === password) {
            setPasswordMatch(true); // 비밀번호가 일치하면 true로 설정
        } else {
            setPasswordMatch(false); // 일치하지 않으면 false로 설정
        }
    };
    

    return (
        <div className={style.container}>
            <div className={style.icon}>
                <Image src={Icon} alt="아이콘" />
            </div>
            <div className={style.form}>
                <div className={style.inputContainer}>
                    <input
                        type="text"
                        name="userid"
                        placeholder="아이디 작성하기"
                        className={style.input}
                    />
                    <button className={style.checkButton} onClick={handleCheckClick}>
                        {checked ? "✔️" : "아이디 중복 확인"}
                    </button>
                </div>
                {/* 아이디 중복 확인 후 밑에 메시지 표시 */}
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
                    onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력을 상태로 관리
                />
                <input
                    type="password"
                    name="passwordcheck"
                    placeholder="비밀번호 확인"
                    className={style.input}
                    value={passwordCheck}
                    onChange={handlePasswordCheck} // 비밀번호 확인 입력 변화 처리
                />
                {/* 비밀번호가 일치하지 않으면 메시지 표시 */}
                {!passwordMatch && passwordCheck !== "" && (
                    <div className={style.errorMessage}>비밀번호가 일치하지 않습니다.</div>
                )}
                <button className={style.signupButton}>회원가입</button>
            </div>
        </div>
    );
}
