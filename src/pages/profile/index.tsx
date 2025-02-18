import { useState } from "react";
import Image from "next/image";
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
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleCompleteClick = () => {
        console.log("완료 버튼 클릭됨");
    };

    return (
        <div className={style.container}>
            <h2 className={style.title}>프로필 선택</h2>

            <div className={style.largeCircle}>
                {selectedImage && <Image src={selectedImage} alt="선택된 프로필" width={130} height={130} />}
            </div>

            <div className={style.gridContainer}>
                {imageList.map((imgSrc, index) => (
                    <div
                        key={index}
                        className={`${style.smallCircle} ${selectedImage === imgSrc ? style.selected : ""}`}
                        onClick={() => setSelectedImage(imgSrc)}
                    >
                        <Image src={imgSrc} alt={`프로필 ${index + 1}`} width={70} height={70} />
                    </div>
                ))}
            </div>

            {/* 완료 버튼 (스타일 변경됨) */}
            <button className={style.nextButton} onClick={handleCompleteClick}>
                완료
            </button>
        </div>
    );
}
