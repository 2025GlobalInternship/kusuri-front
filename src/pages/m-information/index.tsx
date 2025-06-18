import { useState } from "react";
import { useRouter } from "next/router";
import style from "./index.module.css";

export default function InfoPage() {
  const [medicine, setMedicine] = useState("");
  const [medicineList, setMedicineList] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleAddMedicine = () => {
    if (medicine.trim() === "") return;

    if (medicineList.includes(medicine)) {
      setErrorMessage("이미 등록되어있는 약입니다.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (medicineList.length >= 3) return;

    setMedicineList([...medicineList, medicine]);
    setMedicine("");
  };

  const handleSubmit = async () => {
    try {
      for (const med of medicineList) {
        const res = await fetch("/api/medicines/taking-medicine", {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ med_name: med }),
        });

        if (!res.ok) throw new Error(`약 ${med} 등록 실패`);
      }

      router.push("/main");
    } catch (error) {
      console.error("약 등록 중 오류 발생:", error);
      alert("약 정보를 등록하는 데 문제가 발생했습니다.");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className={style.container}>
        <div className={style.titleBox}>
          <h2 className={style.greeting}>평소에</h2>
          <h2 className={style.subtitle}>드시는 약이 있나요?</h2>
          <p className={style.medicineLabel}>약 이름</p>
        </div>

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
            className={`${style.plusIcon} ${
              medicineList.length >= 3 ? style.disabledButton : ""
            }`}
            onClick={handleAddMedicine}
            style={{
              cursor: medicineList.length >= 3 ? "not-allowed" : "pointer",
            }}
          />
        </div>

        {/* 에러 메시지 위치 고정 */}
        <p
          className={style.errorMessage}
          style={{ visibility: errorMessage ? "visible" : "hidden" }}
        >
          {errorMessage || "placeholder"}
        </p>

        <div className={style.medicineList}>
          {medicineList.map((med, index) => (
            <span key={index} className={style.medicineTag}>
              {med}
            </span>
          ))}
        </div>

        <button
          type="submit"
          className={`${style.nextButton} ${
            medicineList.length >= 2 ? style.active : ""
          }`}
          disabled={medicineList.length < 2}
        >
          완료
        </button>
      </div>
    </form>
  );
}
