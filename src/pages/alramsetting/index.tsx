import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import HeaderLayout from "@/components/header-layout";
import styles from './index.module.css';

interface Alarm {
  id: number;
  time: string; // "06:00"
  label: string;
  period: "오전" | "오후";
}

const Setalram = () => {
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);
  const router = useRouter();

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

      const data = JSON.parse(text);

      if (!Array.isArray(data)) {
        console.error("알람 응답이 배열이 아님:", data);
        setAlarmList([]);
        return;
      }

      const parsedAlarms: Alarm[] = data.map((item: any, index: number) => ({
        id: item.id ?? index + 1,
        time: item.time ? item.time.split(":").slice(0, 2).join(":") : "",
        label: item.medicine || "",
        period: item.timeslot === "오전" || item.timeslot === "오후" ? item.timeslot : "오전",
      }));

      setAlarmList(parsedAlarms);
    } catch (error) {
      console.error("알람 데이터 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchAlarms();
  }, []);

  const handleDeleteAll = async () => {
    try {
      const res = await fetch("/api/alarms/alarm-delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("전체 삭제 실패");
      }

      setAlarmList([]);
    } catch (error) {
      console.error("전체 삭제 중 오류 발생:", error);
    }
  };

  const handleDeleteOne = async (id: number) => {
    try {
      const res = await fetch(`/api/alarms/alarm-delete${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("알람 삭제 실패");
      }

      setAlarmList((prev) => prev.filter((alarm) => alarm.id !== id));
    } catch (error) {
      console.error("알람 삭제 중 오류 발생:", error);
    }
  };

  const goToAddAlarm = () => {
    router.push("/selectmedicine");
  };

  const morningAlarms = alarmList.filter((a) => a.period === "오전");
  const eveningAlarms = alarmList.filter((a) => a.period === "오후");

  return (
    <>
      <HeaderLayout>알람 설정</HeaderLayout>
      <div className={styles.container}>
        <div className={styles.addBtn}>
          <span>알람 추가하기</span>
          <button className={styles.pluss} onClick={goToAddAlarm}>＋</button>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span>알람</span>
            <button className={styles.deleteAll} onClick={handleDeleteAll}>
              전체삭제
            </button>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>오전</div>
            {morningAlarms.length === 0 ? (
              <div className={styles.emptyMsg}>등록된 알람이 없습니다.</div>
            ) : (
              morningAlarms.map((alarm) => (
                <div key={alarm.id} className={styles.alarmItem}>
                  <div className={styles.dot} />
                  <span className={styles.time}>{alarm.time}</span>
                  <span className={styles.label}>{alarm.label}</span>
                  <button className={styles.minuss} onClick={() => handleDeleteOne(alarm.id)}>－</button>
                </div>
              ))
            )}
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>오후</div>
            {eveningAlarms.length === 0 ? (
              <div className={styles.emptyMsg}>등록된 알람이 없습니다.</div>
            ) : (
              eveningAlarms.map((alarm) => (
                <div key={alarm.id} className={styles.alarmItem}>
                  <div className={styles.dot} />
                  <span className={styles.time}>{alarm.time}</span>
                  <span className={styles.label}>{alarm.label}</span>
                  <button className={styles.minuss} onClick={() => handleDeleteOne(alarm.id)}>－</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Setalram;
