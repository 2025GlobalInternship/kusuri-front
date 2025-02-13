import Image from "next/image";
import Icon from "../../../public/images/Frame 2814.png";
import style from "./index.module.css";

export default function Page() {
    return (
        <div className={style.container}>
            <div className={style.icon}>
                <Image src={Icon} alt="아이콘"/>
            </div>
            <div className={style.form}>
                <input type="text" name="userid" placeholder="아이디 작성하기" className={style.input} />
                <input type="password" name="password" placeholder="비밀번호 작성하기" className={style.input} />
                <input type="password" name="passwordcheck" placeholder="비밀번호 확인" className={style.input} />
                <button className={style.signupButton}>회원가입</button>
            </div>
        </div>
    )
}
