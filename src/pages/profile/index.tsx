import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import style from "./index.module.css";

const imageList = [
  "/images/ch1.png",
  "/images/ch2.png",
  "/images/ch3.png",
  "/images/ch4.png",
  "/images/ch5.png",
  "/images/ch6.png",
];

export default function ProfileSelection() {
  const router = useRouter();
  const { username, gender, medicines } = router.query;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [parsedMedicines, setParsedMedicines] = useState<string[]>([]);

  useEffect(() => {
    // 필수 정보 없으면 홈으로 리디렉션
    if (!username || !gender) {
      alert("이름과 성별 정보가 없습니다.");
      router.replace("/");
      return;
    }

    // medicines 문자열 => 배열로 파싱
    if (typeof medicines === "string") {
      try {
        const parsed = JSON.parse(medicines);
        if (Array.isArray(parsed)) {
          setParsedMedicines(parsed);
        }
      } catch (e) {
        console.error("약 정보 파싱 오류:", e);
      }
    }
  }, [username, gender, medicines, router]);

  const handleCompleteClick = async () => {
    if (!selectedImage || typeof username !== "string" || typeof gender !== "string") {
      alert("모든 정보를 선택해주세요.");
      return;
    }

    try {
      // 서버에 유저 정보 업데이트 요청
      const response = await fetch("/api/users/frist-info", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: username.trim(),
          gender,
          profile: selectedImage,
          medicines: parsedMedicines,
        }),
      });

      if (!response.ok) {
        throw new Error("프로필 업데이트 실패");
      }

      // 다음 페이지로 이동, 정보 함께 전달
      router.push({
        pathname: "/m-information",
        query: {
          username: username.trim(),
          gender,
          profile: selectedImage,
          medicines: JSON.stringify(parsedMedicines),
        },
      });
    } catch (error) {
      console.error(error);
      alert("프로필 설정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>프로필 선택</h2>

      <div className={style.largeCircle}>
        {selectedImage && (
          <Image
            src={selectedImage}
            alt="선택된 프로필"
            width={130}
            height={130}
            priority
          />
        )}
      </div>

      <div className={style.gridContainer}>
        {imageList.map((imgSrc, index) => (
          <div
            key={index}
            className={`${style.smallCircle} ${
              selectedImage === imgSrc ? style.selected : ""
            }`}
            onClick={() => setSelectedImage(imgSrc)}
          >
            <Image
              src={imgSrc}
              alt={`프로필 ${index + 1}`}
              width={70}
              height={70}
            />
          </div>
        ))}
      </div>

      <button
        className={`${style.nextButton} ${selectedImage ? style.active : ""}`}
        onClick={handleCompleteClick}
        disabled={!selectedImage}
      >
        다음
      </button>
    </div>
  );
}
