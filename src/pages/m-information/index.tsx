import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import style from "./index.module.css";

export default function InfoPage() {
  const [medicine, setMedicine] = useState("");
  const [medicineList, setMedicineList] = useState<string[]>([]);
  const router = useRouter();

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

  const handleSubmit = async () => {
    try {
      // 외부 백엔드 API로 POST 요청
      await axios.post("http://localhost/kusuri-back/medicines/taking-medicine", {
        medicines: medicineList,
      });

      // 성공 시 다음 페이지로 이동
      router.push("/profile");
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
            className={`${style.plusIcon} ${
              medicineList.length >= 3 ? style.disabledButton : ""
            }`}
            onClick={handleAddMedicine}
            style={{
              cursor: medicineList.length >= 3 ? "not-allowed" : "pointer",
            }}
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
        <button
          type="submit"
          className={`${style.nextButton} ${
            medicineList.length >= 2 ? style.active : ""
          }`}
          disabled={medicineList.length < 2}
        >
          넘어가기
        </button>
      </div>
    </form>
  );
}
