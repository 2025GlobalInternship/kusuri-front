"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import NavigationVarLayout from "@/components/navigation_var-layout";
import HeaderLayout from "@/components/header-layout";
import styles from "./index.module.css";
import Image from 'next/image';

const initialAlarms = [
  { id: 1, time: "06:15", label: "혈압약", period: "오전", isActive: true },
  { id: 2, time: "07:15", label: "혈압약", period: "오전", isActive: true },
  { id: 3, time: "08:15", label: "혈압약", period: "오전", isActive: true },
  { id: 4, time: "17:15", label: "혈압약", period: "오후", isActive: true },
  { id: 5, time: "17:15", label: "혈압약", period: "오후", isActive: true },
  { id: 6, time: "17:15", label: "혈압약", period: "오후", isActive: true },
];

export default function Page() {
  const [alarmList, setAlarmList] = useState(initialAlarms);
  const [globalToggle, setGlobalToggle] = useState(true);
  const router = useRouter();

  const goToAddAlarm = () => router.push("/addalram");
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

  const morningAlarms = alarmList.filter((a) => a.period === "오전");
  const eveningAlarms = alarmList.filter((a) => a.period === "오후");

  return (
    <>
      <div className={styles.page}>
        {/* 상단 필터 */}
        <div className={styles.filterWrapper}>
          <div className={styles.filterItem}>
            <span className={styles.dotGreen}></span> 혈압약
          </div>
          <div className={styles.filterItem}>
            <span className={styles.dotBlue}></span> 감기약
          </div>
          <div className={styles.filterItem}>
            <span className={styles.dotYellow}></span> 다이어트 약
          </div>
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
                className={`${styles.dateCard} ${day === 6 ? styles.selected : ""}`}
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



        {/* 알람 설정 헤더 */}
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

          {/* 알람 카드 */}
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
                    style={{ transform: globalToggle ? "translateX(20px)" : "translateX(0)" }}
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
                    src={alarm.isActive ? "/images/chosen_alram.png" : "/images/alram_icon.png"}
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
                    src={alarm.isActive ? "/images/chosen_alram.png" : "/images/alram_icon.png"}
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
