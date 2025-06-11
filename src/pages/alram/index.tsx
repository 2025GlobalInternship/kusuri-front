"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavigationVarLayout from "@/components/navigation_var-layout";
import styles from "./index.module.css";
import Image from "next/image";

// 약 데이터 타입 정의
interface Medicine {
  id: number;
  medicine: string; // API에서 오는 필드명
  user_id: number;
}

// 알람 데이터 타입 정의
interface Alarm {
  id: number;
  time: string;
  label: string;
  period: "오전" | "오후";
  isActive: boolean;
}

const initialAlarms: Alarm[] = [
  { id: 1, time: "06:15", label: "혈압약", period: "오전", isActive: true },
  { id: 2, time: "07:15", label: "혈압약", period: "오전", isActive: true },
  { id: 3, time: "08:15", label: "혈압약", period: "오전", isActive: true },
  { id: 4, time: "17:15", label: "혈압약", period: "오후", isActive: true },
  { id: 5, time: "18:15", label: "혈압약", period: "오후", isActive: true },
  { id: 6, time: "19:15", label: "혈압약", period: "오후", isActive: true },
];

export default function Page() {
  const [medicines, setMedicines] = useState<Medicine[] | null>(null);
  const [alarmList, setAlarmList] = useState<Alarm[]>(initialAlarms);
  const [globalToggle, setGlobalToggle] = useState<boolean>(true);
  const router = useRouter();

  // 약 정보 가져오기
  const fetchMedicines = async (): Promise<void> => {
    try {
      const response = await fetch("/api/medicines/my-take-medicine", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("받은 약 목록:", data);
        setMedicines(data.data);
      } else {
        console.error("서버 응답 오류");
      }
    } catch (error) {
      console.error("약물 정보 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // 오전/오후 알람 필터링
  const morningAlarms = alarmList.filter((alarm) => alarm.period === "오전");
  const eveningAlarms = alarmList.filter((alarm) => alarm.period === "오후");

  const goToAlarmSetting = () => router.push("/alramsetting");

  const toggleAlarmActive = (id: number) => {
    setAlarmList((prev) =>
      prev.map((alarm) =>
        alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm
      )
    );
  };

  const toggleGlobal = () => {
    setGlobalToggle((prev) => !prev);
    setAlarmList((prev) =>
      prev.map((alarm) => ({ ...alarm, isActive: !globalToggle }))
    );
  };

  // console.log(medicines.length)

  return (
    <>
      <div className={styles.page}>
        {/* 상단 필터 - 약 리스트 */}
        <div className={styles.filterWrapper}>
          {medicines != null ? (
            medicines.map((medicine, index) => (
              <div key={medicine.id} className={styles.filterItem}>
                <span
                  className={
                    index % 3 === 0
                      ? styles.dotGreen
                      : index % 3 === 1
                      ? styles.dotBlue
                      : styles.dotYellow
                  }
                ></span>{" "}
                {medicine.medicine}
              </div>
            ))
          ) : (
            <div className={styles.filterItem}>약을 불러오는 중입니다.</div>
          )}
        </div>

        {/* 캘린더 */}
        <div className={styles.calendarContainer}>
          <div className={styles.calendarHeader}>
            <span className={styles.calendarTitle}>캘린더</span>
            <Image
              src="/images/chevron-right.png"
              alt=">"
              width={12}
              height={15}
              className={styles.calendarChevron}
              onClick={() => router.push("/calendar")}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className={styles.calendarWrapper}>
            {[5, 6, 7, 8, 9].map((day) => (
              <div
                key={day}
                className={`${styles.dateCard} ${
                  day === 6 ? styles.selected : ""
                }`}
              >
                <span className={styles.dateNum}>{day}</span>
                <div className={styles.dots}>
                  <span className={styles.dotGreen}></span>
                  <span className={styles.dotGray}></span>
                  <span className={styles.dotYellow}></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 알람 카드 */}
        <div className={styles.container}>
          <div className={styles.addBtn}>
            <span>알람 설정</span>
            <button className={styles.pluss} onClick={goToAlarmSetting}>
              <Image
                src="/images/chevron-right.png"
                alt="Go to alarm setting"
                width={12}
                height={15}
              />
            </button>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span>알람</span>
              <button className={styles.toggleBtn} onClick={toggleGlobal}>
                <div
                  className={styles.toggleSwitch}
                  style={{ backgroundColor: globalToggle ? "#90f0bc" : "#ccc" }}
                >
                  <div
                    className={styles.toggleCircle}
                    style={{
                      transform: globalToggle
                        ? "translateX(20px)"
                        : "translateX(0)",
                    }}
                  ></div>
                </div>
              </button>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>오전</div>
              {morningAlarms.map((alarm) => (
                <div key={alarm.id} className={styles.alarmItem}>
                  <div className={styles.dot}></div>
                  <span className={styles.time}>{alarm.time}</span>
                  <span className={styles.label}>{alarm.label}</span>
                  <Image
                    src={
                      alarm.isActive
                        ? "/images/chosen_alram.png"
                        : "/images/alram_icon.png"
                    }
                    alt="alarm toggle"
                    className={styles.bellIcon}
                    width={24}
                    height={24}
                    onClick={() => toggleAlarmActive(alarm.id)}
                  />
                </div>
              ))}
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>오후</div>
              {eveningAlarms.map((alarm) => (
                <div key={alarm.id} className={styles.alarmItem}>
                  <div className={styles.dot}></div>
                  <span className={styles.time}>{alarm.time}</span>
                  <span className={styles.label}>{alarm.label}</span>
                  <Image
                    src={
                      alarm.isActive
                        ? "/images/chosen_alram.png"
                        : "/images/alram_icon.png"
                    }
                    alt="alarm toggle"
                    className={styles.bellIcon}
                    width={24}
                    height={24}
                    onClick={() => toggleAlarmActive(alarm.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "80px" }}></div>
      <NavigationVarLayout />
    </>
  );
}
