"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavigationVarLayout from "@/components/navigation_var-layout";
import styles from "./index.module.css";
import Image from "next/image";

interface Medicine {
  id: number;
  medicine: string;
  user_id: number;
}

interface Alarm {
  id: number;
  time: string; // "06:00" 형식
  timeslot: "오전" | "오후";
  medicine: string;
  isActive: boolean;
}

export default function Page() {
  const [medicines, setMedicines] = useState<Medicine[] | null>(null);
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);
  const [globalToggle, setGlobalToggle] = useState<boolean>(true);
  const router = useRouter();

  const fetchMedicines = async () => {
    try {
      const res = await fetch("/api/medicines/my-take-medicine");
      const json = await res.json();
      setMedicines(json.data);
    } catch (err) {
      console.error("약물 정보 가져오기 실패:", err);
    }
  };

  const fetchAlarms = async () => {
    try {
      const res = await fetch("/api/alarms/alarm", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const text = await res.text();
      if (!text) {
        console.warn("응답 본문이 없습니다.");
        setAlarmList([]);
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("JSON 파싱 실패:", err);
        setAlarmList([]);
        return;
      }

      if (!Array.isArray(data)) {
        console.error("알람 응답이 배열이 아님:", data);
        setAlarmList([]);
        return;
      }

      const parsedAlarms: Alarm[] = data.map((item: any, index: number) => ({
        id: item.id ?? index + 1,
        time: item.time ? item.time.split(":").slice(0, 2).join(":") : "",
        timeslot: item.timeslot === "오전" || item.timeslot === "오후" ? item.timeslot : "오전",
        medicine: item.medicine || "",
        isActive: item.state === "On",
      }));

      setAlarmList(parsedAlarms);
    } catch (err) {
      console.error("알람 데이터 가져오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchMedicines();
    fetchAlarms();
  }, []);

  const morningAlarms = alarmList.filter((a) => a.timeslot === "오전");
  const eveningAlarms = alarmList.filter((a) => a.timeslot === "오후");

  const goToAlarmSetting = () => router.push("/alramsetting");

  const toggleAlarmActive = (id: number) => {
    setAlarmList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
  };

  const toggleGlobal = () => {
    setGlobalToggle((prev) => !prev);
    setAlarmList((prev) =>
      prev.map((a) => ({ ...a, isActive: !globalToggle }))
    );
  };

  return (
    <>
      <div className={styles.page}>
        {/* 약 필터 */}
        <div className={styles.filterWrapper}>
          {medicines ? (
            medicines.map((m, i) => (
              <div key={m.id} className={styles.filterItem}>
                <span
                  className={
                    i % 3 === 0
                      ? styles.dotGreen
                      : i % 3 === 1
                      ? styles.dotBlue
                      : styles.dotYellow
                  }
                ></span>{" "}
                {m.medicine}
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
                      transform: globalToggle ? "translateX(20px)" : "translateX(0)",
                    }}
                  ></div>
                </div>
              </button>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>오전</div>
              {morningAlarms.length === 0 ? (
                <div className={styles.emptyMsg}>등록된 알람이 없습니다.</div>
              ) : (
                morningAlarms.map((a) => (
                  <div key={a.id} className={styles.alarmItem}>
                    <div className={styles.dot}></div>
                    <span className={styles.time}>{a.time}</span>
                    <span className={styles.label}>{a.medicine}</span>
                    <Image
                      src={
                        a.isActive
                          ? "/images/chosen_alram.png"
                          : "/images/alram_icon.png"
                      }
                      alt="alarm toggle"
                      className={styles.bellIcon}
                      width={24}
                      height={24}
                      onClick={() => toggleAlarmActive(a.id)}
                    />
                  </div>
                ))
              )}
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>오후</div>
              {eveningAlarms.length === 0 ? (
                <div className={styles.emptyMsg}>등록된 알람이 없습니다.</div>
              ) : (
                eveningAlarms.map((a) => (
                  <div key={a.id} className={styles.alarmItem}>
                    <div className={styles.dot}></div>
                    <span className={styles.time}>{a.time}</span>
                    <span className={styles.label}>{a.medicine}</span>
                    <Image
                      src={
                        a.isActive
                          ? "/images/chosen_alram.png"
                          : "/images/alram_icon.png"
                      }
                      alt="alarm toggle"
                      className={styles.bellIcon}
                      width={24}
                      height={24}
                      onClick={() => toggleAlarmActive(a.id)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "80px" }}></div>
      <NavigationVarLayout />
    </>
  );
}
