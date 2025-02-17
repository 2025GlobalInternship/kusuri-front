import { useState } from "react";
import style from "./index.module.css";

export default function InfoPage() {
    const [name, setName] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [isClicked, setIsClicked] = useState(false);

    const handleGenderSelect = (gender: string) => {
        setSelectedGender(gender);
    };

    const handleNextClick = () => {
        if (name && selectedGender) {
            setIsClicked(true);
        }
    };

    const isButtonDisabled = !(name && selectedGender); // 이름과 성별이 입력되지 않으면 버튼 비활성화

    return (
        <div className={style.container}>
            <div className={style.titleBox}>
                <h2 className={style.greeting}>반가워요!</h2>
                <h2 className={style.subtitle}>정보를 작성해주세요.</h2>
            </div>
            <form method="post" action="#">
                <div className={style.form}>
                    <input
                        type="text"
                        name="username"
                        placeholder="이름을 작성해주세요."
                        className={style.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p className={style.nameInfo}>
                        실명을 입력해주세요. <span className={style.required}>(필수)</span>
                    </p>
                    <div className={style.genderContainer}>
                        <label className={style.genderButton}>
                            <input
                                type="radio"
                                name="gender"
                                value="남자"
                                checked={selectedGender === "남자"}
                                onChange={() => handleGenderSelect("남자")}
                                className={style.radio}
                            />
                            <span>남자</span>
                        </label>
                        <label className={style.genderButton}>
                            <input
                                type="radio"
                                name="gender"
                                value="여자"
                                checked={selectedGender === "여자"}
                                onChange={() => handleGenderSelect("여자")}
                                className={style.radio}
                            />
                            <span>여자</span>
                        </label>
                    </div>

                    <p className={style.genderRequired}>
                        성별을 선택해주세요. <span className={style.required}>(필수)</span>
                    </p>
                    <button
                        className={`${style.nextButton} ${isClicked ? style.clicked : ""}`}
                        onClick={handleNextClick}
                        disabled={isButtonDisabled} // 비활성화 조건 추가
                    >
                        다음
                    </button>
                </div>
            </form>
        </div>
    );
}
