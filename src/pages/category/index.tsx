import Image from "next/image";
import style from "./index.module.css";

import HeaderLayout from "@/components/header-layout";

import head from "../../../public/images/headImg.png";
import cold from "../../../public/images/coldImg.png";
import sleep from "../../../public/images/sleepImg.png";
import muscle from "../../../public/images/muscleImg.png";
import allergy from "../../../public/images/allergyImg.png";
import motion from "../../../public/images/motionImg.png";
import stomach from "../../../public/images/stomachImg.png";
import skin from "../../../public/images/skinImg.png";

export default function Page() {
    return (
        <div>
            <div className={style.header}>
                <HeaderLayout>증상 카테고리</HeaderLayout>
            </div>
            <div className={style.categoryCon}>
                <div>
                    <Image src={head} alt="두통" />
                    <Image src={cold} alt="감기" />
                </div>
                <div>
                    <Image src={sleep} alt="불면" />
                    <Image src={muscle} alt="근육" />
                </div>
                <div>
                    <Image src={allergy} alt="알레르기" />
                    <Image src={motion} alt="멀미" />
                </div>
                <div>
                    <Image src={stomach} alt="위통" />
                    <Image src={skin} alt="피부" />
                </div>
            </div>
        </div>
    )
}