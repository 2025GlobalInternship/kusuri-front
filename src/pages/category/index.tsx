import Image from "next/image";
import style from "./index.module.css";

import HeaderLayout from "@/components/header-layout";

import head from "../../../public/images/category/headImg.png";
import cold from "../../../public/images/category/coldImg.png";
import sleep from "../../../public/images/category/sleepImg.png";
import muscle from "../../../public/images/category/muscleImg.png";
import allergy from "../../../public/images/category/allergyImg.png";
import motion from "../../../public/images/category/motionImg.png";
import stomach from "../../../public/images/category/stomackImg.png";
import skin from "../../../public/images/category/skinImg.png";
import chosenHead from "../../../public/images/category/chosen_head.png";
import chosenCold from "../../../public/images/category/chosen_cold.png";
import chosenSleep from "../../../public/images/category/chosen_sleep.png";
import chosenMuscle from "../../../public/images/category/chosen_muscle.png";
import chosenAllergy from "../../../public/images/category/chosen_allergy.png";
import chosenMotion from "../../../public/images/category/chosen_motion.png";
import chosenStomack from "../../../public/images/category/chosen_stomach.png";
import chosenSkin from "../../../public/images/category/chosen_skin.png";
import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();

    const categoryBtnClick = (e : React.MouseEvent<HTMLImageElement>) => {
        const cate = e.target.alt;
        router.push(`/category/${cate}`);
    }

    return (
        <div>
            <div className={style.header}>
                <HeaderLayout>증상 카테고리</HeaderLayout>
            </div>
            <div className={style.categoryCon}>
                <div>
                    <Image onClick={categoryBtnClick} src={head} alt="두통" />
                    <Image onClick={categoryBtnClick} src={cold} alt="감기 및 기침" />
                </div>
                <div>
                    <Image onClick={categoryBtnClick} src={sleep} alt="불면증" />
                    <Image onClick={categoryBtnClick} src={muscle} alt="근육 및 관절 통증" />
                </div>
                <div>
                    <Image onClick={categoryBtnClick} src={allergy} alt="알레르기" />
                    <Image onClick={categoryBtnClick} src={motion} alt="멀미" />
                </div>
                <div>
                    <Image onClick={categoryBtnClick} src={stomach} alt="위통 및 소화 불량" />
                    <Image onClick={categoryBtnClick} src={skin} alt="피부 문제" />
                </div>
            </div>
        </div>
    )
}