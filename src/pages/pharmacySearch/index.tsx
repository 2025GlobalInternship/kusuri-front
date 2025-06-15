import PharmacyList from "@/components/pharmacyList-layout";
import style from "./index.module.css";
import PharmacySearchLayout from "@/components/pharmacySearch-layout";
import Image from "next/image";

import chevronLeft from "../../../public/images/chevron-left.png";
import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();
    
    const BackBtnClick = () => {
        router.push('/pharmacy');
    }

  return (
    <div>
        <div id={style.headerCon}>
                <Image src={chevronLeft} alt="" onClick={BackBtnClick} />
                <div id={style.searchCon}>
                    <PharmacySearchLayout text="">원하는 약국을 검색해주세요</PharmacySearchLayout>
                </div>
        </div>
        <PharmacyList />
    </div>
  );
}
