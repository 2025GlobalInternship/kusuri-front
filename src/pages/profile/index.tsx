import { useState } from "react";
import Image from "next/image";
import style from "./index.module.css";
import { useRouter } from "next/router";

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
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleCompleteClick = () => {
        if (!selectedImage) return;  // 선택 안됐으면 무시
        router.replace('/main');
    };

    return (
        <div className={style.container}>
            <h2 className={style.title}>프로필 선택</h2>

            <div className={style.largeCircle}>
                {selectedImage && (
                    <Image src={selectedImage} alt="선택된 프로필" width={130} height={130} />
                )}
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

            <button
                className={`${style.nextButton} ${selectedImage ? style.active : ""}`}
                onClick={handleCompleteClick}
                disabled={!selectedImage}
            >
                완료
            </button>
        </div>
    );
}
