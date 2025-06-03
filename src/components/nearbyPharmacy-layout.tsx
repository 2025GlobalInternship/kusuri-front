import style from "./nearbyPharmacy-layout.module.css";


import PharmacyLayout from "./pharmacy-layout";
interface Location {
    name: string;
    length: number;
}

interface Props {
    locations: Location[];
}

export default function NearbyPharmacyLayout({ locations }: Props) {
    return (
        <div className={style.nearCon}>
            <div id={style.nearConLine}/>
            {
                locations.map((item, index) => {
                    return(
                        <div className={style.pharmacyCon} key={index}>
                            <PharmacyLayout data={item}></PharmacyLayout>
                        </div>
                    )
                })
            }
        </div>
    )
}