import { useState } from "react";
import { useRouter } from "next/router";
import HeaderLayout from "@/components/header-layout";
import styles from './index.module.css';

const initialAlarms = [
  { id: 1, time: "06:15", label: "혈압약", period: "오전"},
  { id: 2, time: "07:15", label: "혈압약", period: "오전"},
  { id: 3, time: "08:15", label: "혈압약", period: "오전"},
  { id: 4, time: "17:15", label: "혈압약", period: "오후"},
  { id: 5, time: "17:15", label: "혈압약", period: "오후"},
  { id: 6, time: "17:15", label: "혈압약", period: "오후"},
];

const Setalram = () => {
  const [alarmList, setAlarmList] = useState(initialAlarms);
  const router = useRouter();

  const handleDeleteAll = () => {
    setAlarmList([]);
  };

  const handleDeleteOne = (id: number) => {
    setAlarmList(prev => prev.filter(alarm => alarm.id !== id));
  };

  const goToAddAlarm = () => {
    router.push("/addalram");
  };

  const morningAlarms = alarmList.filter(a => a.period === "오전");
  const eveningAlarms = alarmList.filter(a => a.period === "오후");

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
            {morningAlarms.map((alarm) => (
              <div key={alarm.id} className={styles.alarmItem}>
                <div className={`${styles.dot}`} />
                <span className={styles.time}>{alarm.time}</span>
                <span className={styles.label}>{alarm.label}</span>
                <button className={styles.minuss} onClick={() => handleDeleteOne(alarm.id)}>－</button>
              </div>
            ))}
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>오후</div>
            {eveningAlarms.map((alarm) => (
              <div key={alarm.id} className={styles.alarmItem}>
                <div className={`${styles.dot} `} />
                <span className={styles.time}>{alarm.time}</span>
                <span className={styles.label}>{alarm.label}</span>
                <button className={styles.minuss} onClick={() => handleDeleteOne(alarm.id)}>－</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Setalram;
