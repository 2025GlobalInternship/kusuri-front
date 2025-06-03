import { useState } from "react";
import Link from "next/link";
import style from "./index.module.css";

export default function InfoPage() {
    const [medicine, setMedicine] = useState("");
    const [medicineList, setMedicineList] = useState<string[]>([]);

    const handleAddMedicine = () => {
        if (
            medicine.trim() !== "" &&
            !medicineList.includes(medicine) &&
            medicineList.length < 3
        ) {
            setMedicineList([...medicineList, medicine]);
            setMedicine("");
        }
    };

    return (
        <form method="post" action="#">
            <div className={style.container}>
                <div className={style.titleBox}>
                    <h2 className={style.greeting}>평소에</h2>
                    <h2 className={style.subtitle}>드시는 약이 있나요?</h2>
                    <p className={style.medicineLabel}>약 이름</p>
                </div>

                {/* 약 입력창 & 플러스 버튼 */}
                <div className={style.inputContainer}>
                    <input
                        type="text"
                        placeholder="약의 이름을 입력해주세요."
                        className={style.input}
                        value={medicine}
                        onChange={(e) => setMedicine(e.target.value)}
                        disabled={medicineList.length >= 3}
                    />
                    <img
                        src="/images/plus.png"
                        alt="추가"
                        className={`${style.plusIcon} ${medicineList.length >= 3 ? style.disabledButton : ""}`}
                        onClick={handleAddMedicine}
                        style={{ cursor: medicineList.length >= 3 ? "not-allowed" : "pointer" }}
                    />
                </div>

                {/* 등록된 약 리스트 */}
                <div className={style.medicineList}>
                    {medicineList.map((med, index) => (
                        <span key={index} className={style.medicineTag}>
                            {med}
                        </span>
                    ))}
                </div>

                {/* 넘어가기 버튼 */}
                <Link href="/profile">
                    <button
                        className={`${style.nextButton} ${medicineList.length >= 2 ? style.active : ""}`}
                        disabled={medicineList.length < 2}
                    >
                        넘어가기
                    </button>
                </Link>
            </div>
        </form>
    );
}
