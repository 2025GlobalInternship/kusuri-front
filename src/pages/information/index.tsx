import { useState } from "react";
import { useRouter } from "next/router";
import style from "./index.module.css";

export default function InfoPage() {
    const [name, setName] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleGenderSelect = (gender: string) => {
        setSelectedGender(gender);
    };

    const handleNextClick = () => {
        if (!name.trim() || !selectedGender) {
            setErrorMessage("이름과 성별을 모두 입력해주세요.");
            return;
        }

        setErrorMessage("");

        router.push({
            pathname: "/profile", // 수정된 부분
            query: {
                username: name.trim(),
                gender: selectedGender,
            },
        });
    };

    const isButtonEnabled = name.trim() !== "" && selectedGender !== "";

    return (
        <div className={style.container}>
            <div className={style.titleBox}>
                <h2 className={style.greeting}>반가워요!</h2>
                <h2 className={style.subtitle}>정보를 작성해주세요.</h2>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className={style.form}>
                    <input
                        type="text"
                        name="name"
                        placeholder="이름을 작성해주세요."
                        className={style.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p className={style.nameInfo}>
                        실명을 입력해주세요. <span className={style.required}>(필수)</span>
                    </p>

                    <div className={style.genderContainer}>
                        <label
                            className={`${style.genderButton} ${
                                selectedGender === "남자" ? style.selected : ""
                            }`}
                        >
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
                        <label
                            className={`${style.genderButton} ${
                                selectedGender === "여자" ? style.selected : ""
                            }`}
                        >
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

                    {errorMessage && (
                        <div className={style.errorMessage}>{errorMessage}</div>
                    )}

                    <button
                        type="button"
                        disabled={!isButtonEnabled}
                        className={`${style.nextButton} ${
                            isButtonEnabled ? style.active : ""
                        }`}
                        onClick={handleNextClick}
                    >
                        다음
                    </button>
                </div>
            </form>
        </div>
    );
}
